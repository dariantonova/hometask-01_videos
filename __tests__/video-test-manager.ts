import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {HTTP_STATUSES} from "../src/utils";
import {VideoViewModel} from "../src/models/VideoViewModel";

export const videoTestManager = {
    async createVideo(data: any, expectedStatusCode: number) {
        const response = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(data)
            .expect(expectedStatusCode);

        if (expectedStatusCode === HTTP_STATUSES.CREATED_201) {
            const createdVideo: VideoViewModel = response.body;
            expect(createdVideo).toEqual({
                id: expect.any(Number),
                title: data.title,
                author: data.author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: expect.any(String),
                publicationDate: expect.any(String),
                availableResolutions: data.availableResolutions ? data.availableResolutions : null,
            });

            expect(isNaN(new Date(createdVideo.createdAt).getTime())).toBe(false);
            expect(isNaN(new Date(createdVideo.publicationDate).getTime())).toBe(false);
        }
    },
    async updateVideo(id: number, data: any, expectedStatusCode: number) {
        const getVideoResponse = await req
            .get(SETTINGS.PATH.VIDEOS + '/' + id);
        const video: VideoViewModel = getVideoResponse.body;

        await req
            .put(SETTINGS.PATH.VIDEOS + '/' + id)
            .send(data)
            .expect(expectedStatusCode);

        if (expectedStatusCode === 204) {
            const getUpdatedVideoResponse = await req
                .get(SETTINGS.PATH.VIDEOS + '/' + id)
                .expect(HTTP_STATUSES.OK_200);
            const updatedVideo: VideoViewModel = getUpdatedVideoResponse.body;

            expect(updatedVideo).toEqual({
                id: video.id,
                title: data.title,
                author: data.author,
                canBeDownloaded: typeof data.canBeDownloaded !== 'undefined' ? data.canBeDownloaded
                    : video.canBeDownloaded,
                minAgeRestriction: typeof data.minAgeRestriction !== 'undefined' ? data.minAgeRestriction
                    : video.minAgeRestriction,
                createdAt: video.createdAt,
                publicationDate: data.publicationDate ? new Date(data.publicationDate).toISOString()
                    : video.publicationDate,
                availableResolutions: typeof data.availableResolutions !== 'undefined' ? data.availableResolutions
                    : video.availableResolutions,
            });
        }
    },
};