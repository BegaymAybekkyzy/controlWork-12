export interface IUser {
    _id: string;
    email: string;
    role: string;
    token: string;
    displayName: string;
    googleID: string;
}

export interface IUserRegistration {
    email: string;
    password: string;
    displayName: string;
}
export interface IUserLogin {
    email: string;
    password: string;
}

export interface IValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface IError {
    error: string;
}

export interface IGroupApi {
    _id: string;
    author: {
        _id: string;
        displayName: string;
    },
    name: string;
    description: string;
    image: string;
    isPublished: boolean;
}

export interface IDetailGroupApi extends IGroupApi {
    members: number;
}

export interface IGroupForm {
    name: string;
    image:File | null;
    description;
}