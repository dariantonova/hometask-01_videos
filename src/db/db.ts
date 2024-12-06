export enum Resolutions {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
}

export type ResolutionsValues = `${Resolutions}`;

export type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: ResolutionsValues[] | null,
};

export type DBType = { videos: VideoType[] };

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