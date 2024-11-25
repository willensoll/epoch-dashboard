import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchServerTime} from "../../controller/controller.ts";

export const Stopwatch: React.FC = () => {
    const intervalMs = 30000;
    const [time, setTime] = useState(0);

    const {status, data, error, isFetching, isLoading} = useQuery({
        queryKey: ['epoch'],
        queryFn: async () => {
            return await fetchServerTime();
        },
        refetchInterval: intervalMs,
    });

    useEffect(() => {
        setTime(0);
        let intervalId = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 10);

        return () => clearInterval(intervalId);
    }, [data]);

    // Hours calculation
    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    if (status === 'error') return <>Error: {error.message}</>;

    return (
        <>
            {isFetching || isLoading  ? <>Loading... </> : <span>Server time: {data.epoch}</span>}
            <p className="stopwatch-time">
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
            </p>
        </>
    );
};
