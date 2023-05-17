import axios from "axios";
import { authApi } from "@/api/auth";
import { API_ENDPOINT } from "@/config/constants";

const axiosOptions = {
	baseURL: API_ENDPOINT,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
};

const axiosHandler = axios.create(axiosOptions);

axiosHandler.interceptors.request.use(
	function (config) {
		// 요청을 보내기 전에 수행할 일
		if (localStorage.getItem("accessToken")) {
			config.headers["authorization-"] = `Bearer ${localStorage.getItem("accessToken")}`;
		} else {
			config.headers["authorization-"] = null;
		}
		return config;
	},
	function (error) {
		// 오류 요청을 보내기전 수행할 일
		return Promise.reject(error);
	}
);

// refresh token multi request 처리
let isRefreshing = false;
let refreshSubscribers: any[] = [];

// 대기열
const processQueue = (err: unknown | null, token: string | null) => {
	refreshSubscribers.forEach((callback) => callback(token));
	refreshSubscribers = [];
};

// refresh token 관련 오류 시, 스토리지를 비우는 함수
const handleResetTokens = async () => {
	if (!isRefreshing) {
		isRefreshing = true;
		try {
			alert("토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요🤗");
			await authApi.createLogoutRequest("/api/auth/logout");
			localStorage.clear();

			if (window !== undefined) {
				location.href = "/auth/sign-in";
			}
			processQueue(null, null);
		} catch (err) {
			processQueue(err, null);
		}
	}
};

// access token 재발급
const getRefreshToken = async () => {
	if (!isRefreshing) {
		isRefreshing = true;
		try {
			const data = await authApi.createRefreshRequest("/api/auth/refresh");
			console.log("리프레시 결과 확인", data);
			if (data.status === 200) {
				axiosHandler.defaults.headers.common["authorization-"] = `Bearer ${data.data.access_token}`;
				processQueue(null, data.data.access_token);
			} else {
				alert("다시 로그인 해주세요🤗");
				localStorage.clear();
				if (window !== undefined) {
					location.href = "/auth/sign-in";
				}
				processQueue(null, null);
			}
		} catch (err) {
			processQueue(err, null);
		} finally {
			isRefreshing = false;
		}
	}
};

axiosHandler.interceptors.response.use(
	function (res) {
		return res;
	},
	async function (error) {
		const originalConfig = error.config;
		const code = error.response.data.error_code;
		console.log("에러코드 확인", code);

		if (
			code === 1002 ||
			code === 2002 ||
			code === 2003 ||
			code === 2004 ||
			code === 2005 ||
			code === 2006 ||
			code === 2007
		) {
			try {
				await handleResetTokens();
				return;
			} catch (err) {
				return Promise.reject(error);
			}
		}

		if (code === 2001) {
			try {
				await getRefreshToken();
				return await axiosHandler(originalConfig);
			} catch (err) {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}
);

export { axiosHandler, axios, API_ENDPOINT };
