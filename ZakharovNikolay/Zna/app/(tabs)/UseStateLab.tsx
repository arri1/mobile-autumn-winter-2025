import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';


export default function useStateLab(){
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [enabled, setEnabled] = useState(false);

    return(
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <View style={{ marginBottom: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 30, marginBottom: 10 }}>Счётчик</Text>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Счёт: {count}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
            <Button title="+1" onPress={() => setCount(count + 1)}/>
            <Button title='Сбросить' onPress={() => setCount(0)}/>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#666666ff',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});