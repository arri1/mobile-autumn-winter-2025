import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch, ScrollView, Alert, Modal} from 'react-native';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';

interface UpdatePostModalProps {
    visible: boolean;
    onClose: () => void;
    post: {
        id: string;
        title: string;
        content: string;
        published: boolean;
    };
}

export default function UpdatePostModal({ visible, onClose, post }: UpdatePostModalProps) {
    const { updateToken } = useAuthStore();
    const { updatePost } = usePostStore();

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [published, setPublished] = useState(post.published);

    const handleUpdatePost = async () => {
        try {
            let response = await updatePost(post.id, title, content, published);
            if (response == null) {
                await updateToken();
                await updatePost(post.id, title, content, published);
            }
            
            Alert.alert("Пост обновлен");
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Обновление поста</Text>
                        </View>
                        
                        <Text style={styles.label}>Заголовок</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Введите новый заголовок'
                            value={title}
                            onChangeText={setTitle}
                        />
                        
                        <Text style={styles.label}>Содержание</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder='Введите новое содержание'
                            value={content}
                            onChangeText={setContent}
                            multiline
                            numberOfLines={4}
                        />
                        
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>
                                {published ? 'Опубликованный' : 'Не опубликованный'}
                            </Text>
                            <Switch
                                value={published}
                                onValueChange={setPublished}
                            />
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={'Обновить'}
                                onPress={handleUpdatePost}
                                color="#08f"
                            />
                            <Button 
                                title='Отмена' 
                                onPress={onClose}
                                color="#888"
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: '100%',
    },
    scrollView: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 16,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
    },
    switchLabel: {
        fontSize: 16,
    },
    buttonContainer: {
        gap: 10
    },
});