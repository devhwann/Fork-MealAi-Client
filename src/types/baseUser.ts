// user api 타입 정의

export interface GetUserParams extends EditUserInfoParams {
	email: string;
}

export interface RegisterParams {
	email: string;
	nickName: string;
}

export interface DeleteUserParams {
	// string
}

export interface EditUserInfoParams {
	gender: "M" | "F";
	ageGroup: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	nickName: string;
	goal: "balance" | "diet" | "protein" | "lchf";
}

export interface ChangeUserParams {
	// string
}

export interface CheckPasswordParams {
	// string
}
