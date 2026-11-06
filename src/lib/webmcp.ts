/**
 * WebMCP tools for in-browser AI agents (https://webmachinelearning.github.io/webmcp/).
 *
 * Mintlify registers the same tools on every /docs page. This page is served by Netlify, so it registers its own copy.
 * Names and input schemas match Mintlify's, so an agent sees one tool set on / and on /docs.
 * Both tools call same-origin endpoints that Cloudflare routes to Mintlify: /mcp (the public docs MCP server) and
 * /docs/<page>.md. Neither endpoint sends CORS headers, so the tools work on developers.stellar.org and on the
 * Netlify review URL (see netlify.toml), but not on localhost.
 *
 * The API is experimental and has moved between navigator.modelContext and document.modelContext, and between
 * registerTool() and provideContext(). We register on every surface that exists. In other browsers this is a no-op.
 */

type ToolResult = { content: Array<{ type: "text"; text: string }>; isError?: boolean };

type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
};

type ModelContext = {
  registerTool?: (tool: Tool) => unknown;
  provideContext?: (context: { tools: Tool[] }) => unknown;
};

const ANNOTATIONS = { readOnlyHint: true, untrustedContentHint: true };

function error(text: string): ToolResult {
  return { content: [{ type: "text", text }], isError: true };
}

/** Calls one tool on the docs MCP server. It answers a stateless tools/call with JSON or with a short SSE stream. */
async function callDocsMcp(name: string, args: Record<string, unknown>): Promise<ToolResult> {
  const res = await fetch("/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } }),
  });
  if (!res.ok) throw new Error(`docs MCP returned HTTP ${res.status}`);
  const body = await res.text();
  const messages = res.headers.get("content-type")?.includes("text/event-stream")
    ? body.split(/\r?\n\r?\n/).map((event) => event.split(/\r?\n/).filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).join("\n")).filter(Boolean)
    : [body];
  for (const raw of messages) {
    const msg = JSON.parse(raw) as { id?: number; result?: ToolResult; error?: { message?: string } };
    if (msg.id !== 1) continue;
    if (msg.error) throw new Error(msg.error.message ?? "docs MCP error");
    if (msg.result) return msg.result;
  }
  throw new Error("docs MCP sent no result");
}

/** Turns a docs URL, a "/docs/..." path or a "docs/..." page id from search_docs into a same-origin "/docs/..." path. */
function docsPath(input: string): string | null {
  let url: URL;
  try { url = new URL(input, `${location.origin}/`); } catch { return null; }
  if (url.origin !== location.origin && url.hostname !== "developers.stellar.org") return null;
  const path = url.pathname.replace(/\/+$/, "").replace(/\.mdx?$/, "");
  return path === "/docs" || path.startsWith("/docs/") ? path : null;
}

const TOOLS: Tool[] = [
  {
    name: "search_docs",
    description: "Search the Stellar Developer Docs documentation for relevant pages and content.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Search query" } },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: ANNOTATIONS,
    async execute(input) {
      const query = typeof input?.query === "string" ? input.query.trim() : "";
      if (!query) return error("query must be a non-empty string.");
      try {
        return await callDocsMcp("search_stellar_developer_docs", { query });
      } catch (err) {
        return error(`Search failed: ${String(err)}`);
      }
    },
  },
  {
    name: "read_page",
    description: "Read the full content of a Stellar Developer Docs documentation page as markdown.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string", description: "Path or URL of the page, as returned by search_docs" } },
      required: ["path"],
      additionalProperties: false,
    },
    annotations: ANNOTATIONS,
    async execute(input) {
      const path = typeof input?.path === "string" ? docsPath(input.path.trim()) : null;
      if (!path) return error("path must be a docs page on developers.stellar.org, for example /docs/build.");
      try {
        const res = await fetch(`${path}.md`, { headers: { Accept: "text/markdown" } });
        if (!res.ok) return error(`No page at ${path} (HTTP ${res.status}).`);
        return { content: [{ type: "text", text: await res.text() }] };
      } catch (err) {
        return error(`Read failed: ${String(err)}`);
      }
    },
  },
];

export function registerWebMcpTools() {
  const surfaces = [
    (navigator as Navigator & { modelContext?: ModelContext }).modelContext,
    (document as Document & { modelContext?: ModelContext }).modelContext,
  ];
  const seen = new Set<ModelContext>();
  for (const mc of surfaces) {
    if (!mc || seen.has(mc)) continue; // one registration per surface; they alias in a real implementation
    seen.add(mc);
    try {
      if (typeof mc.registerTool === "function") TOOLS.forEach((tool) => void Promise.resolve(mc.registerTool!(tool)).catch(() => {}));
      else if (typeof mc.provideContext === "function") void Promise.resolve(mc.provideContext({ tools: TOOLS })).catch(() => {});
    } catch {
      // Experimental API: registration must never break the page.
    }
  }
}
