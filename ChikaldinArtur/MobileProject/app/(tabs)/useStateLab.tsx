import { Platform, StyleSheet } from 'react-native';
import { useState } from 'react';
import { View, Text, Button, Switch, TextInput, ScrollView } from "react-native";

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function useStateLab(){
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [enabled, setEnabled] = useState(false);

    return(
    <ScrollView 
    contentContainerStyle={{ 
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor:'white'}}>
        <View style={{ marginBottom: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Счётчик</Text>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Счёт: {count}</Text>
            <View style={{gap: 20}}>
            <Button title="Увеличить" onPress={() => setCount(count + 1)} />
            <Button title='Reset' onPress={() => setCount(0)}/>
            </View>
        </View>

        <View style={{ marginBottom: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Переключатель</Text>
            <Text style={{ marginBottom: 10 }}>{enabled ? "Включено" : "Выключено"}</Text>
            <Switch value={enabled} onValueChange={setEnabled} />
        </View>

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