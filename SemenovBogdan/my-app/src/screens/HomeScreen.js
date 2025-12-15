import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme/theme';

export default function HomeScreen() {
    const { accessToken, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPosts = async () => {
        try {
            setLoading(true);

            const res = await fetch('https://cloud.kit-imi.info/api/posts');
            const json = await res.json();

            if (!res.ok) throw new Error(json.message);

            setPosts(json.data.posts);
        } catch (e) {
            Alert.alert('Ошибка', e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 40 }} />;
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.content}>{item.content}</Text>

                    <Text style={styles.author}>
                        {item.author?.name || item.author?.email}
                    </Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
        backgroundColor: theme.colors.background,
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        padding: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    content: {
        marginTop: 6,
        fontSize: 14,
        color: theme.colors.muted,
    },
    author: {
        marginTop: 10,
        fontSize: 12,
        color: theme.colors.muted,
    },
});
