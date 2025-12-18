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
}) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Посты" />
        <Appbar.Action icon="refresh" onPress={onReload} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
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
              <Text style={styles.note}>
                Для создания поста требуется авторизация.
              </Text>
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
              disabled={!canCreate}
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
              posts.map((p) => (
                <View key={p.id} style={styles.post}>
                  <Text style={styles.postTitle}>{p.title}</Text>
                  <Text style={styles.postMeta}>
                    {p.published ? "published" : "draft"} • {p.author?.name || "-"}
                  </Text>
                  <Text style={styles.postContent} numberOfLines={3}>
                    {p.content}
                  </Text>
                </View>
              ))}

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
