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
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme/theme';

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

            const publicRes = await fetch('https://cloud.kit-imi.info/api/posts?published=true');
            const publicJson = await publicRes.json();
            if (!publicRes.ok) throw new Error(publicJson.message);

            let allPosts = publicJson.data.posts;

            if (user && accessToken) {
                const myRes = await fetch(`https://cloud.kit-imi.info/api/posts?authorId=${user.id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const myJson = await myRes.json();
                if (!myRes.ok) throw new Error(myJson.message);

                const postsMap = {};
                [...allPosts, ...myJson.data.posts].forEach(p => {
                    postsMap[p.id] = p;
                });
                allPosts = Object.values(postsMap);
            }

            allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setPosts(allPosts);
        } catch (e) {
            Alert.alert('Ошибка', e.message);
        } finally {
            setLoading(false);
        }
    };

    const publishPost = async (id) => {
        try {
            const res = await fetch(`https://cloud.kit-imi.info/api/posts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ published: true }),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message);

            loadPosts();
        } catch (e) {
            Alert.alert('Ошибка', e.message);
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
                body: JSON.stringify({ title, content, published: false }),
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

    const deletePost = async (id) => {
        try {
            const res = await fetch(`https://cloud.kit-imi.info/api/posts/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${accessToken}` },
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

    if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.author}>{item.author?.name || item.author?.email}</Text>
                            <Text style={styles.author}>{new Date(item.createdAt).toLocaleString()}</Text>
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.content}>{item.content}</Text>

                        {item.authorId === user?.id && (
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deletePost(item.id)}>
                                <Ionicons name="trash" size={20} color="#fff" />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />

            <Modal visible={modalVisible} animationType="slide" transparent>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    list: { padding: 16, backgroundColor: theme.colors.background },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        padding: 16,
        marginBottom: 12,
        position: 'relative',
    },
    title: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
    content: { marginTop: 6, fontSize: 14, color: theme.colors.muted },
    author: { marginBottom: 10, fontSize: 12, color: theme.colors.muted },
    deleteButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: '#e74c3c',
        borderRadius: 6,
        padding: 6,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: theme.colors.primary,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    modalButtonText: { color: '#fff', fontWeight: '600' },
});
