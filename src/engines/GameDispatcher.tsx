"use client";

import TurnBasedEngine from "./TurnBasedEngine";
import HotPotatoEngine from "./HotPotatoEngine";
import McqEngine from "./McqEngine";
import TabooEngine from "./TabooEngine";
import ImposterEngine from "./ImposterEngine";

// Define a type for your config to get rid of the 'any'
export interface GameConfig {
  engineTemplate: string;
  [key: string]: any; 
}

const ENGINE_MAP: Record<string, React.ElementType> = {
  "hot-potato": HotPotatoEngine,
  "mcq": McqEngine,
  "taboo": TabooEngine,
  "imposter": ImposterEngine,
  "turn-based": TurnBasedEngine,
};

export default function GameDispatcher({ config }: { config: GameConfig }) {
  // Fallback to TurnBasedEngine if the template isn't found
  const EngineComponent = ENGINE_MAP[config.engineTemplate] || TurnBasedEngine;
  
  return <EngineComponent config={config} />;
}