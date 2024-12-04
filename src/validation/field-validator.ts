import {FieldError} from "../types";
import {Resolutions, ResolutionsValues} from "../db/db";

export const titleFieldValidator = (title: string | undefined, errors: FieldError[]) => {
    if (!title) {
        errors.push({
            field: 'title',
            message: 'Title is required',
        });
    }

    if (title && title.trim().length < 1) {
        errors.push({
            field: 'title',
            message: 'Title is required',
        });
    }

    if (title && title.length > 40) {
        errors.push({
            field: 'title',
            message: 'More than 40 symbols',
        });
    }
};

export const authorFieldValidator = (author: string | undefined, errors: FieldError[]) => {
    if (!author) {
        errors.push({
            field: 'author',
            message: 'Author is required',
        });
    }

    if (author && author.trim().length < 1) {
        errors.push({
            field: 'author',
            message: 'Author is required',
        });
    }

    if (author && author.length > 20) {
        errors.push({
            field: 'author',
            message: 'More than 20 symbols',
        });
    }
};

export const availableResolutionsFieldValidator = (
    availableResolutions: ResolutionsValues[] | null | undefined,
    errors: FieldError[]) => {
    if (Array.isArray(availableResolutions)) {
        if (availableResolutions.length < 1) {
            errors.push({
                field: 'availableResolutions',
                message: 'availableResolutions must contain at least one element',
            });
        }
        availableResolutions.forEach(resolution => {
            if (!Resolutions[resolution]) {
                errors.push({
                    field: 'availableResolutions',
                    message: `${resolution} is invalid value`,
                });
            }
        });
    }
};