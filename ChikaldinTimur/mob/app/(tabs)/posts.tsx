import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { createPost, deletePost, getPostById, listMyPosts, listPosts, Post, updatePost } from '@/api/posts';
import { useAuthStore } from '@/store/auth';

type TabKey = 'all' | 'my';

function formatDateRu(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function includesCI(haystack: string | undefined | null, needle: string) {
  if (!haystack) return false;
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function PostEditorModal({
  visible,
  mode,
  initial,
  onClose,
  onSubmit,
  loading,
}: {
  visible: boolean;
  mode: 'create' | 'edit';
  initial?: Pick<Post, 'id' | 'title' | 'content' | 'published'>;
  onClose: () => void;
  onSubmit: (payload: { title: string; content: string; published: boolean }) => void;
  loading: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [published, setPublished] = useState(initial?.published ?? false);

  useEffect(() => {
    setTitle(initial?.title ?? '');
    setContent(initial?.content ?? '');
    setPublished(initial?.published ?? false);
  }, [initial?.title, initial?.content, initial?.published, visible]);

  const submit = () => {
    const t = title.trim();
    const c = content.trim();
    if (t.length < 3) {
      Alert.alert('Ошибка', 'Заголовок должен быть минимум 3 символа.');
      return;
    }
    if (c.length < 10) {
      Alert.alert('Ошибка', 'Текст поста должен быть минимум 10 символов.');
      return;
    }
    onSubmit({ title: t, content: c, published });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{mode === 'create' ? 'Создать пост' : 'Редактировать пост'}</Text>

          <Text style={styles.label}>Заголовок</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="Введите заголовок" style={styles.input} />

          <Text style={styles.label}>Текст</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Введите текст поста"
            style={[styles.input, styles.textarea]}
            multiline
          />

          <View style={styles.publishRow}>
            <Text style={styles.publishLabel}>Опубликовать</Text>
            <Switch value={published} onValueChange={setPublished} />
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity style={[styles.smallButton, styles.smallButtonSecondary]} onPress={onClose} disabled={loading}>
              <Text style={[styles.smallButtonText, styles.smallButtonSecondaryText]}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallButton, styles.smallButtonPrimary]} onPress={submit} disabled={loading}>
              <Text style={[styles.smallButtonText, styles.smallButtonPrimaryText]}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function PostsTab() {
  const { user, token, logout } = useAuthStore();

  const [tab, setTab] = useState<TabKey>('all');
  const [exactId, setExactId] = useState('');
  const [filter, setFilter] = useState('');

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editing, setEditing] = useState<Pick<Post, 'id' | 'title' | 'content' | 'published'> | undefined>(undefined);

  const loadList = useCallback(async (overrides?: { tab?: TabKey; filter?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const effectiveTab = overrides?.tab ?? tab;
      const effectiveFilter = overrides?.filter ?? filter;

      const isMy = effectiveTab === 'my';
      const q = effectiveFilter.trim();

      if (isMy) {
        if (!token) throw new Error('Нужно войти в аккаунт.');
        const data = await listMyPosts({ page: 1, limit: 50 }, token);
        setPosts(data.posts);
      } else {
        const data = await listPosts({ page: 1, limit: 50, search: q || undefined }, token);
        setPosts(data.posts);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Неизвестная ошибка.');
    } finally {
      setLoading(false);
    }
  }, [filter, tab, token]);

  useEffect(() => {
    void loadList();
  }, [loadList]);

  const displayed = useMemo(() => {
    const q = filter.trim();
    if (!q) return posts;
    return posts.filter((p) => {
      const date = formatDateRu(p.createdAt);
      return (
        includesCI(p.title, q) ||
        includesCI(p.content, q) ||
        includesCI(p.id, q) ||
        includesCI(p.author?.name ?? '', q) ||
        includesCI(p.author?.email ?? '', q) ||
        includesCI(date, q)
      );
    });
  }, [filter, posts]);

  const handleFind = async () => {
    const id = exactId.trim();
    if (!id) {
      void loadList();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const post = await getPostById(id, token);
      setPosts([post]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Неизвестная ошибка.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setExactId('');
    setFilter('');
    void loadList({ filter: '' });
  };

  const openCreate = () => {
    setEditorMode('create');
    setEditing(undefined);
    setEditorOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditorMode('edit');
    setEditing({ id: post.id, title: post.title, content: post.content, published: post.published });
    setEditorOpen(true);
  };

  const submitEditor = async (payload: { title: string; content: string; published: boolean }) => {
    if (!token) {
      Alert.alert('Ошибка', 'Нужно войти в аккаунт.');
      return;
    }
    setMutating(true);
    try {
      if (editorMode === 'create') {
        await createPost(payload, token);
      } else if (editing?.id) {
        await updatePost(editing.id, payload, token);
      }
      setEditorOpen(false);
      void loadList();
    } catch (e) {
      Alert.alert('Ошибка', e instanceof Error ? e.message : 'Неизвестная ошибка.');
    } finally {
      setMutating(false);
    }
  };

  const confirmDelete = (post: Post) => {
    if (!token) return;
    Alert.alert('Удалить пост?', 'Это действие нельзя отменить.', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            setMutating(true);
            await deletePost(post.id, token);
            void loadList();
          } catch (e) {
            Alert.alert('Ошибка', e instanceof Error ? e.message : 'Неизвестная ошибка.');
          } finally {
            setMutating(false);
          }
        },
      },
    ]);
  };

  const canEditDelete = (post: Post) => {
    if (tab === 'my') return true;
    return Boolean(user?.id && post.authorId === user.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.leftSpacer} />
        <Text style={styles.topTitle}>Посты</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.segment}>
        <TouchableOpacity style={styles.segmentItem} onPress={() => setTab('all')}>
          <Text style={[styles.segmentText, tab === 'all' && styles.segmentTextActive]}>Все посты</Text>
          {tab === 'all' && <View style={styles.segmentUnderline} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentItem} onPress={() => setTab('my')}>
          <Text style={[styles.segmentText, tab === 'my' && styles.segmentTextActive]}>Мои посты</Text>
          {tab === 'my' && <View style={styles.segmentUnderline} />}
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayed}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <View style={styles.searchCard}>
              <Text style={styles.searchTitle}>Поиск</Text>

              <View style={styles.searchRow}>
                <TextInput
                  value={exactId}
                  onChangeText={setExactId}
                  placeholder="Поиск по id (точный id)"
                  style={[styles.input, styles.searchInput]}
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.findBtn} onPress={handleFind} disabled={loading}>
                  <Text style={styles.findBtnText}>Найти</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.searchRow}>
                <TextInput
                  value={filter}
                  onChangeText={setFilter}
                  placeholder="Фильтр: автор, дата, текст, id..."
                  style={[styles.input, styles.searchInput]}
                />
                <TouchableOpacity style={styles.resetBtn} onPress={reset} disabled={loading}>
                  <Text style={styles.resetBtnText}>Сброс</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.createBtn} onPress={openCreate} disabled={mutating}>
              <Text style={styles.createBtnText}>+ Создать пост</Text>
            </TouchableOpacity>

            {loading && (
              <View style={styles.center}>
                <ActivityIndicator />
                <Text style={styles.centerText}>Загрузка...</Text>
              </View>
            )}

            {!loading && error && (
              <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryBtn} onPress={() => void loadList()}>
                  <Text style={styles.retryBtnText}>Повторить</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeaderRow}>
              <Text style={styles.postTitle} numberOfLines={2}>
                {item.title}
              </Text>
              {canEditDelete(item) && (
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.editBtn} onPress={() => openEdit(item)} disabled={mutating}>
                    <Text style={styles.editBtnText}>Правка</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteBtn} onPress={() => confirmDelete(item)} disabled={mutating}>
                    <Text style={styles.deleteBtnText}>Удалить</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <Text style={styles.postId}>ID: {item.id}</Text>
            <Text style={styles.postContent}>{item.content}</Text>

            <View style={styles.postFooter}>
              <Text style={styles.postMeta}>
                Автор: {item.author?.name ?? item.author?.email ?? '—'}
              </Text>
              <Text style={styles.postMeta}>{formatDateRu(item.createdAt)}</Text>
            </View>
          </View>
        )}
      />

      <PostEditorModal
        visible={editorOpen}
        mode={editorMode}
        initial={editing}
        onClose={() => setEditorOpen(false)}
        onSubmit={submitEditor}
        loading={mutating}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  leftSpacer: { width: 70 },
  topTitle: { fontSize: 22, fontWeight: '700' },
  logoutBtn: { width: 70, alignItems: 'flex-end' },
  logoutText: { color: '#2563eb', fontSize: 16, fontWeight: '600' },

  segment: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  segmentItem: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  segmentText: { fontSize: 18, fontWeight: '700', color: '#6b7280' },
  segmentTextActive: { color: '#111827' },
  segmentUnderline: { marginTop: 10, height: 3, width: '90%', backgroundColor: '#111827', borderRadius: 2 },

  listContent: { padding: 16, paddingBottom: 24, gap: 14 },
  headerBlock: { gap: 14, marginBottom: 4 },

  searchCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    gap: 10,
    backgroundColor: '#fff',
  },
  searchTitle: { fontSize: 20, fontWeight: '800' },
  searchRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  searchInput: { flex: 1 },

  label: { fontSize: 14, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  textarea: { height: 110, textAlignVertical: 'top' },

  findBtn: {
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 92,
    alignItems: 'center',
  },
  findBtnText: { color: '#fff', fontWeight: '800' },
  resetBtn: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 92,
    alignItems: 'center',
  },
  resetBtnText: { color: '#111827', fontWeight: '800' },

  createBtn: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  createBtnText: { color: '#fff', fontSize: 18, fontWeight: '800' },

  center: { alignItems: 'center', gap: 8, paddingVertical: 10 },
  centerText: { color: '#374151', fontWeight: '600' },
  errorText: { color: '#b91c1c', fontWeight: '700', textAlign: 'center' },
  retryBtn: { backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  retryBtnText: { color: '#fff', fontWeight: '700' },

  postCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    backgroundColor: '#fff',
    gap: 8,
  },
  postHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  postTitle: { fontSize: 28, fontWeight: '900', flex: 1 },
  cardActions: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  editBtn: { backgroundColor: '#111827', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  editBtnText: { color: '#fff', fontWeight: '800' },
  deleteBtn: {
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fff1f2',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  deleteBtnText: { color: '#dc2626', fontWeight: '900' },

  postId: { color: '#6b7280' },
  postContent: { fontSize: 18, color: '#111827' },
  postFooter: {
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postMeta: { color: '#6b7280', fontWeight: '700' },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 560,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
    gap: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 2 },
  publishRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  publishLabel: { fontSize: 15, fontWeight: '700' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 6 },
  smallButton: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
  smallButtonText: { fontWeight: '800' },
  smallButtonSecondary: { backgroundColor: '#e5e7eb' },
  smallButtonSecondaryText: { color: '#111827' },
  smallButtonPrimary: { backgroundColor: '#111827' },
  smallButtonPrimaryText: { color: '#fff' },
});


