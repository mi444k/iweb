import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Returns list of files from public/images/techs (top-level only)
export async function GET() {
  try {
    const techsDir = path.join(process.cwd(), "public", "images", "techs");
    const entries = await fs.promises.readdir(techsDir, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      // only include common image extensions
      .filter((name) => /\.(svg|png|jpg|jpeg|webp)$/i.test(name));

    return NextResponse.json({ success: true, data: files, count: files.length });
  } catch (err: unknown) {
    console.error("/api/techs error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
