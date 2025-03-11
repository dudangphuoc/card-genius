import { GamePlay } from "@/components/game/game-details/game-play";
import { config } from "@/config";
import { GameProvider } from "@/context/game-context";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata = { title: `detail | Card Genius | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (<>
        <Suspense fallback={<div>Loading...</div>}>
            <GameProvider>

                <GamePlay />

            </GameProvider>
        </Suspense>
    </>);
}