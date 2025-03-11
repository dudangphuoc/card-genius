"use client";
import { BoardProvider } from "@/context/board-context";
import { Box, Container, GlobalStyles } from "@mui/system";
import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <BoardProvider>

        <GlobalStyles
          styles={{
            body: {
              "--MainNav-height": "56px",
              "--MainNav-zIndex": 1000,
              // '--SideNav-width': '280px',
              "--SideNav-zIndex": 1100,
              "--MobileNav-width": "320px",
              "--MobileNav-zIndex": 1100,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            pl: { lg: "var(--SideNav-width)" },
          }}
        >
          <main>
            <Container maxWidth={false} sx={{ py: "24px", px: 0 }}>
              {children}
            </Container>
          </main>
        </Box>
    </BoardProvider>
  );
}
