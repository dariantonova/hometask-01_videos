import {ResolutionsValues} from "../db/db";

export type UpdateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions?: ResolutionsValues[] | null,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    publicationDate?: string,
}