export interface TwoFactorRequiredResponse {
  requires_2fa: boolean;
  temp_token: string;
  expires_in: number;
  message: string;
}

export interface TwoFactorVerifyRequest {
  temp_token: string;
  code: string;
}

export interface Resend2FARequest {
  temp_token: string;
}
