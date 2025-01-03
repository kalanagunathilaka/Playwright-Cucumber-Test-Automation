export enum InvalidBookCreation {
    MANDATORY_FIELDS_NOT_SENT = "MANDATORY_FIELDS_NOT_SENT",
    MANDATORY_FIELDS_NULL = "MANDATORY_FIELDS_NULL",
    MANDATORY_FIELDS_EMPTY = "MANDATORY_FIELDS_EMPTY",
    TITLE_NOT_SENT = "TITLE_NOT_SENT",
    AUTHOR_NOT_SENT = "AUTHOR_NOT_SENT",
    TITLE_NULL = "TITLE_NULL",
    AUTHOR_NULL = "AUTHOR_NULL",
    TITLE_EMPTY = "TITLE_EMPTY",
    AUTHOR_EMPTY = "AUTHOR_EMPTY",               
}

export const InvalidBookCreationDetails = {
    [InvalidBookCreation.MANDATORY_FIELDS_NOT_SENT]: { title: undefined, author: undefined },
    [InvalidBookCreation.MANDATORY_FIELDS_NULL]: { title: null, author: null },
    [InvalidBookCreation.MANDATORY_FIELDS_EMPTY]: { title: "", author: "" },
    [InvalidBookCreation.TITLE_NOT_SENT]: { title: undefined },
    [InvalidBookCreation.AUTHOR_NOT_SENT]: { author: undefined },
    [InvalidBookCreation.TITLE_NULL]: { title: null },
    [InvalidBookCreation.AUTHOR_NULL]: { author: null },
    [InvalidBookCreation.TITLE_EMPTY]: { title: "" },
    [InvalidBookCreation.AUTHOR_EMPTY]: { author: "" },
};
