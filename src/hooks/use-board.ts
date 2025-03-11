import { BoardContext, BoardContextValue } from "@/context/board-context";
import * as React from "react";

export function useBoard(): BoardContextValue {
  const context = React.useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardContext");
  }

  return context;
}


