import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';


export default function useStateLab(){
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [enabled, setEnabled] = useState(false);

    return(
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <View style={{ marginBottom: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Текстовое поле</Text>
            <TextInput
            style={{
                borderWidth: 1,
                borderColor: "gray",
                padding: 10,
                width: 200,
                marginBottom: 10,
            }}
            placeholder="Введите текст..."
            value={text}
            onChangeText={setText}
            />
            <Text>Вы ввели: {text}</Text>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});