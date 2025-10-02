import { Button } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
	const [str, setStr] = useState('');
	const [strLen, setStrLen] = useState(str.length);
	const [isNameLoad, setNameLoad] = useState(false);

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/users/${Math.floor(Math.random() * 10 + 1)}`)
			.then(response => response.json())
			.then(user => { setStr('Привет, ' + user.name + '!') })
			.catch(error => console.log(error))
			.finally(() => { setNameLoad(false) })
	}, [isNameLoad])

	useEffect(() => {
		setStrLen(str.length)
	}, [str])

	return (
    <View style={styles.style}>
		<Text>UseState и UseEffect</Text>
		<Text>Динамичная длина строки:</Text>
		<TextInput
			placeholder="Введите что-то"
			onChangeText= {(value) => { setStr(value) }}
			style={styles.textInputStyle}
		>
			{str}
		</TextInput>
		<Button onPress={() => {setNameLoad(true)}}>
			Приветствие
		</Button>
		<Button onPress={() => { setStr('') }}>
			Очистить
		</Button>
		<Text>Длина строки: {strLen}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
	style: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
    gap: 10
    },

	textInputStyle: {
		borderWidth: 1,
		borderColor: 'black'
	}
});
