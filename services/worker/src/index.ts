import { createTxlineClient } from "packages/shared/txline";
import { db } from "packages/shared/db";
import { normalizeEvent } from "./normalizer";

async function main() {
  const client = createTxlineClient({
    host: process.env.TXLINE_HOST!,
    guestJwtSecret: process.env.TXLINE_GUEST_JWT_SECRET!,
    apiToken: process.env.TXLINE_API_TOKEN!,
    network: process.env.TXLINE_DEFAULT_NETWORK || "devnet",
  });

  // 1) Activate guest session
  const guestJwt = await client.startGuestSession();

  // 2) Activate API token after subscription (if required)
  await client.activateApiToken(guestJwt);

  // 3) Fetch fixture snapshots (initial load)
  const snapshots = await client.fetchFixtureSnapshots();
  for (const snap of snapshots) {
    await db.upsertMatchFromSnapshot(snap);
  }

  // 4) Subscribe to live streams (scores, odds, events)
  client.on("score_update", async (raw) => {
    const ev = normalizeEvent(raw);
    await db.saveMatchEvent(ev);
    // publish to frontend via realtime (Supabase/WS)
    await db.publishRealtime("match_events", ev);
  });

  client.on("odds_update", async (raw) => {
    const ev = normalizeEvent(raw);
    await db.saveOddsUpdate(ev);
    await db.publishRealtime("odds_updates", ev);
  });

  client.on("match_event", async (raw) => {
    const ev = normalizeEvent(raw);
    await db.saveMatchEvent(ev);
    await db.publishRealtime("match_events", ev);
  });

  client.connect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
