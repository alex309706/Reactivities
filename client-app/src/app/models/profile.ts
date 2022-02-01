import {User} from "./user";

export interface Profile {
    username : string;
    displayName : string;
    image? : string;
    bio? : string;
    photos?: Photo[];
} 

export class ProfileAsClass {
    username:string;
    displayName: string;
    image:string | undefined;
    
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}