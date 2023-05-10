import { axiosHandler } from "@/utils/axios.utils";

/**
 * feed apis
 * 등록된 피드 조회, 업데이트, 삭제 api 객체
 */
export const feedsApi = Object.freeze({
	async getMyLikesRequest(endPoint: string) {
		const response = axiosHandler.get(endPoint);
		return response;
	},
});
