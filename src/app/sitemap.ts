import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL for the Dasta application
  const baseUrl = "https://dasta-games.vercel.app";

  const staticRoutes = ["", "/play", "/creator", "/updates"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const gamesDir = path.join(process.cwd(), "src/data/games");
    const files = fs.readdirSync(gamesDir).filter((file) => file.endsWith(".json"));

    const dynamicGameRoutes = files.map((file) => {
      const content = fs.readFileSync(path.join(gamesDir, file), "utf-8");
      const game = JSON.parse(content);
      return {
        url: `${baseUrl}/${game.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });

    return [...staticRoutes, ...dynamicGameRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap routes:", error);
    return staticRoutes;
  }
}
