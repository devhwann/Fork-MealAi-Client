export interface ChangePasswordTypes {
	current_password: string;
	change_password: string;
}

export interface CheckPasswordType {
	password: string;
}

export interface EditUserInfoTypes {
	gender: string;
	age_group?: number;
	nickname: string;
	goal: string;
}
