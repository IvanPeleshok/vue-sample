import { IMessage } from "@/types/IMessage";
import { InjectionKey } from "vue";
import { Store } from "vuex";
import { IAuthModule } from "./modules/auth/auth.module";
import { IRequestModule } from "./modules/request/request.module";

export interface State {
    message: IMessage | null;
    sidebar: boolean;
    request: IRequestModule;
    auth: IAuthModule;
}

export const key: InjectionKey<Store<State>> = Symbol();
