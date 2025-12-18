import { View, Text, StyleSheet, Button } from "react-native";
import {
    useIsRunning,
    useSeconds,
    useTimerActions,
    useTimerId,
} from "../store/useTimerStore";

export default function Timer() {
    const totalSeconds = useSeconds();
    const isRunning = useIsRunning();
    const timerId = useTimerId();
    const { incrementSeconds, setIsRunning, setTimerId, setTotalSeconds } =
        useTimerActions();

    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const controlTimer = () => {
        if (!isRunning) {
            setTimerId(
                setInterval(() => {
                    incrementSeconds();
                }, 1000)
            );
            setIsRunning(true);
        } else {
            clearInterval(timerId);
            setIsRunning(false);
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        clearInterval(timerId);
        setTotalSeconds(0);
    };

    function formatTime(unit: number) {
        return unit < 10 ? "0" + unit : unit;
    }

    return (
        <View style={styles.view1}>
            <Text style={styles.text1}>Zustand</Text>
            <View style={styles.timerBlockStyle}>
                <Button
                    title={isRunning ? "Стоп" : "Старт"}
                    onPress={controlTimer}
                    color={isRunning ? "#e2a600ff" : "#00af2cff"}
                />
                <Text style={styles.timerStyle}>
                    {formatTime(minutes)}:{formatTime(seconds)}
                </Text>
                <Button title="Сброс" onPress={resetTimer} color="#e20000ff"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#8E8E93",
        padding: 5,
    },
    text1: {
        fontSize: 20,
        color: "white",
        paddingBottom: 5
    },
    timerBlockStyle: {
        alignItems: "center",
        flexDirection: "row",
        gap: 15,
    },
    timerStyle: {
        padding: 3,
        backgroundColor: "black",
        fontSize: 25,
        color: "white",
        borderRadius: 7,
        borderWidth: 2,
        borderColor: "lightgray",
    },
});
