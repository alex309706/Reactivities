import {User} from "./user";
import {Photo} from "./photo";

export interface Profile {
    username : string;
    displayName : string;
    image? : string;
    bio? : string;
    followingCount : number;
    followersCount : number;
    following : boolean;
    photos? : Photo[];
} 

export class ProfileAsClass {
    username : string;
    displayName : string;
    image : string | undefined;
    followingCount : number = 0;
    followersCount : number = 0;
    following : boolean = false;

    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

