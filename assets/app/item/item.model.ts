import {User} from "../auth/user.model";
export class Item{
    constructor(public category:string,
                public title:string,
                public content:string,
                public publisherId:string,
                public pictureLink?:string,
                public publisher?:User,
                public itemId?:string,
                public publishDate?:Date,
                public grade?:Number,
                public gradedByUsers?:User[],
                ){}
}