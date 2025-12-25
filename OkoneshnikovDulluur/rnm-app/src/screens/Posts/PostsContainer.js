import { postsApi } from "@/api/posts/postsApi";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import PostsView from "./PostsView";

export default function PostsContainer() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const currentUserId = useAuthStore((s) => s.user?.id) || ""; 

  const refreshAccessToken = useAuthStore((s) => s.refreshAccessToken);
  const logout = useAuthStore((s) => s.logout);

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [searchDraft, setSearchDraft] = useState("");

  const [onlyMy, setOnlyMy] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState("");

  // создание
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  // редактирование
  const [editingId, setEditingId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editPublished, setEditPublished] = useState(false);

  const withAuthRetry = async (fn) => {
    if (!accessToken) {
      const e = new Error("Нет авторизации");
      e.status = 401;
      throw e;
    }
    try {
      return await fn(accessToken);
    } catch (e) {
      if (e.status === 401) {
        const newAccess = await refreshAccessToken();
        return await fn(newAccess);
      }
      throw e;
    }
  };

  const load = async () => {
    try {
      setIsLoading(true);
      setError("");

      let res;

      if (onlyMy) {
        res = await withAuthRetry((token) =>
          postsApi.my({ page, limit: 10 }, token)
        );
      } else {
        // публичный список: чтобы не ловить Token expired, токен не передаём
        res = await postsApi.list({ page, limit: 10, search });
      }

      setPosts(res?.data?.posts || []);
      setPagination(res?.data?.pagination || null);
    } catch (e) {
      if (e.status === 401) {
        await logout();
        setError("Сессия истекла. Войдите снова.");
      } else {
        setError(e.message || "Ошибка загрузки");
      }
      setPosts([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, onlyMy, accessToken]);

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

      setIsMutating(true);
      await withAuthRetry((token) =>
        postsApi.create(
          { title: title.trim(), content: content.trim(), published },
          token
        )
      );

      setTitle("");
      setContent("");
      setPublished(false);

      setPage(1);
      await load();
    } catch (e) {
      if (e.status === 401) {
        await logout();
        setError("Сессия истекла. Войдите снова.");
      } else {
        setError(e.message || "Ошибка создания поста");
      }
    } finally {
      setIsMutating(false);
    }
  };

  const onStartEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title || "");
    setEditContent(post.content || "");
    setEditPublished(Boolean(post.published));
  };

  const onCancelEdit = () => {
    setEditingId("");
    setEditTitle("");
    setEditContent("");
    setEditPublished(false);
  };

  const onSaveEdit = async () => {
    try {
      setError("");

      if (!editingId) return;
      if (!editTitle.trim() || !editContent.trim()) {
        setError("Заполните title и content.");
        return;
      }

      setIsMutating(true);

      await withAuthRetry((token) =>
        postsApi.update(
          editingId,
          {
            title: editTitle.trim(),
            content: editContent.trim(),
            published: editPublished,
          },
          token
        )
      );

      onCancelEdit();
      await load();
    } catch (e) {
      if (e.status === 401) {
        await logout();
        setError("Сессия истекла. Войдите снова.");
      } else {
        setError(e.message || "Ошибка обновления поста");
      }
    } finally {
      setIsMutating(false);
    }
  };

  const onDelete = (post) => {
    Alert.alert(
      "Удалить пост?",
      "Действие необратимо.",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            try {
              setError("");
              setIsMutating(true);

              await withAuthRetry((token) => postsApi.remove(post.id, token));

              // если редактировали удалённый пост — сбросить режим
              if (editingId === post.id) onCancelEdit();

              await load();
            } catch (e) {
              if (e.status === 401) {
                await logout();
                setError("Сессия истекла. Войдите снова.");
              } else {
                setError(e.message || "Ошибка удаления поста");
              }
            } finally {
              setIsMutating(false);
            }
          },
        },
      ]
    );
  };

  return (
    <PostsView
      posts={posts}
      pagination={pagination}
      page={page}
      isLoading={isLoading}
      isMutating={isMutating}
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
      onReload={load}
      onlyMy={onlyMy}
      onToggleOnlyMy={(v) => {
        setPage(1);
        setOnlyMy(v);
      }}
      isAuthed={Boolean(accessToken)}
      currentUserId={currentUserId}
      editingId={editingId}
      editTitle={editTitle}
      editContent={editContent}
      editPublished={editPublished}
      onChangeEditTitle={setEditTitle}
      onChangeEditContent={setEditContent}
      onToggleEditPublished={setEditPublished}
      onStartEdit={onStartEdit}
      onCancelEdit={onCancelEdit}
      onSaveEdit={onSaveEdit}
      onDelete={onDelete}
    />
  );
}
