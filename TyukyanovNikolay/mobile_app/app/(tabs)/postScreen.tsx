import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert, TouchableOpacity, FlatList} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { usePostStore } from '../../store/postStore';
import UpdatePostModal from '../../components/postModals/updatePostModal';
import AddPostModal from '../../components/postModals/addPostModal';

export default function UsersScreen() {
    const [ posts, setPosts ] = useState([]);
    const [ id, setId ] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [addModalVisible, setAddModalVisible] = useState(false);

    const { updateToken, currentUser } = useAuthStore();
    const { getPosts, deletePost } = usePostStore();

    const LoadPosts = async (onlyMy:boolean) => {
        try {
            let posts = await getPosts(id, onlyMy);
            if (posts == null) {
                await updateToken();
                posts = await getPosts(id, onlyMy);
            }
            setPosts(posts);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoadPosts = () => {
        setPosts([]);
        LoadPosts(false);
    }

    const handleSearchMyPosts = (onlyMy:boolean) => {
        setPosts([]);
        LoadPosts(onlyMy);
    }

    useEffect(() => {
        handleLoadPosts();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Tokyo'
        });
    };

    const handleDeletePost = async (id: string) => {
        try {
            let response = await deletePost(id);
            if (response == null) {
                await updateToken();
                await deletePost(id);
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

    const renderPost = (post: any) => (
        <View style={styles.postCard}>
            <View>
                <Text style={styles.metaData} selectable>ID: {post.id}</Text>
                <Text style={styles.metaData}>Автор: {post.author.name} / Создан: {formatDate(post.createdAt)}</Text>
            </View>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
            {post.author.id == currentUser?.id ?
                <View style={styles.buttonsContainer2}>
                    <Button title='Обновить' onPress={() => handleUpdatePost(post)} color="#eb0"/>
                    <Button title='Удалить' onPress={() => handleDeletePost(post.id)} color="#f33"/>
                </View>
            : null}
        </View>
    );

    return (
        <>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', gap: 10}}>
                    <TextInput
                        style={styles.input}
                        placeholder='Введите ID'
                        value={id}
                        onChangeText={(value) => {setId(value)}}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLoadPosts}>
                        <Text style={styles.text}>ПОИСК</Text></TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button3} onPress={()=>handleSearchMyPosts(true)}>
                        <Text style={styles.text}>МОИ ПОСТЫ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={()=>handleSearchMyPosts(false)}>
                        <Text style={styles.text}>ВСЕ ПОСТЫ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>setAddModalVisible(true)}>
                        <Text style={styles.text}>ДОБАВИТЬ ПОСТ</Text></TouchableOpacity>
                </View>
                <Text style={styles.title}>Посты</Text>
                <FlatList
                    style={styles.list}
                    data={posts}
                    keyExtractor={(item:any) => item.id.toString()}
                    renderItem={({ item }) => (
                        renderPost(item)
                    )}
                />
            </View>
            {selectedPost != null ? 
            <UpdatePostModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    handleLoadPosts();
                    setSelectedPost(null);
                }}
                post={selectedPost}
            />
            : null}
            <AddPostModal
                visible={addModalVisible}
                onClose={() => {
                    setAddModalVisible(false);
                    handleLoadPosts();
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    postCard: {
        backgroundColor: 'white',
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
        gap: 10,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 4,
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 16,
    },
    button: {
        borderRadius: 8,
        backgroundColor: '#08f',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button2: {
        borderRadius: 8,
        backgroundColor: '#888',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button3: {
        borderRadius: 8,
        backgroundColor: '#f80',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontWeight: '500'
    },
    list: {
        gap: 10
    },
    buttonContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonsContainer2: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        marginTop: 10,
        gap: 10
    },
    metaData: {
        color: '#aaa',
    },
    postContent: {
        marginTop: 5,
        marginBottom: 12
    }
});
