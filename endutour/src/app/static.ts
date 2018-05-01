import { User } from "./user";

export class Static {



    static Configuration = class {
        static user: User;




    };

    public setStatic(user_params: User) {
        Static.Configuration.user = user_params;
    }
    public getStatic() {
        return Static.Configuration.user;
    }


}