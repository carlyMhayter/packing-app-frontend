export interface OAuthUserInfo {
  provider: string;
  provider_id: string;
  email: string;
  email_verified: boolean;
  first_name?: string;
  last_name?: string;
  picture?: string;
  locale?: string;
}

export interface OAuthCallbackRequest {
  code: string;
  state?: string;
  provider: string;
}

export interface OAuthLoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  is_new_user: boolean;
}
