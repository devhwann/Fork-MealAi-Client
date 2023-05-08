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
	// async findUserById(userId: string) {
	// 	const response = await axiosHandler.get(`/api/users?user_id=${userId}`);
	// 	return response;
	// },
});
