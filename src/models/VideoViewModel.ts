import {ResolutionsValues} from "../db/db";

export type VideoViewModel = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: ResolutionsValues[] | null,
};