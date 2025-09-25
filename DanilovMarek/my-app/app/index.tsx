import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
	const [str, setStr] = useState('');
	const [strLen, setStrLen] = useState(str.length)
	return (
    <View
      	style={{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
      	}}
    >
		<Text>Use state.</Text>
		<Text>Динамичная длина строки:</Text>
		<TextInput
			placeholder="Введите что-то"
			onChangeText= {(value) => {
				setStr(value)
				setStrLen(value.length)
			}}
			style={styles.textInputStyle}
		>
			{str}
		</TextInput>
		<Button 
			onPress={() => {
				setStr('')
				setStrLen(0)
			}}
		>
			Очистить
		</Button>
		<Text>Длина строки: {strLen}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
	textInputStyle: {
		borderWidth: 1,
		borderColor: 'black'
	}
});
