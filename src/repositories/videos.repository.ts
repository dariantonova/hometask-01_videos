import {db, ResolutionsValues, VideoType} from "../db/db";

const DAY_DURATION_MS = 24 * 60 * 60 * 1000;

export const videosRepository = {
    findVideos(): VideoType[] {
        return db.videos;
    },
    findVideoById(id: number): VideoType | undefined {
        return db.videos.find(v => v.id === id);
    },
    createVideo(title: string, author: string,
                availableResolutions: ResolutionsValues[] | null | undefined): VideoType {
        const currentTime = new Date();
        const nextDay = new Date(currentTime.getTime() + DAY_DURATION_MS);

        const createdVideo: VideoType = {
            id: +(new Date()),
            title,
            author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: currentTime.toISOString(),
            publicationDate: nextDay.toISOString(),
            availableResolutions: Array.isArray(availableResolutions) ? availableResolutions : null,
        };

        db.videos.push(createdVideo);

        return createdVideo;
    },
    updateVideo(id: number, title: string, author: string, availableResolutions: ResolutionsValues[] | null | undefined,
                canBeDownloaded: boolean | undefined, minAgeRestriction: number | null | undefined,
                publicationDate: string | undefined): boolean {
        const video = db.videos.find(v => v.id === id);
        if (!video) {
            return false;
        }

        video.title = title;
        video.author = author;

        if (typeof availableResolutions !== 'undefined') {
            video.availableResolutions = availableResolutions;
        }
        if (typeof canBeDownloaded !== 'undefined') {
            video.canBeDownloaded = canBeDownloaded;
        }
        if (typeof minAgeRestriction !== 'undefined') {
            video.minAgeRestriction = minAgeRestriction;
        }
        if (publicationDate) {
            video.publicationDate = new Date(publicationDate).toISOString();
        }

        return true;
    },
    deleteVideo(id: number): boolean {
        for (let i = 0; i < db.videos.length; i++) {
            if (db.videos[i].id === id) {
                db.videos.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    deleteAllVideos() {
        db.videos.length = 0;
    },
}