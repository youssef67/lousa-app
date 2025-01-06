export enum LoginResult {
  CANCELLED,
  GO_TO_CONFIRM,
  GO_TO_SIGN_UP
}

export enum SignUpResult {
  CANCELLED,
  GO_TO_CONFIRM,
  GO_TO_LOGIN
}

export enum ConfirmResult {
  CANCELLED,
  GO_TO_RESEND,
  GO_TO_SUCCESS
}

export enum AuthType {
  EMAIL_LOGIN,
  EMAIL_SIGNUP
}

export enum AuthState {
  NONE,
  LOGIN,
  LOGIN_CONFIRM,
  SIGNUP,
  SIGNUP_CONFIRM
}
