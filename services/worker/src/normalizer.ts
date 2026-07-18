export function normalizeEvent(raw: any) {
  // Map TxLINE normalized JSON schema to internal model
  return {
    matchId: raw.fixture_id,
    sequence: raw.sequence,
    eventType: raw.type,
    payload: raw.payload,
    timestamp: new Date(raw.timestamp),
    proofRef: raw.proof?.reference || null,
  };
}
