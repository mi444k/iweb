import { NextResponse } from "next/server";

// Always read from disk (no prerender caching), needed when new files are added.
export const dynamic = "force-dynamic";

// Fixed list of hero videos. Files must exist in /public/video.
const HERO_VIDEOS = [
  "/video/heroAvatar.webm",
  "/video/heroAvatar_2.webm",
  "/video/heroAvatar_3.webm",
  "/video/heroAvatar_4.webm",
  "/video/heroAvatar_5.webm",
  "/video/heroAvatar_6.webm",
];

export async function GET() {
  return NextResponse.json({ videos: HERO_VIDEOS });
}
