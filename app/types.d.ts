import {ObjectId} from "mongodb";

export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface IPost {
    user: ObjectId,
    title: string,
    description: string,
    image: string,
}