import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {HTTP_STATUSES} from "../src/utils";

describe('sandbox tests', () => {
    beforeAll(async () => {
        await req
            .delete(SETTINGS.PATH.TESTING + '/all-data');
    });

    it('should return empty array', async () => {
        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(HTTP_STATUSES.OK_200, []);
    });
});