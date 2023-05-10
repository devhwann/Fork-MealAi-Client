import { axiosHandler } from "@/utils/axios.utils";
import { AuthFormTypes, LoginParams, RefreshParams, ResetPasswordParams } from "@/types/auth/authTypes";

/**
 * auth apis
 * 유저 가입, 로그인, 로그아웃, 조회 및 리프레시를 담당하는 api 객체
 */

export const authApi = Object.freeze({
	async authRegisterRequest(endPoint: string, params: AuthFormTypes) {
		try {
			const response = await axiosHandler.post(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
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
