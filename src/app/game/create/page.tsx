import { BoardCard } from "@/components/game/boards/board-card";
import { BoardCardCreate } from "@/components/game/boards/board-card-create";
import { config } from "@/config";
import { BoardProvider } from "@/context/board-context";

import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata = {
  title: `Create game  | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
      <Suspense>
        <BoardCardCreate />
      </Suspense>
    </>
  );
}
