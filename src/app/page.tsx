import fs from "fs";
import path from "path";
import DashboardClient from "@/components/DashboardClient";

export default function HomePage() {
  const gamesDir = path.join(process.cwd(), "src/data/games");
  let games: any[] = [];
  
  try {
    const files = fs.readdirSync(gamesDir).filter(f => f.endsWith(".json"));
    games = files.map(file => {
      const content = fs.readFileSync(path.join(gamesDir, file), "utf-8");
      return JSON.parse(content);
    });
  } catch (error) {
    console.error("Error reading games directory:", error);
  }

  return <DashboardClient games={games} />;
}
