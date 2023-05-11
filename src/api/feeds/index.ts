import { axiosHandler } from "@/utils/axios.utils";
import { GetFeedsTypes } from "@/types/feeds/feedsRequestTypes";

/**
 * feeds apis
 * 피드 조회 및 등록, 업데이트, 삭제를 담당하는 api 객체
 */

export const feedsApi = Object.freeze({
	async getFeedsRequest(endPoint: string, params: GetFeedsTypes) {
		try {
			const response = await axiosHandler.get(endPoint, { params: { params } });
			return response;
		} catch (err: any) {
			return err;
		}
	},
	async getMyLikesRequest(endPoint: string) {
		const response = axiosHandler.get(endPoint);
		return response;
	},
	async patchLikesRequest(endPoint: string) {
		const response = axiosHandler.patch(endPoint);
		return response;
	},
});
