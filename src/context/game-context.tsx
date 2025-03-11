'use client';
import { BoardResponse } from "@/handlers/card-genius";
import useLocalStorage from "@/hooks/use-local-storage";
import { useSearchParams } from "next/navigation";
import React from "react";

export interface GameContextValue {
  game: BoardResponse | null;
  id: number | null;
  code: string | null;
  error: string | null;
  checkSession?: () => Promise<void>;
}

export const GameContext = React.createContext<GameContextValue | undefined>(
  undefined
);

export interface GameProviderProps {
  children: React.ReactNode;
}

export function GameProvider({
  children,
}: GameProviderProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const [state, setState] = React.useState<{
    game: BoardResponse | null;
    id: number | null;
    code: string | null
    error: string | null;
    isLoading: boolean;
  }>({
    game: null,
    id: null,
    code:null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const gameId = searchParams.get('id');
      const gameCode = searchParams.get('code');
      setState((prev) => ({ ...prev, game: null, error: null, id:Number(gameId), code:gameCode }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        user: null,
        error: "Something went wrong",
        id:null,
        code:null
      }));
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {});
  }, []);

  return (
    <GameContext.Provider value={{ ...state, checkSession }}>
      {children}
    </GameContext.Provider>
  );
}
