import {db, VideoType} from "../db/db";

export const videosRepository = {
    findVideos(): VideoType[] {
        return db.videos;
    },
    deleteAllVideos() {
        db.videos.length = 0;
    },
}