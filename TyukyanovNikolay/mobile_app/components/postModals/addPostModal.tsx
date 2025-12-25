import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch, ScrollView, Alert, Modal} from 'react-native';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';

interface AddPostModal {
    visible: boolean;
    onClose: () => void;
}

export default function AddPostModal( {visible, onClose}: AddPostModal) {
    const { updateToken } = useAuthStore();
    const { addPost } = usePostStore();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);

    const handleAddPost = async () => {
        try {
            let response = await addPost(title, content, published);
            if (response == null) {
                await updateToken();
                await addPost(title, content, published);
            }
            Alert.alert("Пост добавлен");
            
            setTitle("");
            setContent("");
            setPublished(false);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setTitle("");
        setContent("");
        setPublished(false);
        onClose()
    }

    return (
        <Modal transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Добавление поста</Text>
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
                            style={styles.textArea}
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
                            />
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <Button 
                                title='Добавить' 
                                onPress={handleAddPost}
                                color="#08f"
                            />
                            <Button 
                                title='Отмена' 
                                onPress={() => {handleCancel()}}
                                color="#888"
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
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
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 14,
        minHeight: 100,
        textAlignVertical: 'top',
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