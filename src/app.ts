import express from 'express';
import {videosRouter} from "./routes/videos.router";
import {SETTINGS} from "./settings";

const app = express();

app.use(SETTINGS.PATH.VIDEOS, videosRouter);

export { app };