import { getSiteURL } from "./lib/get-site-url";
import { LogLevel } from "./lib/logger";

export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
  keyCache: {
    boards : string,
  },
  logLevel: keyof typeof LogLevel;
}
export const config: Config = {
  site: {
    name: "Card Genius",
    description: "",
    themeColor: "#090a0b",
    url: getSiteURL(),
  },
  keyCache: {
    boards : "board_colection"
  },
  logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel,
};



