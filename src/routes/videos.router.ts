import {Router, Request, Response} from 'express';
import {videosRepository} from "../repositories/videos.repository";
import {VideoType} from "../db/db";
import {VideoViewModel} from "../models/VideoViewModel";
import {RequestWithParams} from "../types";
import {URIParamsVideoIdModel} from "../models/URIParamsVideoIdModel";
import {HTTP_STATUSES} from "../utils";

export const mapVideoToViewModel = (dbVideo: VideoType): VideoViewModel => {
    return {
        id: dbVideo.id,
        title: dbVideo.title,
        author: dbVideo.author,
        canBeDownloaded: dbVideo.canBeDownloaded,
        minAgeRestriction: dbVideo.minAgeRestriction,
        createdAt: dbVideo.createdAt,
        publicationDate: dbVideo.publicationDate,
        availableResolutions: dbVideo.availableResolutions,
    };
}

const router = Router();

router.get('/',
    (req: Request, res: Response<VideoViewModel[]>) => {
    const foundVideos = videosRepository.findVideos();

    res.json(foundVideos.map(mapVideoToViewModel));
});

router.get('/:id',
    (req: RequestWithParams<URIParamsVideoIdModel>,
     res: Response<VideoViewModel>) => {
    const foundVideo = videosRepository.findVideoById(+req.params.id);
    if (!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.json(mapVideoToViewModel(foundVideo));
});

export { router as videosRouter };