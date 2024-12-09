import {ResolutionsValues} from "../types";

export type CreateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions?: ResolutionsValues[] | null,
};