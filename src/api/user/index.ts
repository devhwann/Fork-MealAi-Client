import { ChangePasswordTypes, CheckPasswordType } from "@/types/user/userTypes";
import { axiosHandler, axios, API_ENDPOINT } from "@/utils/axios.utils";

/**
 * user apis
 * 사용자 조회 및 업데이트, 삭제를 담당하는 api 객체
 */
export const userApi = Object.freeze({
	async userInfoRequest(endPoint: string) {
		const response = axiosHandler.get(endPoint);
		return response;
	},
	async changePasswordRequest(endPoint: string, params: ChangePasswordTypes) {
		try {
			const response = await axiosHandler.patch(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async checkPasswordRequest(endPoint: string, params: CheckPasswordType) {
		// const response = await axiosHandler.post(endPoint, params);
		// return response;
		try {
			const response = await axiosHandler.post(endPoint, params);
			return response;
		} catch (err: any) {
			return err;
		}
	},
	// async findUserById(userId: string) {
	// 	const response = await axiosHandler.get(`/api/users?user_id=${userId}`);
	// 	return response;
	// },
});
