import axios from "axios";
import router from "../router/index";

const instanceAxios = axios.create({
    baseURL: process.env.VUE_APP_FB_URL,
});

instanceAxios.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
        router.push("/auth?message=auth");
    }

    return Promise.reject(error);
});

export default instanceAxios;
