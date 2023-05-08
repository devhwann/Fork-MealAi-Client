import { atom } from "recoil";

export const isLoggedInState = atom({
	key: "isLoggedInState",
	default: localStorage.getItem("accessToken") ? true : false,
});
