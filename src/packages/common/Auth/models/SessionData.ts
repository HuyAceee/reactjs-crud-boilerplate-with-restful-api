export interface SessionData {
  accessToken: string;
  refreshToken: string;
  profile: {
    fullName: string;
    role: string;
    avatar: string;
  };
}
