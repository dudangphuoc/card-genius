"use client";

import {
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { Board, Column } from "@/types/board";
import { config } from "@/config";
import { useGame } from "@/hooks/use-game";
import { AddPointCommand, BoardResponse } from "@/handlers/card-genius";
import { z as zod } from "zod";
import { Controller, Form, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unique } from "next/dist/build/utils";


interface AddPointProps {
  columes: Column[];
  currentData: BoardResponse | null;
  uniqueCode: string;
  handleCloseAddPoint: () => void;
  handleSaveAddPoint: (body: AddPointCommand) => void;
}
const steps = ['', ''];

export function AddPoint({
  columes,
  currentData,
  handleCloseAddPoint,
  handleSaveAddPoint,
}: AddPointProps): React.JSX.Element {
  const {code: boardCode } = useGame();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const [players, setPlayers] = React.useState<any[]>([]);

  useEffect(() => {
    const players = columes?.filter((x) => x.id != "Round").map((player, index) => {
      return {
        name: player.label,
        playerId: player.id,
        point: 0,
        pt: 0,
      };
    }) as any;
    setPlayers(players);

  }, [columes]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    handleSaveAddPoint({
      uniqueCode: boardCode,
      round: 1,
      players: players
    } as AddPointCommand);


    handleCloseAddPoint();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <>
        <DialogContent>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={index} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  <StepLabel>{label}</StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <Grid size={10} direction={"row"} style={{}}>
            {
              players.length > 0 && <>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  Bước {activeStep + 1}
                </Typography>
                {
                  players.map((column, index) => {
                    return (
                      <Grid size={12} key={index} direction={"row"} style={{
                        margin: "10px",
                        borderRadius: "5px",
                      }}>
                        <Grid size={12} direction={"row"} style={{}}>
                          <Typography variant="h6" >
                            {
                              column.name
                            }
                          </Typography>
                        </Grid>
                        <Grid size={12} direction={"row"} style={{}}>
                          {
                            activeStep === 0 ? 
                              <Slider aria-label="#007bff"
                                marks={[
                                  { value: currentData?.four ?? 0, label: '🧻' },
                                  { value: currentData?.third ?? 0, label: '🥉' },
                                  { value: currentData?.second ?? 0, label: '🥈' },
                                  { value: currentData?.first ?? 0, label: '🥇' },
                                ]}
                                defaultValue={players[index].point}
                                value={players[index].point | 0}
                                onChange={(e, value) => {
                                  players[index].point = value;
                                  setPlayers([...players]);
                                }}
                                min={currentData?.four ?? 0}
                                max={currentData?.first ?? 0}
                                step={1}
                                valueLabelDisplay="auto" />
                            :
                              <Slider aria-label="#007bff"
                                    marks={[
                                      { value: -12, label: '🆘' },
                                      { value: -6, label: '🔪' },
                                      { value: -2, label: '🌀' },
                                      { value: 0, label: '🧻' },
                                      { value: +2, label: '👌' },
                                      { value: 6, label: '🤩' },
                                      { value: 12, label: '🦾' },
                                    ]}
                                    defaultValue={players[index].pt}
                                    value={players[index].pt | 0}
                                    onChange={(e, value) => {
                                      players[index].pt = value;
                                      setPlayers([...players]);
                                    }}
                                    min={-12}
                                    max={12}
                                    step={1}
                                    valueLabelDisplay="auto" />
                          }


                        </Grid>
                      </Grid>)
                  })
                }

              </>
            }


          </Grid>

        </DialogContent>
        <DialogActions>
          <Button type="button" autoFocus onClick={handleCloseAddPoint}>
            Hủy
          </Button>
          <Button
            type="button"
            color="inherit"
            onClick={activeStep === 1 ? handleBack : handleNext}
          >
            {activeStep === 1 ? 'Quay lại' : 'Tiếp theo'}
          </Button>
          <Button  onClick={handleComplete}>Hoàn thành</Button>
        </DialogActions>
   
    </>
  );
}
