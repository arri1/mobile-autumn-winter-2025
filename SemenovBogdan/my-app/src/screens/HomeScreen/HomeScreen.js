import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles'

export default function HomeScreen() {
    const { accessToken, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
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

            setTitle('');
            setContent('');
            setModalVisible(false);
            loadPosts();
        } catch (e) {
            Alert.alert('Ошибка', e.message);
        }
    };

    const publishPost = async (post) => {
        try {
            const createRes = await fetch('https://cloud.kit-imi.info/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    title: post.title,
                    content: post.content,
                    published: true,
                }),
            });

            const createJson = await createRes.json();
            if (!createRes.ok) throw new Error(createJson.message);

            const deleteRes = await fetch(
                `https://cloud.kit-imi.info/api/posts/${post.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const deleteJson = await deleteRes.json();
            if (!deleteRes.ok) throw new Error(deleteJson.message);

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

    useEffect(() => {
        loadPosts();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 40 }} />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
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
                            <TouchableOpacity style={styles.modalButton} onPress={createPost}>
                                <Text style={styles.modalButtonText}>Создать</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                                onPress={() => setModalVisible(false)}
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