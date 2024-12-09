import {DBType, Resolutions, VideoType} from "../types";

export const db: DBType = {
    videos: [],
};

export const setDb = (videos: VideoType[] | undefined) => {
    db.videos = videos ? videos : [];
};

setDb([
    {
        id: 1,
        title: 'video 1',
        author: 'author 1',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: null,
    },
    {
        id: 2,
        title: 'video 2',
        author: 'author 2',
        canBeDownloaded: true,
        minAgeRestriction: 18,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: [Resolutions.P720],
    }
]);