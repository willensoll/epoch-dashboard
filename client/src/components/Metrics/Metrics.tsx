import {useQuery} from "@tanstack/react-query";
import {fetchMetrics} from "../../controller/controller.ts";
import "./metrics.css"
import React from "react";

export const Metrics = () => {
    const intervalMs = 30000;
    const {status, data, error, isFetching, isLoading} = useQuery({
        queryKey: ['metrics'],
        queryFn: async () => {
            return await fetchMetrics();
        },
        refetchInterval: intervalMs,
    });

    if (status === 'error') return <>Error: {error.message}</>;

    return (
        <>
            {isFetching || isLoading  ? <div className={"loading"}>Loading... </div> : <pre>{data}</pre>}
        </>
    )
}