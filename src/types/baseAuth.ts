// auth api 타입 정의

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
