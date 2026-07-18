import { db } from "packages/shared/db";
import OpenAI from "openai"; // or preferred LLM client

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function handleMatchEvent(ev: any) {
  // detect important events
  if (["goal", "red_card", "odds_swing"].includes(ev.eventType)) {
    const prompt = buildPunditPrompt(ev);
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 120,
    });

    const text = resp.choices[0].message.content;
    // store explanation
    await db.savePunditMessage({
      matchId: ev.matchId,
      eventId: ev.id,
      text,
      createdAt: new Date(),
    });

    // optionally send Telegram message
    if (process.env.BOT_TELEGRAM_TOKEN) {
      await sendTelegram(ev.matchId, text);
    }

    // optionally TTS output
    if (process.env.TTS_API_KEY) {
      await enqueueTTS(ev.matchId, text);
    }
  }
}

function buildPunditPrompt(ev: any) {
  return `Short fan-friendly commentary for event:
Event: ${ev.eventType}
Payload: ${JSON.stringify(ev.payload)}
Provide: 1) 1-2 sentence fan line, 2) market interpretation (odds move), 3) short CTA.`;
}
