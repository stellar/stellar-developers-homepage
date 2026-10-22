// Browser API of the Mintlify assistant widget (https://www.mintlify.com/docs/assistant/widget). Only the parts we use.
export type AssistantEvent = { type: "init" | "open" | "close" | "ask" | "update" | "reset" | "navigate" | "destroy"; actor?: string; source?: string };

export type AssistantConfig = {
  id: string;
  appearance?: {
    theme?: "light" | "dark" | "system";
    accent?: string;
    radius?: string;
    zIndex?: number;
    variant?: "widget" | "modal" | "panel";
  };
  labels?: { title?: string; placeholder?: string };
  hooks?: { event?: (e: AssistantEvent) => void; error?: (e: unknown) => void };
  analytics?: { capturePathname?: boolean };
};

export type AssistantApi = {
  init(config: AssistantConfig): Promise<void>;
  open(options?: { source?: string; focus?: boolean }): Promise<void>;
  close(): Promise<void>;
  ask(question: string, options?: { source?: string; open?: boolean; focus?: boolean }): Promise<void>;
  update(config: Partial<Omit<AssistantConfig, "id">>): Promise<void>;
};

declare global {
  interface Window {
    MintlifyAssistant?: AssistantApi;
    gtag?: (...args: unknown[]) => void;
  }
}
