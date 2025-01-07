import { NextResponse } from "next/server";
import prom from "prom-client";

export async function GET() {
  const collectDefaultMetrics = prom.collectDefaultMetrics;
  const Registry = prom.Registry;
  const register = new Registry();
  const metrics = collectDefaultMetrics({ register });

  return new NextResponse(JSON.stringify(metrics), {
      status: 200,
  });
}