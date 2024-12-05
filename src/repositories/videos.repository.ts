import {db, ResolutionsValues, VideoType} from "../db/db";

export const videosRepository = {
    findVideos(): VideoType[] {
        return db.videos;
    },
    findVideoById(id: number): VideoType | undefined {
        return db.videos.find(v => v.id === id);
    },
    createVideo(title: string, author: string, availableResolutions: ResolutionsValues[] | null | undefined): VideoType {
        const currentTime = new Date();
        const dayDurationMs = 24 * 60 * 60 * 1000;
        const nextDay = new Date(currentTime.getTime() + dayDurationMs);

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
    deleteAllVideos() {
        db.videos.length = 0;
    },
}