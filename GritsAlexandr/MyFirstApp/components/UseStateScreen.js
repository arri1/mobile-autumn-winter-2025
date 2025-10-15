import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './AppStyles';

export default function UseStateScreen({ theme, value, onChange }) {

	return (
		<View style={[styles.innerContainer]}>
			<Text style={[styles.title, { color: theme.text }]}>useState</Text>
			<Text style={[styles.subtitle, { color: theme.text }]}>Счётчик: {value}</Text>
			<View style={styles.buttonContainer}>
				<Button title="+1" onPress={() => onChange(value + 1)} color={theme.button} />
			</View>
			<View style={{ height: 12 }} />
			<View style={styles.buttonContainer}>
				<Button title="Сброс" onPress={() => onChange(0)} color={theme.button} />
			</View>
		</View>
	);
}


