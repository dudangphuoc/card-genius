"use client";

import { config } from "@/config";
import useLocalStorage from "@/hooks/use-local-storage";
import { Board } from "@/types/board";
import { LinearProgress } from "@mui/material";
import React from "react";
export interface BoardContextValue {
  error: string | null;
  isLoading: boolean;
  setisLoading: (value: boolean) => void;
  checkSession?: () => Promise<void>;
}

export const BoardContext = React.createContext<BoardContextValue | undefined>(
  undefined
);

export interface BoardProviderProps {
  children: React.ReactNode;
}

export function BoardProvider({
  children,
}: BoardProviderProps): React.JSX.Element {
  
  const [state, setState] = React.useState<{
    error: string | null;
    isLoading: boolean;
  }>({
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try{
      setState((prev) => ({ ...prev, error: null, isLoading: false }));
    }catch (err)  {
      setState((prev) => ({ ...prev, error: 'Something went wrong', isLoading: false }));
    }
  }, []);

  const setisLoading = React.useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, isLoading: value }));
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
    });
  }, []);


  return (
    <BoardContext.Provider value={{ ...state, checkSession, setisLoading }}>
      {/* {state.isLoading && <LinearProgress color="success" />  } */}
      {children}
    </BoardContext.Provider>
  );
}



export const BoardConsumer = BoardContext.Consumer;