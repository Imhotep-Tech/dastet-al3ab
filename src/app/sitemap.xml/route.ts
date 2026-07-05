import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const baseUrl = "https://dasta-games.vercel.app";

  let gameUrls: string[] = [];
  try {
    const gamesDir = path.join(process.cwd(), "src/data/games");
    const files = fs.readdirSync(gamesDir).filter((file) => file.endsWith(".json"));
    gameUrls = files.map((file) => {
      const content = fs.readFileSync(path.join(gamesDir, file), "utf-8");
      const game = JSON.parse(content);
      return game.id;
    });
  } catch (error) {
    console.error("Error reading games directory for sitemap:", error);
  }

  const staticPaths = ["", "/play", "/creator", "/updates"];
  const currentDate = new Date().toISOString().split("T")[0];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPaths
    .map((path) => {
      return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${path === "" ? "weekly" : "weekly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>
`;
    })
    .join("")}
  ${gameUrls
    .map((id) => {
      return `  <url>
    <loc>${baseUrl}/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    })
    .join("")}</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    },
  });
}
