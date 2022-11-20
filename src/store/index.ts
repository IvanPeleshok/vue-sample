import { createStore, useStore as baseUseStore, createLogger } from 'vuex'
import { key, State } from './type';
import auth from "./modules/auth/auth.module";
import request from "./modules/request/request.module";

const plugins = [];

if (process.env.NODE_ENV === "development") {
    plugins.push(createLogger());
}

interface Temperary {
    message: "",
    sidebar: boolean;
}

export const store = createStore<State>({
    plugins,
    state() {
        return {
            message: "",
            sidebar: false,
        } as any;
    },
    mutations: {
        setMessage(state, message) {
            state.message = message;
        },
        clearMessage(state) {
            state.message = null;
        },
        openSidebar(state) {
            state.sidebar = true;
        },
        closeSidebar(state) {
            state.sidebar = false;
        }
    },
    actions: {
        setMessage({ commit }, message) {
            commit("setMessage", message);
            setTimeout(() => {
                commit("clearMessage");
            }, 5000);
        },
    },
    modules: {
        auth,
        request
    },
})

export function useStore () {
  return baseUseStore(key);
}