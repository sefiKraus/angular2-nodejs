export class User{
    constructor(public email:string,
                public password:string,
                public role:string,
                public firstName?:string,
                public lastName?:string,
                public userId?:string){}
}