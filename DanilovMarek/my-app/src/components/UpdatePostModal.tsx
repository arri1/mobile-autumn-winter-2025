import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Button, 
    Switch, 
    ScrollView, 
    Alert, 
    Modal, 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN_KEY } from '../store/useUserStore';
import { UpdatePost } from '../services/PostApi';

interface UpdatePostModalProps {
    visible: boolean;
    onClose: () => void;
    post: {
        id: string;
        title: string;
        content: string;
        published: boolean;
    };
    refreshToken: () => void;
}

export default function UpdatePostModal({ 
    visible, 
    onClose, 
    post, 
    refreshToken,
}: UpdatePostModalProps) {
    const [editingPost, setEditingPost] = useState(post);

    const handleUpdatePost = async () => {
        try {
            const { id, title, content, published } = editingPost;
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
            let response = await UpdatePost(id, title, content, published, accessToken);
            
            if (response == null) {
                await refreshToken();
                accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
                await UpdatePost(id, title, content, published, accessToken);
            }
            
            Alert.alert("Пост обновлен");
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <ScrollView style={styles.modalScrollView}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Обновление поста</Text>
                        </View>
                        
                        <Text style={styles.label}>Заголовок</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Введите новый заголовок'
                            value={editingPost.title}
                            onChangeText={(text) => setEditingPost({...editingPost, title: text})}
                        />
                        
                        <Text style={styles.label}>Содержание</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder='Введите новое содержание'
                            value={editingPost.content}
                            onChangeText={(text) => setEditingPost({...editingPost, content: text})}
                            multiline
                            numberOfLines={4}
                        />
                        
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>
                                {editingPost.published ? 'Опубликованный' : 'Не опубликованный'}
                            </Text>
                            <Switch
                                value={editingPost.published}
                                onValueChange={(value) => setEditingPost({...editingPost, published: value})}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={editingPost.published ? '#f1f1f1ff' : '#f4f3f4'}
                            />
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={'Обновить'}
                                onPress={handleUpdatePost}
                                color="#007AFF"
                            />
                            <View style={styles.buttonSpacing} />
                            <Button 
                                title='Отмена' 
                                onPress={onClose}
                                color="#8E8E93"
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: '100%',
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalScrollView: {
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 8,
    },
    closeButtonText: {
        fontSize: 20,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    disabledInput: {
        backgroundColor: '#f5f5f5',
        color: '#666',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    switchLabel: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
    buttonSpacing: {
        height: 10,
    },
});