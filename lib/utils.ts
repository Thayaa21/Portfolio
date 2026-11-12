import fs from "node:fs";
import path from "node:path";

/**
 * Build-time check for whether public/resume.pdf exists.
 * Runs on the server during static export, so every "Download CV" button
 * can be hidden when the file is missing.
 */
export function resumeExists(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "resume.pdf"));
  } catch {
    return false;
  }
}

export const siteUrl = "https://thayaa-portfolio.vercel.app";
