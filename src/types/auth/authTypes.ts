export interface AuthFormType {
	email: string;
	password: string;
	gender: string;
	age_group?: number;
	nickname: string;
	goal?: string;
	confirmPassword?: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

export interface CheckEmailParams {
	email: string;
}

export interface RefreshParams {
	refresh_token: string;
}

export interface ResetPasswordParams {
	email: string;
}
