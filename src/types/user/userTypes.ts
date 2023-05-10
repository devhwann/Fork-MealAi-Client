export interface ChangePasswordType {
	current_password: string;
	change_password: string;
}

export interface CheckPasswordType {
	password: string;
}

export interface EditUserInfoType {
	gender: string;
	age_group?: number;
	nickname: string;
	goal: string;
}
