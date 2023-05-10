import { axiosHandler } from "@/utils/axios.utils";
import { AuthFormTypes, LoginParams, RefreshParams, ResetPasswordParams } from "@/types/auth/authTypes";

// 객체를 동결시켜 수정을 방지, API쵸청시 응답 데이터가 수정되지 않도록 보호 할 수 있음.. (freeze)

export const authApi = Object.freeze({
	async authRegisterRequest(endPoint: string, params: AuthFormTypes) {
		const response = await axiosHandler.post(endPoint, params);
		return response;
	},
	async authLoginRequest(endPoint: string, params: LoginParams) {
		try {
			const response = await axiosHandler.post(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async authLogoutRequest(endPoint: string) {
		// 그냥 클라이언트에 발급받은 토큰을 삭제하면 끝(따로 API 호출이 필요없다)
		const response = axiosHandler.post(endPoint);
		return response;
	},
	async authRefreshRequest(endPoint: string, params: RefreshParams) {
		const response = await axiosHandler.post(endPoint, params);
		return response;
	},
	async authFindRequest(endPoint: string, params: ResetPasswordParams) {
		try {
			const response = await axiosHandler.post(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async authCheckEmailRequest(endPoint: string, email: string) {
		try {
			const response = await axiosHandler.post(endPoint, { email });
			return response;
		} catch (err: any) {
			return err;
		}
	},
});
