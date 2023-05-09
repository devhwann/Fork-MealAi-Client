export function validateEmail(email: string) {
	// eslint-disable-next-line
	const isEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/.test(email);
	return isEmail;
}

export function validatePassword(password: string) {
	const isPassword = password.length >= 6;
	return isPassword;
}

export function validateConfirmPassword(password: string, confirmPassword: string) {
	return confirmPassword.length === 0 || password === confirmPassword;
}
