import {ResolutionsValues} from "../db/db";

export type CreateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions?: ResolutionsValues[] | null,
};