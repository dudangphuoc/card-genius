import { GameContext, GameContextValue } from "@/context/game-context";
import React from "react";

export function useGame(): GameContextValue {
    const context = React.useContext(GameContext);
    if (!context) {
      throw new Error("useGame must be used within a GameContext");
    }
  
    return context;
  }