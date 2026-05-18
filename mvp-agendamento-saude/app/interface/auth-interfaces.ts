export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data?: {
    email: string;
    role: string;
    token: string;
  };
}