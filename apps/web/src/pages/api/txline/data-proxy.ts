// Proxy requests to TxLINE ensuring both Authorization and X-Api-Token headers are present
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.headers.authorization?.split(" ")[1] || process.env.TXLINE_GUEST_JWT_SECRET;
  const apiToken = process.env.TXLINE_API_TOKEN;
  const url = `${process.env.TXLINE_HOST}${req.query.path || ""}`;

  const r = await fetch(url, {
    method: req.method,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "X-Api-Token": apiToken!,
      "Content-Type": "application/json",
    },
    body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
  });

  const body = await r.text();
  res.status(r.status).send(body);
}
