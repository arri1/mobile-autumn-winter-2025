import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Switch, TextInput, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./style";

export default function TabTwoScreen() {
    // Controlled input state
    const [text, setText] = useState("");

    // Fetched posts state
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Single post by id
    const [postId, setPostId] = useState<number | null>(null);
    const [post, setPost] = useState<any>(null);
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState<string | null>(null);
    const [abortController, setAbortController] = useState<AbortController | null>(null);

    useEffect(() => {
        let mounted = true;
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (mounted) setPosts(data);
            } catch (e: any) {
                if (mounted) setError(e.message ?? "Error fetching posts");
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchPosts();
        return () => { mounted = false; };
    }, []);

    // Fetch post by id
    useEffect(() => {
        if (postId === null) return;
        setPost(null);
        setPostError(null);
        setPostLoading(true);
        const controller = new AbortController();
        setAbortController(controller);
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => setPost(data))
            .catch(e => {
                if (e.name !== 'AbortError') setPostError(e.message ?? 'Error fetching post');
            })
            .finally(() => setPostLoading(false));
        return () => {
            controller.abort();
        };
    }, [postId]);

    const handleRandomId = () => {
        setPostId(Math.floor(Math.random() * 10) + 1);
    };
    const handleRefresh = () => {
        if (postId) setPostId(postId); // trigger re-fetch
    };
    const handleCancel = () => {
        if (abortController) abortController.abort();
        setPostLoading(false);
        setPostError('Загрузка отменена');
    };

    // Timer state
    const [seconds, setSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isTimerRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds((s) => s + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isTimerRunning]);

    const handleTimerStartPause = () => setIsTimerRunning((v) => !v);
    const handleTimerReset = () => {
        setSeconds(0);
        setIsTimerRunning(false);
    };

    return (
        <ThemedView style={styles.container}>

            {/* Fetch post by id section */}
            <ThemedView style={styles.section}>
                <ThemedText style={styles.title}>Post by Random ID</ThemedText>
                <ThemedText>Текущий id: {postId ?? '-'}</ThemedText>
                <ThemedView style={styles.buttonContainer}>
                    <Button title="Случайный id" onPress={handleRandomId} />
                    <Button title="Обновить" onPress={handleRefresh} disabled={postId === null} />
                    <Button title="Отменить" onPress={handleCancel} disabled={!postLoading} />
                </ThemedView>
                {postLoading ? (
                    <ActivityIndicator />
                ) : postError ? (
                    <ThemedText>{postError}</ThemedText>
                ) : post ? (
                    <ThemedText>{post.title}</ThemedText>
                ) : null}
            </ThemedView>

            {/* Timer section */}
            <ThemedView style={styles.section}>
                <ThemedText style={styles.title}>Таймер</ThemedText>
                <ThemedText>Время: {seconds} сек</ThemedText>
                <ThemedView style={styles.buttonContainer}>
                    <Button title={isTimerRunning ? "Пауза" : "Старт"} onPress={handleTimerStartPause} />
                    <Button title="Сбросить" onPress={handleTimerReset} />
                </ThemedView>
            </ThemedView>

            {/* Controlled input section */}
            <ThemedView style={styles.section}>
                <ThemedText style={styles.title}>Controlled Input</ThemedText>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Type something..."
                />
                <ThemedText>You typed: {text}</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}


