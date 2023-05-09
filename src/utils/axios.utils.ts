import axios, { Axios, AxiosError } from "axios";
import { API_ENDPOINT } from "@/config/constants";

const axiosOptions = {
	baseURL: API_ENDPOINT,
	withCredentials: true,

	headers: {
		"Content-Type": "application/json",
	},
	timeout: 3000, //  3초 지나면 요청 중단, 임의로 해놨어요
};

const axiosHandler = axios.create(axiosOptions);

axiosHandler.interceptors.request.use(
	function (config) {
		// 요청을 보내기 전에 수행할 일
		config.headers["authorization-"] = `Bearer ${localStorage.getItem("accessToken")}`;
		return config;
	},
	function (error) {
		// 오류 요청을 보내기전 수행할 일
		console.log("토큰만료?");
		return Promise.reject(error);
	}
);

axiosHandler.interceptors.response.use(
	function (res) {
		return res;
	},
	function (error) {
		return Promise.reject(error);

		// TODO : 리프레시 토큰 처리
		// if (error.response.status >= 400 && error.response.status < 500) {
		// 	// return Promise.reject(error);
		// 	// return error;
		// } else if (error.reponse.status >= 500) {
		// 	return AxiosError;
		// }
	}
);

export { axiosHandler, axios, API_ENDPOINT };
