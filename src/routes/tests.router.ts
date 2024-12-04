import {Router, Request, Response} from "express";
import {videosRepository} from "../repositories/videos.repository";
import {HTTP_STATUSES} from "../utils";

const router = Router();

router.delete('/all-data', (req: Request, res: Response) => {
    videosRepository.deleteAllVideos();

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

export { router as testsRouter };