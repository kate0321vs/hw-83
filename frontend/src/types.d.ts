export interface RegisterMutation {
    username: string;
    password: string;
}

export interface IUser {
    _id: string;
    username: string;
    password: string;
    token: string;
}

export interface RegisterResponse {
    user: IUser;
    message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface IPost {
    _id: string;
    user: {username: string},
    title: string,
    description: string,
    image: string,
    date: string,
}

export interface IPostMutation {
    user: string,
    title: string,
    description: string,
    image:  File | null,
}

export interface IComment {
    _id: string;
    user: {username: string},
    post: string
    text: string,
}

export interface ICommentMutation {
    user: string,
    post: string
    text: string,
}