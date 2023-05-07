import { axiosHandler, axios, API_ENDPOINT } from "@/utils/axios.utils";
import { AuthFormType } from "@/types/auth/authTypes";

// 객체를 동결시켜 수정을 방지, API쵸청시 응답 데이터가 수정되지 않도록 보호 할 수 있음.. (freeze)

export const authApi = Object.freeze({
	async authRegisterRequest(endPoint: string, params: AuthFormType) {
		console.log("실행", API_ENDPOINT);
		const response = await axiosHandler.post(endPoint, params);
		return response;
	},
	async authLoginRequest(endPoint: string, params: AuthFormType) {
		const response = await axiosHandler.post(endPoint, params);
		return response;
	},
	async authLogoutRequest(endPoint: string) {
		// 그냥 클라이언트에 발급받은 토큰을 삭제하면 끝(따로 API 호출이 필요없다)
		const response = axiosHandler.post(endPoint);
		return response;
	},
	async authFindRequest(endPoint: string) {
		const response = axiosHandler.get(endPoint);
		return response;
	},
});
