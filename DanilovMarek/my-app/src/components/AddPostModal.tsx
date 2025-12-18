import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch,
    ScrollView, Alert, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN_KEY } from '../store/useUserStore';
import { AddPost } from '../services/PostApi';

interface AddPostModalProps {
    visible: boolean;
    onClose: () => void;
    refreshToken: () => void;
}

export default function AddPostModal({ visible, onClose, refreshToken }: AddPostModalProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);

    const handleAddPost = async () => {
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
            let response = await AddPost(title, content, published, accessToken);
            if (response == null) {
                await refreshToken();
                accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) as string;
                await AddPost(title, content, published, accessToken);
            }
            
            Alert.alert("Пост добавлен");
            
            setTitle("");
            setContent("");
            setPublished(false);
            
            onClose();
        } catch (error: any) {
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
                            <Text style={styles.modalTitle}>Добавление поста</Text>
                        </View>
                        
                        <Text style={styles.label}>Заголовок</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Введите заголовок'
                            value={title}
                            onChangeText={setTitle}
                        />
                        
                        <Text style={styles.label}>Содержание</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder='Введите содержание'
                            value={content}
                            onChangeText={setContent}
                            multiline
                            numberOfLines={4}
                        />
                        
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>
                                {published ? 'Опубликовать' : 'Не опубликовать'}
                            </Text>
                            <Switch
                                value={published}
                                onValueChange={setPublished}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={published ? '#f1f1f1ff' : '#f4f3f4'}
                            />
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <Button 
                                title='Добавить' 
                                onPress={handleAddPost}
                                color="#007AFF"
                            />
                            <View style={styles.buttonSpacing} />
                            <Button 
                                title='Отмена' 
                                onPress={() => {
                                    setTitle("");
                                    setContent("");
                                    setPublished(false);
                                    onClose()
                                }}
                                color="#8E8E93"
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

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