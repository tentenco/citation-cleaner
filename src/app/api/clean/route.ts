import { NextResponse } from "next/server";
import { cleanMarkdown } from "@/lib/cleaner/clean";
import { intensities, providers } from "@/lib/cleaner/presets";
import type { Intensity, Provider } from "@/lib/cleaner/types";

const MAX_INPUT = 200_000;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export function GET() {
  return NextResponse.json(
    {
      service: "citation-cleaner",
      usage: "POST { markdown: string, provider?, intensity? }",
      providers,
      intensities
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON." }, { status: 400, headers: CORS_HEADERS });
  }

  const payload = (body ?? {}) as {
    markdown?: unknown;
    provider?: unknown;
    intensity?: unknown;
  };

  if (typeof payload.markdown !== "string") {
    return NextResponse.json(
      { error: "`markdown` (string) is required." },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (payload.markdown.length > MAX_INPUT) {
    return NextResponse.json(
      { error: `Input exceeds ${MAX_INPUT} characters.` },
      { status: 413, headers: CORS_HEADERS }
    );
  }

  const provider: Provider =
    typeof payload.provider === "string" && providers.includes(payload.provider as Provider)
      ? (payload.provider as Provider)
      : "auto";
  const intensity: Intensity =
    typeof payload.intensity === "string" && intensities.includes(payload.intensity as Intensity)
      ? (payload.intensity as Intensity)
      : "balanced";

  const result = cleanMarkdown(payload.markdown, { provider, intensity });
  return NextResponse.json({ provider, intensity, ...result }, { headers: CORS_HEADERS });
}
