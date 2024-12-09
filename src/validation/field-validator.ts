import {FieldError, Resolutions, ResolutionsValues} from "../types";

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
        return;
    }

    if (title.trim().length < 1) {
        errors.push({
            field: 'title',
            message: 'Title is required',
        });
        return;
    }

    if (title.length > 40) {
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
        return;
    }

    if (author.trim().length < 1) {
        errors.push({
            field: 'author',
            message: 'Author is required',
        });
        return;
    }

    if (author.length > 20) {
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
            message: 'Must be an array or null',
        });
    }

    if (!Array.isArray(availableResolutions)) {
        return;
    }

    if (availableResolutions.length < 1) {
        errors.push({
            field: 'availableResolutions',
            message: 'Must contain at least one element',
        });
        return;
    }

    const invalidResolutions = availableResolutions.filter(resolution => !Resolutions[resolution]);
    if (invalidResolutions.length > 0) {
        errors.push({
            field: 'availableResolutions',
            message: `Invalid resolutions: ${invalidResolutions}`,
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
            message: 'Must be a number or null',
        });
        return;
    }

    if (typeof minAgeRestriction !== 'number') {
        return;
    }

    if (!Number.isInteger(minAgeRestriction)) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'Must be an integer',
        });
        return;
    }

    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'Must be between 1 and 18',
        });
    }
};

export const publicationDateFieldValidator = (publicationDate: any, errors: FieldError[]) => {
    if (typeof publicationDate !== 'string' && typeof publicationDate !== 'undefined') {
        errors.push({
            field: 'publicationDate',
            message: 'Must be a string',
        });
        return;
    }

    if (typeof publicationDate === 'string' && isNaN(new Date(publicationDate).getTime())) {
        errors.push({
            field: 'publicationDate',
            message: 'Must be a date',
        });
    }
};