import express from 'express';
import {videosRouter} from "./routes/videos.router";
import {SETTINGS} from "./settings";
import {testsRouter} from "./routes/tests.router";

const app = express();

app.use(SETTINGS.PATH.VIDEOS, videosRouter);
app.use(SETTINGS.PATH.TESTING, testsRouter);

export { app };