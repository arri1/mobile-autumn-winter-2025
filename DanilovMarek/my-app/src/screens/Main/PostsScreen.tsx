import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import { useUserStore } from '../../store/useUserStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN_KEY } from '../../store/useUserStore';
import { GetPosts, DeletePost } from '../../services/PostApi';
import UpdatePostModal from '../../components/UpdatePostModal';
import AddPostModal from '../../components/AddPostModal';

export default function UsersScreen() {
    const [ posts, setPosts ] = useState([]);
    const [ id, setId ] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [addModalVisible, setAddModalVisible] = useState(false);

    const { refreshToken, currentUser } = useUserStore();

    const LoadPosts = async (postId: string, onlyMy: boolean) => {
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
            let posts = await GetPosts(accessToken, postId, onlyMy);
            if (posts == null) {
                await refreshToken();
                accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
                posts = await GetPosts(accessToken, postId, onlyMy);
            }
            setPosts(posts);
            console.log(posts);
        } catch (error) {
            console.error(error);
        }
    };
    const handleLoadPosts = () => {
        setPosts([]);
        LoadPosts("", false);
    }

    const handleSearchPosts = () => {
        setPosts([]);
        LoadPosts(id, false);
    }

    const handleSearchMyPosts = () => {
        setPosts([]);
        LoadPosts("", true);
    }

    useEffect(() => {
        handleLoadPosts();
    }, []);

    // Форматирование даты
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Tokyo'
        });
    };

    const handleDeletePost = async (id: string) => {
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
            let response = await DeletePost(id, accessToken);
            if (response == null) {
                await refreshToken();
                accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
                await DeletePost(id, accessToken);
            }
            Alert.alert("Пост удален");
            handleLoadPosts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdatePost = (post: any) => {
    setSelectedPost({
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published
    });
    setModalVisible(true);
};

    // Рендер элемента списка
    const renderPost = (index: number, post: any) => (
        <View key={index} style={styles.postItem}>
            <Text>ID: {post.id}</Text>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text>{post.content}</Text>
            <Text>Автор: {post.author.name}</Text>
            <Text>Создан: {formatDate(post.createdAt)}</Text>
            <Text>Опубликовано: {post.published.toString()}</Text>
            {post.author.id == currentUser?.id ?
                <View style={styles.buttonsContainer2}>
                    <Button title='Обновить' onPress={() => handleUpdatePost(post)}></Button>
                    <Button title='Удалить' onPress={() => handleDeletePost(post.id)}></Button>
                </View>
            : null}
        </View>
    );

    return (
        <>
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Введите ID'
                    value={id}
                    onChangeText={(value) => {setId(value)}}
                />
                <View style={styles.buttonsContainer}>
                    <Button title='Поиск по ID' onPress={handleSearchPosts}/>
                    <Button title='Все посты' onPress={handleLoadPosts}/>
                    <Button title='Мои посты' onPress={handleSearchMyPosts}/>
                    <Button title='Добавить пост' onPress={() => setAddModalVisible(true)}/>
                </View>
                <Text style={styles.title}>Посты</Text>
                {posts.map((post, index) => renderPost(index, post) )}
            </ScrollView>
            {selectedPost != null ? 
            <UpdatePostModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    handleLoadPosts();
                    setSelectedPost(null);
                }}
                post={selectedPost}
                refreshToken={refreshToken}
            />
            : null}
            <AddPostModal
                visible={addModalVisible}
                onClose={() => {
                    setAddModalVisible(false);
                    handleLoadPosts();
                }}
                refreshToken={refreshToken}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    postItem: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    input: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    buttonsContainer: {
        marginTop: 20,
        marginBottom: 20,
        gap: 10
    },
    buttonsContainer2: {
        marginTop: 10,
        gap: 10
    }
});