import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {HTTP_STATUSES} from "../src/utils";
import {setDb} from "../src/db/db";
import {mapVideoToViewModel} from "../src/routes/videos.router";
import {videoTestManager} from "./video-test-manager";
import {UpdateVideoInputModel} from "../src/models/UpdateVideoInputModel";
import {Resolutions, VideoType} from "../src/types";

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
                availableResolutions: [Resolutions.P720],
            }
        ];
        setDb(createdVideos);

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(HTTP_STATUSES.OK_200, createdVideos);
    });

    it('should return the second video', async () => {
        await req
            .get(SETTINGS.PATH.VIDEOS + '/' + 2)
            .expect(HTTP_STATUSES.OK_200, mapVideoToViewModel(createdVideos[1]));
    });

    it(`shouldn't create video with incorrect input data`, async () => {
        const data = [];

        const data1 = {
            title: '  ',
            author: 'author',
            availableResolutions: [Resolutions.P360],
        };
        data.push(data1);

        const data2 = {
            author: 'author',
            availableResolutions: [Resolutions.P360],
        };
        data.push(data2);

        const data3 = {
            title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            author: 'author',
            availableResolutions: [Resolutions.P360],
        };
        data.push(data3);

        const data4 = {
            title: 'title',
            author: '  ',
            availableResolutions: [Resolutions.P360],
        };
        data.push(data4);

        const data5 = {
            title: 'title',
            availableResolutions: [Resolutions.P360],
        };
        data.push(data5);

        const data6 = {
            title: 'title',
            author: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            availableResolutions: [Resolutions.P360],
        };
        data.push(data6);

        const data7 = {
            title: 'title',
            author: 'author',
            availableResolutions: ['P2'],
        };
        data.push(data7);

        const data8 = {
            title: 'title',
            author: 'author',
            availableResolutions: [],
        };
        data.push(data8);

        for (const dataItem of data) {
            await videoTestManager.createVideo(dataItem, HTTP_STATUSES.BAD_REQUEST_400);
        }
    });

    it('should create video with correct input data', async () => {
        const data = [];

        const data1 = {
            title: 'title',
            author: 'author',
        };
        data.push(data1);

        const data2 = {
            title: 'title',
            author: 'author',
            availableResolutions: null,
        };
        data.push(data2);

        const data3 = {
            title: 'title',
            author: 'author',
            availableResolutions: [Resolutions.P360, Resolutions.P1440],
        };
        data.push(data3);

        for (const dataItem of data) {
            await videoTestManager.createVideo(dataItem, HTTP_STATUSES.CREATED_201);
        }
    });

    it('should return 404 when updating non-existing video', async () => {
        const data: UpdateVideoInputModel = {
            title: 'video',
            author: 'author',
        };
        await videoTestManager.updateVideo(-100, data, HTTP_STATUSES.NOT_FOUND_404);
    });

    it(`shouldn't update video with incorrect input data`, async () => {
        const data = [];

        const data1 = {};
        data.push(data1);

        const data2 = {
            title: '  ',
            author: '',
        };
        data.push(data2);

        const data3 = {
            title: 'title',
            author: 'author',
            availableResolutions: [],
        };
        data.push(data3);

        const data4 = {
            title: 'title',
            author: 'author',
            canBeDownloaded: 4,
        };
        data.push(data4);

        const data5 = {
            title: 'title',
            author: 'author',
            minAgeRestriction: -1,
        };
        data.push(data5);

        const data6 = {
            title: 'title',
            author: 'author',
            publicationDate: 'not date',
        };
        data.push(data6);

        for (const dataItem of data) {
            await videoTestManager.updateVideo(1, dataItem, HTTP_STATUSES.BAD_REQUEST_400);
        }
    });

    it('should update video with correct input data', async () => {
        const data: UpdateVideoInputModel[] = [];

        const data1: UpdateVideoInputModel = {
            title: 'title',
            author: 'author',
            availableResolutions: [Resolutions.P1080],
            canBeDownloaded: true,
            minAgeRestriction: 16,
            publicationDate: '2024',
        };
        data.push(data1);

        const data2: UpdateVideoInputModel = {
            title: 'new title',
            author: 'author',
            availableResolutions: null,
            canBeDownloaded: false,
            minAgeRestriction: null,
        };
        data.push(data2);

        for (const dataItem of data) {
            await videoTestManager.updateVideo(1, dataItem, HTTP_STATUSES.NO_CONTENT_204);
        }
    });

    it('should return 404 when deleting non-existing video', async () => {
        await req
            .delete(SETTINGS.PATH.VIDEOS + '/' + -100)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });

    it('should delete the first video', async () => {
        await req
            .delete(SETTINGS.PATH.VIDEOS + '/' + 1)
            .expect(HTTP_STATUSES.NO_CONTENT_204);

        await req
            .get(SETTINGS.PATH.VIDEOS + '/' + 1)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });
});