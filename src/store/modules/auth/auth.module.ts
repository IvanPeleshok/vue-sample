const TOKEN_KEY = "jwt-token";
import { IUser } from "@/types/IUser";
import axios from "axios";
import { Module } from "vuex";
import { error } from "@/utils/error";
import { State } from "@/store/type";

export interface IAuthModule {
    token: string | null;
}

const module: Module<IAuthModule, State> = {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
        };
    },
    mutations: {
        setToken(state, token: string) {
            state.token = token;
            localStorage.setItem(TOKEN_KEY, token);
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem(TOKEN_KEY);
        },
    },
    actions: {
        async login({ commit, dispatch }, payload: IUser) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`;
                const { data } = await axios.post(url, { ...payload, returenSecureToken: true });
                commit("setToken", data.idToken);
                commit("clearMessage", null, { root: true });
            } catch (e: any) {
                dispatch(
                    "setMessage",
                    { value: error(e.response.data.error.message), type: "danger" },
                    { root: true }
                );
            }
        },
    },
    getters: {
        token(state) {
            return state.token;
        },
        isAuthenticated(_, getters) {
            return !!getters.token;
        },
    },
};

export default module;