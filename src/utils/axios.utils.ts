import axios, { Axios, AxiosError } from "axios";

const API_ENDPOINT = "http://kdt-ai6-team08.elicecoding.com:5000"; // Cors 이슈
// TODO: ENV파일 만들어서 URL 넣기

const axiosOptions = {
	baseURL: API_ENDPOINT,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 3000, //  3초 지나면 요청 중단, 임의로 해놨어요
};

const axiosHandler = axios.create(axiosOptions);

axiosHandler.interceptors.request.use(
	function (config) {
		// 요청을 보내기 전에 수행할 일
		return config;
	},
	function (error) {
		// 오류 요청을 보내기전 수행할 일

		return Promise.reject(error);
	}
);

axiosHandler.interceptors.response.use(
	function (res) {
		return res;
	},
	function (error) {
		if (error.response.status >= 400 && error.response.status < 500) {
			return Promise.reject(error);
		} else if (error.reponse.status >= 500) {
			return AxiosError;
		}
	}
);

export { axiosHandler, axios, API_ENDPOINT };
