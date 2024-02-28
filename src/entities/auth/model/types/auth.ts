export interface RegistrationType {
  email: string;
  password: string;
  name: string;
  country: string;
}

export interface AuthLoginResponse {
  user: UserSchema;
  accessToken: string;
  refreshToken: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface AuthSocial {
  idToken: string;
  country: string;
}
