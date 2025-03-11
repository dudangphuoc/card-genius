"use client";

import { BoardConsumer } from "@/context/board-context";
import { useBoard } from "@/hooks/use-board";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { borderRadius, Container, Grid, height, margin, padding } from "@mui/system";
import { useRouter } from 'next/navigation';
import React from "react";
import { BoardCardCreate } from "./board-card-create";
import useLocalStorage from "@/hooks/use-local-storage";
import { Board } from "@/types/board";
import { config } from "@/config";

export function BoardCard(): React.JSX.Element {
  const router = useRouter();
  const [boards, setBoards] = useLocalStorage<Board[] | null>(config.keyCache.boards, null);

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Typography variant="h4">Game</Typography>
        </Grid>
        <Grid size={4} textAlign="right">
          <Button variant="contained" onClick={() => {
            router.push('/game/create');
          }} color="primary">
            Tạo mới
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} style={{ padding: "20px" }}>
        {boards &&
          boards?.map((CurrencyYenTwoTone, index) => (
            <Grid container spacing={2} key={index} size={12} style={{ 
              border: "1px solid #ccc", 
              borderRadius: "5px",
              padding: "10px" }}>
             <Grid size={12}>
                <Typography variant="body1">{CurrencyYenTwoTone.name}</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="body1">{CurrencyYenTwoTone.boardCreatedDate}</Typography>
              </Grid>
              <Grid size={12} textAlign="right">
                  <Button variant="contained" key={index}
                    onClick={() => {
                      router.push('/game/details?id=' + CurrencyYenTwoTone.id + '&code=' + CurrencyYenTwoTone.code);
                    }}
                  >Xem</Button>
              </Grid>
             
            </Grid>
          ))}
      </Grid>
    </>
  );
}
