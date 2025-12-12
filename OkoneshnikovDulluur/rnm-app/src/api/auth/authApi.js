import { http } from "@/api/http";

export const authApi = {
  login: (payload) => http("/auth/login", { method: "POST", body: payload }),
  register: (payload) => http("/auth/register", { method: "POST", body: payload }),
  refresh: (refreshToken) =>
    http("/auth/refresh", { method: "POST", body: { refreshToken } }),
  logout: (refreshToken) =>
    http("/auth/logout", { method: "POST", body: { refreshToken } }),
  profile: (accessToken) => http("/auth/profile", { token: accessToken }),
};
