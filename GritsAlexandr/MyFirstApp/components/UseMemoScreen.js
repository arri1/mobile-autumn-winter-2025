import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './AppStyles';

function heavyComputeFromCount(count) {
	let sum = 0;
	for (let i = 0; i < 300000; i++) {
		sum += (count + i) % 7;
	}
	return sum;
}

export default function UseMemoScreen({ theme, value }) {
	const computed = useMemo(() => heavyComputeFromCount(value), [value]);

	return (
		<View style={[styles.innerContainer]}>
			<Text style={[styles.title, { color: theme.text }]}>useMemo</Text>
			<Text style={[styles.subtitle, { color: theme.text }]}>Счётчик (из useState): {value}</Text>
			<View style={{ height: 16 }} />
			<Text style={[styles.subtitle, { color: theme.text }]}>Результат тяжёлого вычисления: {computed}</Text>
			<Text style={[styles.status, { color: theme.text }]}>Мемоизация пересчитывает значение только при изменении счётчика</Text>
		</View>
	);
}


