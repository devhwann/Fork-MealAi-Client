export interface AuthFormType {
	email: string;
	password: string;
	// gender: string;
	// ageGroup: number;
	// nickname: string;
	// goal: string;
	// confirmPassword?: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

export interface CheckEmailParams {
	authenticationNumber: number;
}

export interface ResetPasswordParams {
	// string
}
