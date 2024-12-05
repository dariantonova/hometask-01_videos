import {FieldError} from "../types";
import {Resolutions, ResolutionsValues} from "../db/db";

export const titleFieldValidator = (title: any, errors: FieldError[]) => {
    if (!title) {
        errors.push({
            field: 'title',
            message: 'Title is required',
        });
        return;
    }

    if (typeof title !== 'string') {
        errors.push({
            field: 'title',
            message: 'Must be a string',
        });
    }

    if (typeof title === 'string' && title.trim().length < 1) {
        errors.push({
            field: 'title',
            message: 'Title is required',
        });
    }

    if (typeof title === 'string' && title.length > 40) {
        errors.push({
            field: 'title',
            message: 'More than 40 symbols',
        });
    }
};

export const authorFieldValidator = (author: any, errors: FieldError[]) => {
    if (!author) {
        errors.push({
            field: 'author',
            message: 'Author is required',
        });
        return;
    }

    if (typeof author !== 'string') {
        errors.push({
            field: 'author',
            message: 'Must be a string',
        });
    }

    if (typeof author === 'string' && author.trim().length < 1) {
        errors.push({
            field: 'author',
            message: 'Author is required',
        });
    }

    if (typeof author === 'string' && author.length > 20) {
        errors.push({
            field: 'author',
            message: 'More than 20 symbols',
        });
    }
};

export const availableResolutionsFieldValidator = (
    availableResolutions: ResolutionsValues[] | null | undefined, errors: FieldError[]) => {
    if (!Array.isArray(availableResolutions) && availableResolutions != null) {
        errors.push({
            field: 'availableResolutions',
            message: 'Must be an array',
        });
    }
    if (Array.isArray(availableResolutions)) {
        if (availableResolutions.length < 1) {
            errors.push({
                field: 'availableResolutions',
                message: 'Must contain at least one element',
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

export const canBeDownloadedFieldValidator = (
    canBeDownloaded: any, errors: FieldError[]) => {
    if (typeof canBeDownloaded !== 'boolean' && typeof canBeDownloaded !== 'undefined') {
        errors.push({
            field: 'canBeDownloaded',
            message: 'Must be a boolean',
        });
    }
};

export const minAgeRestrictionFieldValidator = (
    minAgeRestriction: any, errors: FieldError[]) => {
    if (typeof minAgeRestriction !== 'number' && minAgeRestriction != null) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'Must be a number',
        });
    }
    if (typeof minAgeRestriction === 'number') {
        if (!Number.isInteger(minAgeRestriction)) {
            errors.push({
                field: 'minAgeRestriction',
                message: 'Must be an integer',
            });
        }
        if (minAgeRestriction < 1 || minAgeRestriction > 18) {
            errors.push({
                field: 'minAgeRestriction',
                message: 'Must be between 1 and 18',
            });
        }
    }
};

export const publicationDateFieldValidator = (publicationDate: any, errors: FieldError[]) => {
    if (typeof publicationDate !== 'string' && typeof publicationDate !== 'undefined') {
        errors.push({
            field: 'publicationDate',
            message: 'Must be a string',
        });
    }
    if (typeof publicationDate === 'string' && isNaN(new Date(publicationDate).getTime())) {
        errors.push({
            field: 'publicationDate',
            message: 'Must be a date',
        });
    }
};