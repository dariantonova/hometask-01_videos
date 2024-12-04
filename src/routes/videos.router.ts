import {Router, Request, Response} from 'express';
import {videosRepository} from "../repositories/videos.repository";
import {VideoType} from "../db/db";
import {VideoViewModel} from "../models/VideoViewModel";
import {APIErrorResult, FieldError, RequestWithBody, RequestWithParams} from "../types";
import {URIParamsVideoIdModel} from "../models/URIParamsVideoIdModel";
import {HTTP_STATUSES} from "../utils";
import {CreateVideoInputModel} from "../models/CreateVideoInputModel";
import {
    authorFieldValidator,
    availableResolutionsFieldValidator,
    titleFieldValidator
} from "../validation/field-validator";

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

router.post('/',
    (req: RequestWithBody<CreateVideoInputModel>,
     res: Response<VideoViewModel | APIErrorResult>) => {
    const errors: FieldError[] = [];
    titleFieldValidator(req.body.title, errors);
    authorFieldValidator(req.body.author, errors);
    availableResolutionsFieldValidator(req.body.availableResolutions, errors);
    if (errors.length > 0) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json({
                errorsMessages: errors,
            });
        return;
    }

    const createdVideo = videosRepository.createVideo(
        req.body.title, req.body.author, req.body.availableResolutions
    );

    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(mapVideoToViewModel(createdVideo));
});

export { router as videosRouter };