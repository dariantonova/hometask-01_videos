import {db, VideoType} from "../db/db";

export const videosRepository = {
    findVideos(): VideoType[] {
        return db.videos;
    },
    findVideoById(id: number): VideoType | undefined {
        return db.videos.find(v => v.id === id);
    },
    deleteAllVideos() {
        db.videos.length = 0;
    },
}