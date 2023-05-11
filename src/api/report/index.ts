import { axios, axiosHandler } from "@/utils/axios.utils";

/**
 * report apis
 */

export const reportApi = Object.freeze({
	async getMylogsRequest(endPoint: string) {
		try {
			const response = await axiosHandler.get(endPoint);
			return response;
		} catch (err: any) {
			return err;
		}
	},

	async getReportWeekRequest(endPoint: string) {
		try {
			const response = await axiosHandler.get(endPoint);
			return response;
		} catch (err: any) {
			return err;
		}
	},
});
