import {Router, Request, Response} from 'express';
import {videosRepository} from "../repositories/videos.repository";
import {VideoType} from "../db/db";
import {VideoViewModel} from "../models/VideoViewModel";

const mapVideoToViewModel = (dbVideo: VideoType): VideoViewModel => {
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

export { router as videosRouter };