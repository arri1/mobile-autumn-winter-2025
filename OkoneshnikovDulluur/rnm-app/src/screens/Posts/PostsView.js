import React from "react";
import { View, ScrollView } from "react-native";
import {
  Appbar,
  Card,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Switch,
} from "react-native-paper";
import { styles } from "./PostsStyles";

export default function PostsView({
  posts,
  pagination,
  page,
  isLoading,
  isMutating,
  error,

  searchDraft,
  onChangeSearchDraft,
  onApplySearch,

  onNext,
  onPrev,

  title,
  content,
  published,
  onChangeTitle,
  onChangeContent,
  onTogglePublished,
  onCreate,
  canCreate,

  onReload,

  onlyMy,
  onToggleOnlyMy,
  isAuthed,

  currentUserId,

  editingId,
  editTitle,
  editContent,
  editPublished,
  onChangeEditTitle,
  onChangeEditContent,
  onToggleEditPublished,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Посты" />
        <Appbar.Action icon="refresh" onPress={onReload} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Режим" />
          <Card.Content>
            {!isAuthed ? (
              <Text style={styles.note}>
                «Только мои» доступно после входа в аккаунт.
              </Text>
            ) : null}

            <View style={styles.row}>
              <Text>Только мои</Text>
              <Switch value={onlyMy} onValueChange={onToggleOnlyMy} disabled={!isAuthed} />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Поиск" />
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Поиск (title/content)"
              value={searchDraft}
              onChangeText={onChangeSearchDraft}
            />
            <Button mode="contained" style={styles.mt} onPress={onApplySearch}>
              Искать
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Создать пост" />
          <Card.Content>
            {!canCreate ? (
              <Text style={styles.note}>Для создания поста требуется авторизация.</Text>
            ) : null}

            <TextInput
              mode="outlined"
              label="Title"
              value={title}
              onChangeText={onChangeTitle}
              style={styles.mtSmall}
            />
            <TextInput
              mode="outlined"
              label="Content"
              value={content}
              onChangeText={onChangeContent}
              multiline
              style={styles.mtSmall}
            />

            <View style={styles.row}>
              <Text>Опубликован</Text>
              <Switch value={published} onValueChange={onTogglePublished} />
            </View>

            <Button
              mode="contained"
              style={styles.mt}
              onPress={onCreate}
              disabled={!canCreate || isMutating}
              loading={isMutating}
            >
              Создать
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title={`Список (страница ${page})`} />
          <Card.Content>
            {isLoading ? <ActivityIndicator style={styles.mtSmall} /> : null}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {!isLoading && !error && posts.length === 0 ? (
              <Text style={styles.note}>Постов нет.</Text>
            ) : null}

            {!isLoading &&
              !error &&
              posts.map((p) => {
                const isOwn = Boolean(currentUserId && p.authorId === currentUserId);
                const isEditing = editingId === p.id;

                return (
                  <View key={p.id} style={styles.post}>
                    <Text style={styles.postTitle}>{p.title}</Text>
                    <Text style={styles.postMeta}>
                      {p.published ? "published" : "draft"} • {p.author?.name || "-"}
                    </Text>

                    {!isEditing ? (
                      <Text style={styles.postContent} numberOfLines={3}>
                        {p.content}
                      </Text>
                    ) : (
                      <View style={styles.editBox}>
                        <TextInput
                          mode="outlined"
                          label="Title"
                          value={editTitle}
                          onChangeText={onChangeEditTitle}
                        />
                        <TextInput
                          mode="outlined"
                          label="Content"
                          value={editContent}
                          onChangeText={onChangeEditContent}
                          multiline
                          style={styles.mtSmall}
                        />
                        <View style={styles.row}>
                          <Text>Опубликован</Text>
                          <Switch value={editPublished} onValueChange={onToggleEditPublished} />
                        </View>

                        <View style={styles.actionsRow}>
                          <Button
                            mode="contained"
                            onPress={onSaveEdit}
                            disabled={isMutating}
                            loading={isMutating}
                          >
                            Сохранить
                          </Button>
                          <Button mode="outlined" onPress={onCancelEdit} disabled={isMutating}>
                            Отмена
                          </Button>
                        </View>
                      </View>
                    )}

                    {/* КНОПКИ ТОЛЬКО ДЛЯ МОИХ ПОСТОВ */}
                    {isOwn && !isEditing ? (
                      <View style={styles.actionsRow}>
                        <Button mode="outlined" onPress={() => onStartEdit(p)} disabled={isMutating}>
                          Редактировать
                        </Button>
                        <Button
                          mode="contained"
                          onPress={() => onDelete(p)}
                          disabled={isMutating}
                        >
                          Удалить
                        </Button>
                      </View>
                    ) : null}
                  </View>
                );
              })}

            <View style={styles.row}>
              <Button mode="outlined" onPress={onPrev} disabled={!pagination?.hasPrev}>
                Назад
              </Button>
              <Button mode="outlined" onPress={onNext} disabled={!pagination?.hasNext}>
                Вперёд
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}
