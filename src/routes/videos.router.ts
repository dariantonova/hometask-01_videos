import {Router, Request, Response} from 'express';
import {videosRepository} from "../repositories/videos.repository";
import {VideoViewModel} from "../models/VideoViewModel";
import {
    APIErrorResult,
    FieldError,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    VideoType
} from "../types";
import {URIParamsVideoIdModel} from "../models/URIParamsVideoIdModel";
import {HTTP_STATUSES} from "../utils";
import {CreateVideoInputModel} from "../models/CreateVideoInputModel";
import {
    authorFieldValidator,
    availableResolutionsFieldValidator,
    canBeDownloadedFieldValidator,
    minAgeRestrictionFieldValidator,
    publicationDateFieldValidator,
    titleFieldValidator
} from "../validation/field-validator";
import {UpdateVideoInputModel} from "../models/UpdateVideoInputModel";

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

router.put('/:id',
    (req: RequestWithParamsAndBody<URIParamsVideoIdModel, UpdateVideoInputModel>,
     res: Response<{} | APIErrorResult>) => {
    const errors: FieldError[] = [];
    titleFieldValidator(req.body.title, errors);
    authorFieldValidator(req.body.author, errors);
    availableResolutionsFieldValidator(req.body.availableResolutions, errors);
    canBeDownloadedFieldValidator(req.body.canBeDownloaded, errors);
    minAgeRestrictionFieldValidator(req.body.minAgeRestriction, errors);
    publicationDateFieldValidator(req.body.publicationDate, errors);
    if (errors.length > 0) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json({
                errorsMessages: errors,
            });
        return;
    }

    const isUpdated = videosRepository.updateVideo(
        +req.params.id, req.body.title, req.body.author, req.body.availableResolutions,
        req.body.canBeDownloaded, req.body.minAgeRestriction, req.body.publicationDate
    );
    if (!isUpdated) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

router.delete('/:id',
    (req: RequestWithParams<URIParamsVideoIdModel>, res: Response) => {
    const isDeleted = videosRepository.deleteVideo(+req.params.id);
    if (!isDeleted) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

export { router as videosRouter };