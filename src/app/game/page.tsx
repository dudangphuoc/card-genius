import { BoardCard } from "@/components/game/boards/board-card";
import { config } from "@/config";
import { BoardProvider } from "@/context/board-context";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata = {
  title: `Game | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BoardProvider>

          <BoardCard />


        </BoardProvider>

      </Suspense>
    </>
  );
}
