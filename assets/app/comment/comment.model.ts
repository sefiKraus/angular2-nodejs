export class Comment{
    constructor(public content:string,
                public userId:string,
                public itemId?:string,
                public commentDate?:Date,
                public commentId?:string){}
}