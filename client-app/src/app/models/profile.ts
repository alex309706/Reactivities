import {User} from "./user";

export interface Profile {
    username : string;
    displayName : string;
    image? : string;
    bio? : string;
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