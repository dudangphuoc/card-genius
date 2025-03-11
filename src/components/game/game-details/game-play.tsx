'use client';
import { config } from "@/config";
import { AddPointCommand, BoardResponse } from "@/handlers/card-genius";
import { useGame } from "@/hooks/use-game";
import useLocalStorage from "@/hooks/use-local-storage";
import { boardClient } from "@/lib/game/client";
import { Board, Column } from "@/types/board";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {  Grid, useMediaQuery, useTheme } from "@mui/system";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { AddPoint } from "../points/add-point";


export function GamePlay(): React.JSX.Element {
  const router = useRouter();
  const { id: boardId, code: boardCode } = useGame();
  const [boards, setBoards] = useLocalStorage<Board[] | null>(config.keyCache.boards, null);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [currentData, setCurrentData] = React.useState<BoardResponse | null>(null);

  const [columns, setColumns] = React.useState<Column[]>([]);
  const [rows, setRows] = React.useState<any[]>([]);

  const [selectedValue, setSelectedValue] = React.useState<number | undefined>(undefined);
  const [isDetailsExpanded, setDetailsExpanded] = React.useState(false);
  const [isAddPointExpanded, setAddPointExpanded] = React.useState(false);

  //setup models full screen
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  function fetchAndSetBoardData() {
    if (boardId != null && boardId > 0) {
      boardClient.getBoard(boardId).then((rs) => {
        if (rs.message != null) {
          return;
        }
        setCurrentData(rs.data);
        
        // get boards from local storage
        var currentBoard = boards?.find((x) => x.id == rs.data?.id);
        if (currentBoard == undefined) {
          var board: Board = {
            id: rs.data?.id ?? 0,
            code: boardCode ?? '',
            boardCreatedDate: rs.data?.boardCreatedDate
              ? new Date(rs.data.boardCreatedDate).toLocaleDateString()
              : new Date().toLocaleDateString(),
            name: rs.data?.name ?? undefined
          };

          setBoards([...(boards ?? []), board]);
        }
      }).finally(() => { setIsHydrated(true); });
    }
  }
  React.useEffect(() => {
    fetchAndSetBoardData();
  }, [boardId])

  React.useEffect(() => {
    if (currentData != null) {
      //process columes
      var currentColumns = currentData.players.columns ?? [];
      if (currentColumns.length == 0) {
        return;
      }
      var columns: Column[] = [];
      columns.push({ id: "Round", label: "#" });
      for (var i = 0; i < currentColumns.length; i++) {
        columns.push({
          id: currentColumns[i].playerId.toString(),
          label: currentColumns[i].playerName ?? "",
          width: "100px",
          total: currentColumns[i].totalScore ?? 0,
          max: currentData?.max ?? 0,
        });
      }

      setColumns(columns);
      //process rows
      var currentRows = currentData.players.rows ?? [];
      if (currentRows.length == 0) {
        return;
      }
      var gamePlayActions = [];

      for (var i = 0; i < currentRows.length; i++) {
        var obj = {
          Round: currentRows[i]["Round"],
        } as any;

        for (var j = 0; j < currentColumns.length; j++) {
          obj[currentColumns[j].playerId.toString()] = currentRows[i][currentColumns[j].playerId.toString()];
        }
        gamePlayActions.push(obj);
      }

      //order by round
      gamePlayActions.sort((a, b) => {
        return a.Round - b.Round;
      });

      //revert gamePlayActions
      setRows(gamePlayActions.reverse());
    }
  }, [currentData]);

  const back = () => { router.push('/game') };


  const handleDeselectValue = () => {
    console.log(selectedValue);
    console.log(boardCode);
    const round:number = selectedValue ?? 0;
    
    boardClient.removePoint({ uniqueCode: boardCode ?? "", round: round}).then((rs) => {
      if (rs.message != null) {
        return;
      }
    }).finally(() => {
      fetchAndSetBoardData();
      setDetailsExpanded(false);
      setSelectedValue(undefined);
    });
  };

  const handleClose = () => {
    setDetailsExpanded(false);
    setSelectedValue(undefined);
  };
  const handleAddPoint = () => { };

  const handleCloseAddPoint = () => {
    setAddPointExpanded(false);
  };

  const handleSaveAddPoint = (body:AddPointCommand ) => {
    body.round = (currentData?.players.rows?.length ?? 0 ) + 1;
    boardClient.addPoint(body).then((rs) => {
      if (rs.message != null) {
        return;
      }
    }).finally(() => {
      fetchAndSetBoardData();
    });
  }

  if (!isHydrated) {
    return (
      <Stack spacing={2} sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <>
      <Grid container spacing={2} >
        <Button onClick={back}>Back</Button>
        <Grid size={12} direction={"row"} >
          <Grid size={12}>
            <TableContainer >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => {
                      if (column.id == "Round") {
                        return (
                          <TableCell style={{
                            width: 1,
                            textAlign: "center",
                          }} key={index}>
                            {
                              column.label
                            }
                          </TableCell>
                        )
                      }

                      return (
                        <TableCell style={{
                          width: column.width,
                          textAlign: "center",
                          height: "100px",
                        }} key={index}>
                          <Grid size={12} direction={"row"} style={{
                            display: "flex",
                            alignItems: "start",
                            margin: "4px 0px",
                            height: "50px",
                          }}>
                            <Typography variant="body2" >
                              {
                                column.label
                              }
                            </Typography>
                          </Grid>

                          <Grid size={12} direction={"row"} style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "4px 0px",
                          }}>
                            <Typography variant="body1"  >
                              {
                                column.total
                              } / {column.max}
                            </Typography>
                          </Grid>

                        </TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    rows?.map((player, index) => (
                      <TableRow key={index} >
                        {
                          columns.map((column, index) => {
                            if (column.id == "Round") {
                              return (
                                <TableCell key={index} style={{
                                  textAlign: "center",
                                }} >
                                  <Typography variant="body2">
                                    <Button variant="outlined" color="error"
                                      endIcon={<DeleteIcon />}
                                      onClick={() => {
                                        var round = player[column.id][0] as number;
                                        setDetailsExpanded(true);
                                        setSelectedValue(round);
                                      }}>{player[column.id]}</Button>
                                  </Typography>
                                </TableCell>
                              )
                            }

                            return (
                              <TableCell key={index} >
                                <Grid size={12} spacing={2} direction={"column"} style={{
                                  alignItems: "center",
                                }} >
                                  <Grid size={12} direction={"row"} style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    margin: "4px 0px",
                                    paddingBottom: "4px",
                                    borderBottom: "1px solid #e0e0e0",
                                    alignItems: "center"
                                  }}>
                                    <Typography variant="body2" >
                                      {player[column.id][0]} + ({player[column.id][1]})
                                    </Typography>
                                  </Grid>
                                  <Grid size={12} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: "4px 0px",
                                  }}>
                                    <Typography variant="body1" style={{
                                      color: player[column.id][1] > 0 ? "red" : "green",
                                      fontWeight: "bold",
                                      animation: "blinker 1s linear infinite",
                                    }}>
                                      {player[column.id][2]}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </TableCell>
                            )
                          })
                        }
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>


        </Grid>
      </Grid>
      <Dialog
        open={isDetailsExpanded}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn thực hiện
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDeselectValue} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={isAddPointExpanded}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        </DialogTitle>
        <AddPoint currentData={currentData} columes={columns} 
        handleCloseAddPoint={handleCloseAddPoint} 
        handleSaveAddPoint={handleSaveAddPoint}
        uniqueCode={boardCode??""}/>
      
      </Dialog>
      <Fab
        onClick={() => setAddPointExpanded(true)}
        color="primary" aria-label="add" style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
        }}>
        <AddIcon />
      </Fab>
    </>
  );
}