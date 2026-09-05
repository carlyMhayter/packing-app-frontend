export interface Token {
  access_token: string;
  token_type: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface RefreshToken {
  user_id: number;
  token_id: number;
  expires_at: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  user_id: number;
}

export interface AccessTokenPayload {
  sub: string;
  email: string;
  exp: Date;
  type: string;
}

export interface TokenData {
  email?: string;
}
