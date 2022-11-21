import { State } from "@/store/type";
import { IRequest } from "@/types/IRequest";
import { Module } from "vuex";
import axios from "@/axios/request";
import { store } from "@/store";

export interface IRequestModule {
    request: IRequest | null;
    requests: IRequest[];
}

const module: Module<IRequestModule, State> = {
    namespaced: true,
    state() {
        return {
            requests: [],
            request: null,
        };
    },
    mutations: {
        setRequests(state, requests: IRequest[]) {
            state.requests = requests;
        },
        addRequest(state, request: IRequest) {
            state.requests.push(request);
        },
        setRequest(state, request: IRequest) {
            state.request = request;
        },
    },
    actions: {
        async create({ commit, dispatch }, payload: IRequest) {
            try {
                const token = store.getters["auth/token"];
                const { data } = await axios.post(`/request.json?auth=${token}`, payload);
                commit("addRequest", { ...payload, id: data.name });
                dispatch(
                    "setMessage",
                    { value: "Заявка успешно создана", type: "primary" },
                    { root: true }
                );
            } catch (e: any) {
                dispatch(
                    "setMessage",
                    { value: e.message, type: "danger" },
                    { root: true }
                );
            }
        },
        async load({ commit, dispatch }) {
            try {
                const token = store.getters["auth/token"];
                const { data } = await axios.get(`/request.json?auth=${token}`);
                const request = Object.keys(data).map((id) => ({ ...data[id], id }));
                commit("setRequests", request);
            } catch (e: any) {
                dispatch(
                    "setMessage",
                    { value: e.message, type: "danger" },
                    { root: true }
                );
            }
        },
        async loadById({ commit, dispatch }, id: string) {
            try {
                const token = store.getters["auth/token"];
                const { data } = await axios.get(`/request/${id}.json?auth=${token}`);
                commit("setRequest", data);
            } catch (e: any) {
                dispatch(
                    "setMessage",
                    { value: e.message, type: "danger" },
                    { root: true }
                );
            }
        },
        async deleteRequest({ commit, dispatch }, id: string) {
            console.log(id);
            try {
                const token = store.getters["auth/token"];
                const { data } = await axios.delete(`/request/${id}.json?auth=${token}`);
                dispatch(
                    "setMessage",
                    { value: "Заявка удалена", type: "primary" },
                    { root: true }
                );
                commit("setRequest", data);
            } catch (e: any) {
                dispatch(
                    "setMessage",
                    { value: e.message, type: "danger" },
                    { root: true }
                );
            }
        },
    },
    getters: {
        requests(state) {
            return state.requests;
        },
    },
};

export default module;
