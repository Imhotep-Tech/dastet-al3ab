"use client";

import TurnBasedEngine from "./TurnBasedEngine";
import HotPotatoEngine from "./HotPotatoEngine";

export default function GameDispatcher({ config }: { config: any }) {
  if (config.engineTemplate === "hot-potato") {
    return <HotPotatoEngine config={config} />;
  }
  return <TurnBasedEngine config={config} />;
}
