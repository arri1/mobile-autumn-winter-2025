import { http } from "@/api/http";

function toQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    q.append(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

export const postsApi = {
  // GET /posts (публичный, но с токеном может показывать больше)
  list: ({ page = 1, limit = 10, search = "" } = {}, accessToken) => {
    return http(`/posts${toQuery({ page, limit, search })}`, {
      token: accessToken || undefined,
    });
  },

  // POST /posts (только авторизованным)
  create: ({ title, content, published }, accessToken) => {
    return http("/posts", {
      method: "POST",
      token: accessToken,
      body: { title, content, published },
    });
  },
};
