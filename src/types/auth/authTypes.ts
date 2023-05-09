export interface AuthFormType {
	email: string;
	password: string;
	gender: string;
	age_group?: number;
	nickname: string;
	goal: string;
	// confirmPassword?: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

export interface CheckEmailParams {
	authenticationNumber: number;
}

export interface RefreshParams {
	refresh_token: string;
}

export interface ResetPasswordParams {
	email: string;
}
