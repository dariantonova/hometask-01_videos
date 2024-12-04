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
};