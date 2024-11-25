import express, {Request, Response} from 'express';
import {verifyAuthHeader} from "./middleware/auth.js";
import promMid from "express-prometheus-middleware";
import cors from "cors";


export const app = express();

app.use(cors());
app.use(verifyAuthHeader);

app.use(promMid({
    metricsPath: '/metrics',
    metricsApp: app,
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));


app.get('/time', async (req: Request, res: Response) => {
    res.json({"epoch": currentTimeInEpochSeconds()});
});




const currentTimeInEpochSeconds = () => Math.floor(Date.now() / 1000)
