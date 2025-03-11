"use client";

import { AddBoardReponse } from "@/handlers/card-genius";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Slider,
    Typography,
} from "@mui/material";
import { useRouter } from 'next/navigation';
import { Box, Grid } from "@mui/system";
import { Controller, Form, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { z as zod } from "zod";
import { boardClient } from "@/lib/game/client";

export const playersNameSchema = zod.object({
    playerName: zod.string().min(1, { message: "Player name is required" }),
});

const schema = zod.object({
    name: zod.string().min(1, { message: "Name is required" }),
    first: zod.number().min(0, { message: "First is required" }),
    second: zod.number().min(0, { message: "Second is required" }),
    third: zod.number().min(0, { message: "Third is required" }),
    four: zod.number().min(0, { message: "Four is required" }),
    max: zod.number().min(11, { message: "Max is required" }),
    playersName: zod
        .array(playersNameSchema)
        .min(1, { message: "Players name is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
    name: "Thần bài hôm nay",
    first: 3,
    second: 2,
    third: 1,
    four: 0,
    max: 51,
    playersName: [
        { playerName: "Fitzroy Somerset" },
        { playerName: "Stu Ungar" },
        { playerName: "Doyle Brunson" },
        { playerName: "Phil Ivey" },
    ],
} satisfies Values;

export function BoardCardCreate(): React.JSX.Element {
    const router = useRouter();
    const onSubmit = React.useCallback(async (values: Values) => { 
        const transformedValues = {
            ...values,
            playersName: values.playersName.map(player => player.playerName),
        };
        const response = await boardClient.createBoard(transformedValues);
        if (response.message) {
            console.error(response.message);
            return;
        }
        router.push('/game/details?id=' + response.data?.id + '&code=' + response.data?.uniqueCode);

    }, []);

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        watch,
        setError,
        formState: { errors },
    } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    const totalMarks = [
        {
            value: 21,
            label: '21 điểm',
        },
        {
            value: 41,
            label: '41 điểm',
        },
        {
            value: 51,
            label: '51 điểm',
        },
        {
            value: 61,
            label: '61 điểm',
        },
        {
            value: 81,
            label: '81 điểm',
        },
    ];

    const firstValue = watch('first');
    const secondValue = watch('second');
    const thirdValue = watch('third');
    React.useEffect(() => {
        setValue('second', getValues('first')-1);
        setValue('third', getValues('second')-1);
        setValue('four', getValues('third')-1);
    }, [firstValue]);

    const back = () => { router.push('/game') };

    return (
        <Grid container spacing={4} direction="column" pr={6} pl={6} pt={4} pb={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                🔪 Tạo ván đấu 
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4} size={12}>
                    <Grid size={12}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.name)} fullWidth>
                                    <InputLabel>Tên ván đấu</InputLabel>
                                    <OutlinedInput {...field} label="Tên ván đấu" type="text" />
                                    {errors.name ? (
                                        <FormHelperText>{errors.name.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Controller
                            control={control}
                            name="max"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.max)} fullWidth>
                                    <Typography gutterBottom>Tổng điểm chơi</Typography>
                                    <Slider {...field} aria-label="#007bff" size="medium"
                                        marks={totalMarks}
                                        min={31} max={81}
                                        step={5}
                                        valueLabelDisplay="on" />
                                    {errors.max ? (
                                        <FormHelperText>{errors.max.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            control={control}
                            name="playersName.0.playerName"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.name)} fullWidth>
                                    <InputLabel>Người chơi</InputLabel>
                                    <OutlinedInput {...field} label="Tên ván đấu" type="text" />
                                    {errors.name ? (
                                        <FormHelperText>{errors.name.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Controller
                            control={control}
                            name="playersName.1.playerName"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.name)} fullWidth>
                                     <InputLabel>Người chơi</InputLabel>
                                    <OutlinedInput {...field} label="Tên ván đấu" type="text" />
                                    {errors.name ? (
                                        <FormHelperText>{errors.name.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            control={control}
                            name="playersName.2.playerName"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.name)} fullWidth>
                                    <InputLabel>Người chơi</InputLabel>
                                    <OutlinedInput {...field} label="Tên ván đấu" type="text" />
                                    {errors.name ? (
                                        <FormHelperText>{errors.name.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                    </Grid>


                    <Grid size={6}>
                        <Controller
                            control={control}
                            name="playersName.3.playerName"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.name)} fullWidth>
                                    <InputLabel>Người chơi</InputLabel>
                                    <OutlinedInput {...field} label="Tên ván đấu" type="text" />
                                    {errors.name ? (
                                        <FormHelperText>{errors.name.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Controller
                            control={control}
                            name="first"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.name)} fullWidth>
                                    <Typography gutterBottom>🥇 Về nhất</Typography>
                                    <Slider {...field} aria-label="#007bff"
                                         marks={[
                                            {
                                                value: field.value,
                                                label: `${field.value} điểm`,
                                            },
                                        ]}
                                        min={3} max={12}
                                        step={1}
                                        valueLabelDisplay="auto" />
                                    {errors.first ? (
                                        <FormHelperText>{errors.first.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />

                    </Grid>

                    <Grid size={12}>
                        <Controller
                            control={control}
                            name="second"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.name)} fullWidth>
                                     <Typography gutterBottom>🥈 Về nhì</Typography>
                                     <Slider {...field} aria-label="#007bff" disabled={true}
                                         marks={[
                                            {
                                                value: field.value,
                                                label: `${field.value} điểm`,
                                            },
                                        ]}
                                        min={firstValue - (firstValue / 2)} max={firstValue - 1}
                                        step={1}
                                        valueLabelDisplay="auto" />
                                    {errors.second ? (
                                        <FormHelperText>{errors.second.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Controller
                            control={control}
                            name="third"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.name)} fullWidth>
                                  <Typography gutterBottom>🥉 Về ba</Typography>
                                    <Slider {...field} aria-label="#007bff" disabled={true}
                                         marks={[
                                            {
                                                value: field.value,
                                                label: `${field.value} điểm`,
                                            },
                                        ]}
                                        min={secondValue - (secondValue / 2)} max={secondValue - 1}
                                        step={1}
                                        valueLabelDisplay="auto" />
                                    {errors.third ? (
                                        <FormHelperText>{errors.third.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />

                    </Grid>
                    <Grid size={12}>
                        <Controller
                            control={control}
                            name="four"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.name)} fullWidth>
                                    <Typography gutterBottom>🧻 Về tư</Typography>
                                    <Slider {...field} aria-label="#007bff" disabled={true}
                                        marks={[
                                            {
                                                value: field.value,
                                                label: `${field.value} điểm`,
                                            },
                                        ]}
                                        min={0} max={thirdValue - 1}
                                        step={1}
                                        valueLabelDisplay="auto" />
                                    {errors.four ? (
                                        <FormHelperText>{errors.four.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />

                    </Grid>



                </Grid>

                <Grid container spacing={2} justifyContent="flex-end" pt={4}>
                    <Box display="flex" justifyContent="center">
                        <Button type="button" variant="outlined" color="primary" onClick={back}>
                            Về trước
                        </Button>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Button type="submit" variant="outlined" color="primary">
                            Tạo ván đấu
                        </Button>
                    </Box>
                </Grid>
            </form>
        </Grid>
    );
}
