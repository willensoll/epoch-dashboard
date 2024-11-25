import axios from "axios";
import {env} from "../utils/env.ts";


const baseUrl = env.VITE_BASE_URL
const authToken = env.VITE_AUTH_TOKEN



export const fetchServerTime = async () => {
    const {data} = await axios.get("/time", {baseURL: baseUrl, headers: {"Authorization": authToken}})
    return data
}

export const fetchMetrics = async () => {
    const {data} = await axios.get("/metrics", {baseURL: baseUrl, headers: {"Authorization": authToken}})
    return data
}