import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Container, Card, H2, H3, Body, Caption } from '@/components/ui';
import usePostStore from '@/store/postStore';
import useThemeStore from '@/store/themeStore';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { H1 } from '../../../components/ui';
import { styles } from './AllPosts.styles';

export default function AllPostsScreen() {
  const { colors } = useThemeStore();
  const { posts, searchPosts } = usePostStore();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = searchQuery.trim() ? searchPosts(searchQuery) : posts;

  return (
    <Container scrollable>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <H1 weight="bold" style={{ color: colors.textPrimary }}>Posts</H1>
      </View>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.backgroundElevated,
            borderColor: colors.border,
          },
        ]}
      >
        <IconSymbol name="magnifyingglass" size={20} color={colors.textTertiary} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder="Поиск по названию, описанию, автору..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <IconSymbol
              name="xmark.circle.fill"
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.postsContainer}>
        {filteredPosts.length === 0 ? (
          <Card variant="outlined">
            <Body style={{ color: colors.textSecondary, textAlign: 'center' }}>
              {searchQuery.trim()
                ? 'По вашему запросу ничего не найдено'
                : 'Постов пока нет'}
            </Body>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} variant="outlined" style={styles.postCard}>
              <H3 style={{ color: colors.textPrimary }}>{post.title}</H3>
              <Body style={{ color: colors.textSecondary, marginTop: 8 }}>
                {post.description}
              </Body>
              <View style={styles.postMeta}>
                <Caption style={{ color: colors.textTertiary }}>
                  Автор: {post.userName}
                </Caption>
                <Caption style={{ color: colors.textTertiary }}>
                  {new Date(post.createdAt).toLocaleString('ru-RU')}
                </Caption>
              </View>
            </Card>
          ))
        )}
      </View>
    </Container>
  );
}
