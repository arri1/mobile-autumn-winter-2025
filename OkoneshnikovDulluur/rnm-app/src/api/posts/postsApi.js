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
  // GET /posts (публичный)
  list: ({ page = 1, limit = 10, search = "" } = {}, accessToken) => {
    return http(`/posts${toQuery({ page, limit, search })}`, {
      token: accessToken || undefined,
    });
  },

  // GET /posts/my (только авторизованные)
  my: ({ page = 1, limit = 10, published } = {}, accessToken) => {
    return http(`/posts/my${toQuery({ page, limit, published })}`, {
      token: accessToken,
    });
  },

  // POST /posts
  create: ({ title, content, published }, accessToken) => {
    return http("/posts", {
      method: "POST",
      token: accessToken,
      body: { title, content, published },
    });
  },

  // PUT /posts/:id
  update: (id, { title, content, published }, accessToken) => {
    return http(`/posts/${id}`, {
      method: "PUT",
      token: accessToken,
      body: { title, content, published },
    });
  },

  // DELETE /posts/:id
  remove: (id, accessToken) => {
    return http(`/posts/${id}`, {
      method: "DELETE",
      token: accessToken,
    });
  },
};
