import { postsApi } from "@/api/posts/postsApi";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import PostsView from "./PostsView";

export default function PostsContainer() {
  const accessToken = useAuthStore((s) => s.accessToken);

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDraft, setSearchDraft] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  const refreshAccessToken = useAuthStore((s) => s.refreshAccessToken);
  const logout = useAuthStore((s) => s.logout);

  const load = async (p = page, s = search) => {
    try {
      setIsLoading(true);
      setError("");

      const res = await postsApi.list({ page: p, limit: 10, search: s });

      setPosts(res?.data?.posts || []);
      setPagination(res?.data?.pagination || null);
    } catch (e) {
      setError(e.message || "Ошибка загрузки");
      setPosts([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load(page, search);
  }, [page, search, accessToken]);

  const onApplySearch = () => {
    setPage(1);
    setSearch(searchDraft.trim());
  };

  const onCreate = async () => {
    try {
      setError("");

      if (!accessToken) {
        setError("Для создания поста нужно войти в аккаунт.");
        return;
      }
      if (!title.trim() || !content.trim()) {
        setError("Заполните title и content.");
        return;
      }

      try {
        await postsApi.create(
          { title: title.trim(), content: content.trim(), published },
          accessToken
        );
      } catch (e) {
        if (e.status === 401) {
          const newAccess = await refreshAccessToken();
          await postsApi.create(
            { title: title.trim(), content: content.trim(), published },
            newAccess
          );
        } else {
          throw e;
        }
      }

      setTitle("");
      setContent("");
      setPublished(false);

      setPage(1);
      await load(1, search);
    } catch (e) {
      if (e.status === 401) {
        await logout();
        setError("Сессия истекла. Войдите снова.");
        return;
      }
      setError(e.message || "Ошибка создания поста");
    }
  };

  return (
    <PostsView
      posts={posts}
      pagination={pagination}
      page={page}
      isLoading={isLoading}
      error={error}
      searchDraft={searchDraft}
      onChangeSearchDraft={setSearchDraft}
      onApplySearch={onApplySearch}
      onNext={() => pagination?.hasNext && setPage((x) => x + 1)}
      onPrev={() => pagination?.hasPrev && setPage((x) => Math.max(1, x - 1))}
      title={title}
      content={content}
      published={published}
      onChangeTitle={setTitle}
      onChangeContent={setContent}
      onTogglePublished={setPublished}
      onCreate={onCreate}
      canCreate={Boolean(accessToken)}
      onReload={() => load(page, search)}
    />
  );
}
