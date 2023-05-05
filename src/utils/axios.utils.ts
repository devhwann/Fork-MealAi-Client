import axios from "axios";
import { API_ENDPOINT } from "@/config/constants";

const axiosOptions = {
	baseURL: API_ENDPOINT,
	withCredentials: true,
};

const api = axios.create(axiosOptions);

api.interceptors.request.use(
	function (config) {
		// 요청을 보내기 전에 수행할 일
		return config;
	},
	function (error) {
		// 오류 요청을 보내기전 수행할 일
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	function (res) {
		return res;
	},
	function (error) {
		console.error(error);
		return Promise.reject(error);
	}
);

export { api, axios, API_ENDPOINT };
