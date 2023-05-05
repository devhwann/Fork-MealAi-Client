import { LoginParams } from "@/types/baseAuth";
import { api } from "@/utils/axios.utils";

export const authApi = Object.freeze({
	async requestLogin(params: LoginParams) {
		return api.post("/api/login", params);
	},
	async requestLogout() {
		// 그냥 클라이언트에 발급받은 토큰을 삭제하면 끝(따로 API 호출이 필요없다)
		return api.post("/api/logout");
	},
	async findUsers() {
		return api.get("/api/users/db");
	},
});
