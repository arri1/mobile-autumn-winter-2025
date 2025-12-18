import React, { useState } from 'react';
import {View,Text,TextInput,  TouchableOpacity,  SafeAreaView,  ScrollView,  ActivityIndicator, } from 'react-native';
import { usePostsStore } from '../store/PostStore';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { createPost, isLoading, error } = usePostsStore();

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    const result = await createPost(title, content);
    if (result.success) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Новый пост</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Заголовок</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите заголовок"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          <Text style={styles.label}>Содержание</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Напишите что-нибудь..."
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
          />

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCreatePost}
            disabled={isLoading || !title.trim() || !content.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Опубликовать</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1d1d1f',
    textAlign: 'center',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3c3c43',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d1d6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1d1d1f',
    minHeight: 44,
  },
  textArea: {
    minHeight: 180,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
};

export default CreatePostScreen;