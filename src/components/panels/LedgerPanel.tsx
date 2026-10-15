"use client";

import { Badge, CopyText, Icon } from "@stellar/design-system";

// Ledger panel on static sample data (Maz, 8 Oct): header + recent ledgers + footnote,
// fitted to the 504 × 324 code slot. No live fetch; a later version may read Stellar RPC.
const ROWS = [
  { seq: "61,284,907", hash: "e055ae…b7b3", txs: 374, closed: "2s ago" },
  { seq: "61,284,906", hash: "35e170…278c", txs: 388, closed: "7s ago" },
  { seq: "61,284,905", hash: "7272a8…3921", txs: 239, closed: "12s ago" },
  { seq: "61,284,904", hash: "a87f16…6639", txs: 230, closed: "17s ago" },
  { seq: "61,284,903", hash: "ed5ae1…bed3", txs: 338, closed: "22s ago" },
];

export function LedgerPanel() {
  return (
    <div className="panel">
      <div className="panel__head">
        <div className="panel__title">
          <Icon.Globe02 width={16} height={16} aria-hidden />
          <span>Mainnet</span>
          <Badge variant="success" size="sm" isStatus>Healthy</Badge>
        </div>
        <span className="panel__meta font-mono">Latest Protocol</span>
      </div>
      <table className="ledger">
        <thead>
          <tr><th scope="col">Ledger</th><th scope="col">Hash</th><th scope="col" className="num">Txs</th><th scope="col" className="num">Closed</th></tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.seq}>
              <td>{r.seq}</td>
              <td className="ledger__hash">
                <span>{r.hash}</span>
                <CopyText textToCopy={r.hash} doneLabel="Copied">
                  <button type="button" className="copy-btn" aria-label={`Copy hash ${r.hash}`}><Icon.Copy01 width={14} height={14} aria-hidden /></button>
                </CopyText>
              </td>
              <td className="num">{r.txs}</td>
              <td className="num">{r.closed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="panel__foot">
        <span className="panel__live"><span className="dot dot--green" aria-hidden />Sample data · live from Stellar RPC at launch</span>
        <span className="font-mono">stellar-rpc</span>
      </div>
    </div>
  );
}
