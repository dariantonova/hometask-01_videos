import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {HTTP_STATUSES} from "../src/utils";
import {setDb, VideoType} from "../src/db/db";
import {mapVideoToViewModel} from "../src/routes/videos.router";

describe('tests for /videos', () => {
    beforeAll(async () => {
        await req
            .delete(SETTINGS.PATH.TESTING + '/all-data');
    });

    it('should return empty array', async () => {
        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(HTTP_STATUSES.OK_200, []);
    });

    let createdVideos: VideoType[];
    it('should return array with all videos', async () => {
        createdVideos = [
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
                availableResolutions: ['P720'],
            }
        ];
        setDb(createdVideos);

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(HTTP_STATUSES.OK_200, createdVideos);
    });

    it('should return second video', async () => {
        await req
            .get(SETTINGS.PATH.VIDEOS + '/' + 2)
            .expect(HTTP_STATUSES.OK_200, mapVideoToViewModel(createdVideos[1]));
    });
});