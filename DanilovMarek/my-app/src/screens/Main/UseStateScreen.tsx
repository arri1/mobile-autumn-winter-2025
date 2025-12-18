import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Timer from "../../components/Timer";

export default function UseStateScreen() {
    const [str, setStr] = useState('');
    const [strLen, setStrLen] = useState(str.length);
    return (
    <View style={styles.view1}>
        <Timer />
        <View style={styles.view2}>
            <Text style={styles.textStyle1}>UseState</Text>
            <Text style={styles.textStyle2}>Динамичная длина строки:</Text>
            <TextInput
                placeholder="Введите что-то"
                onChangeText= {(value) => {
                    setStr(value);
                    setStrLen(value.length);
                }}
                style={styles.textInputStyle}
            >
                {str}
            </TextInput>
            <Button title="Очистить" onPress={() => {
                setStr('');
                setStrLen(0)
            }}
            />
            <Text>Длина строки: {strLen}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    view1: {
        flex: 1,
    },
    view2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    textInputStyle: {
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 17
    },
    textStyle1: {
        fontSize: 23
    },
    textStyle2: {
        fontSize: 17
    }
});
