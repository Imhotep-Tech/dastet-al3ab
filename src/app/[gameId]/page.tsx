import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import GameDispatcher from "@/engines/GameDispatcher";



function getGamesData() {
  const gamesDir = path.join(process.cwd(), "src/data/games");
  const files = fs.readdirSync(gamesDir).filter(f => f.endsWith(".json"));
  const games: Record<string, any> = {};
  for (const file of files) {
    const filePath = path.join(gamesDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(content);
    games[json.id] = json;
  }
  return games;
}

export function generateStaticParams() {
  const games = getGamesData();
  return Object.keys(games).map(id => ({ gameId: id }));
}

export default async function GamePage(props: { params: Promise<{ gameId: string }> }) {
  const params = await props.params;
  const games = getGamesData();
  const config = games[params.gameId];

  if (!config) {
    notFound();
  }

  // Load cards dynamically based on the cardsFile variable
  const cardsPath = path.join(process.cwd(), "src/data/cards", config.cardsFile);
  let cards = [];
  try {
    const cardsContent = fs.readFileSync(cardsPath, "utf-8");
    cards = JSON.parse(cardsContent);
  } catch (e) {
    console.error(`Cards file not found: ${config.cardsFile} for game ${params.gameId}`);
  }

  return <GameDispatcher config={{ ...config, cards }} />;
}
