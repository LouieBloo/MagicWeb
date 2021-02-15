export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    exp: number;
    iat: number;
  }
  
  export interface TokenResponse {
    token: string;
    _id: string;
  }
  
  export interface TokenPayload {
    email: string;
    password: string;
    name?: string;
  }
  
  export interface RegisterDetails {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginModel {
    email: string;
    password: string;
  }
  
  export interface SearchParameter{
    sort?:any;
    owner?:string;
  }