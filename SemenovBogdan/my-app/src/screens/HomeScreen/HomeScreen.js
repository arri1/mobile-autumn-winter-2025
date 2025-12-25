import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';

export default function HomeScreen() {
    const { accessToken, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingPost, setEditingPost] = useState(null);

    const loadPosts = async () => {
        try {
            setLoading(true);

            const publicRes = await fetch('https://cloud.kit-imi.info/api/posts?published=true&limit=1000');
            const publicJson = await publicRes.json();
            if (!publicRes.ok) throw new Error(publicJson.message);

            let allPosts = publicJson.data.posts;

            if (user && accessToken) {
                const myRes = await fetch(
                    `https://cloud.kit-imi.info/api/posts?authorId=${user.id}`,
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                const myJson = await myRes.json();
                if (!myRes.ok) throw new Error(myJson.message);

                const map = {};
                [...allPosts, ...myJson.data.posts].forEach(p => {
                    map[p.id] = p;
                });
                allPosts = Object.values(map);
            }

            allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(allPosts);
        } catch (e) {
            Alert.alert('Ошибка', e.message);
        } finally {
            setLoading(false);
        }
    };

    const createPost = async () => {
        try {
            const res = await fetch('https://cloud.kit-imi.info/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    title,
                    content,
                    published: false,
                }),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message);

            closeModal();
            loadPosts();
        } catch (e) {
            Alert.alert('Ошибка', e.message);
        }
    };

    const updatePost = async () => {
        try {
            const res = await fetch(
                `https://cloud.kit-imi.info/api/posts/${editingPost.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        published: editingPost.published,
                    }),
                }
            );

            const json = await res.json();
            if (!res.ok) throw new Error(json.message);

            closeModal();
            loadPosts();
        } catch (e) {
            Alert.alert('Ошибка', e.message);
        }
    };

    const publishPost = async (post) => {
        try {
            const res = await fetch(
                `https://cloud.kit-imi.info/api/posts/${post.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        title: post.title,
                        content: post.content,
                        published: true,
                    }),
                }
            );

            const json = await res.json();
            if (!res.ok) throw new Error(json.message);

            loadPosts();
        } catch (e) {
            Alert.alert('Ошибка', e.message);
        }
    };

    const deletePost = async (id) => {
        try {
            const res = await fetch(`https://cloud.kit-imi.info/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message);

            loadPosts();
        } catch (e) {
            Alert.alert('Ошибка', e.message);
        }
    };

    const openCreate = () => {
        setEditingPost(null);
        setTitle('');
        setContent('');
        setModalVisible(true);
    };

    const openEdit = (post) => {
        setEditingPost(post);
        setTitle(post.title);
        setContent(post.content);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingPost(null);
        setTitle('');
        setContent('');
    };

    useEffect(() => {
        loadPosts();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 40 }} />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={openCreate}>
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>

            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.author}>
                                {item.author?.name || item.author?.email}
                            </Text>
                            <Text style={styles.author}>
                                {new Date(item.createdAt).toLocaleString()}
                            </Text>
                        </View>

                        {item.authorId === user?.id && !item.published && (
                            <Text style={styles.draft}>Черновик</Text>
                        )}
                        {item.authorId === user?.id && item.published && (
                            <Text style={styles.published}>Опубликовано</Text>
                        )}

                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.content}>{item.content}</Text>

                        {item.authorId === user?.id && (
                            <View style={styles.actions}>
                                <TouchableOpacity
                                    style={styles.publishButton}
                                    onPress={() => openEdit(item)}
                                >
                                    <Ionicons name="create" size={16} color="#fff" />
                                </TouchableOpacity>

                                {!item.published && (
                                    <TouchableOpacity
                                        style={styles.publishButton}
                                        onPress={() => publishPost(item)}
                                    >
                                        <Text style={styles.actionText}>Опубликовать</Text>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => deletePost(item.id)}
                                >
                                    <Ionicons name="trash" size={18} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="Заголовок"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Содержание"
                            value={content}
                            onChangeText={setContent}
                            style={[styles.input, { height: 80 }]}
                            multiline
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={editingPost ? updatePost : createPost}
                            >
                                <Text style={styles.modalButtonText}>
                                    {editingPost ? 'Сохранить' : 'Создать'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                                onPress={closeModal}
                            >
                                <Text style={styles.modalButtonText}>Отмена</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
