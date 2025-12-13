import { useState, useEffect } from "react";
import { StyleSheet, FlatList, ActivityIndicator, View, Text } from "react-native";

export default function useEffectLab() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data.slice(0,10));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchPosts();
        
        // Очистка при размонтировании
        return () => {
        console.log('Компонент размонтируется');
        // Можно отменять запросы, если используете AbortController
        };
    }, []);

    if (loading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text>Загрузка...</Text>
        </View>
        );
    }

    if (error) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Ошибка: {error}</Text>
        </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>UseEffect</Text>
            <FlatList
                style={styles.list}
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                        <Text>{item.body}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    list: {
        marginBlock: 10
    },
    post: {
        marginHorizontal: 20, 
        marginBottom: 10, 
        borderRadius: 10, 
        padding: 16, 
        backgroundColor: '#dddddd'
    }
})