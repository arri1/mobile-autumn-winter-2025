import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { styles } from './AppStyles';

export default function UseEffectScreen({ theme }) {
	const [seconds, setSeconds] = useState(0);
	const [loading, setLoading] = useState(true);
	const [weather, setWeather] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const timerId = setInterval(() => setSeconds(prev => prev + 1), 1000);
		return () => clearInterval(timerId);
	}, []);

	useEffect(() => {
		let isActive = true;
		const load = async () => {
			try {
				setLoading(true);
				setError(null);
				const latitude = 62.0397;
				const longitude = 129.7422;
				const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}
				const json = await response.json();
				if (isActive) {
					setWeather(json?.current || null);
				}
			} catch (e) {
				if (isActive) {
					setError(String(e?.message || e));
				}
			} finally {
				if (isActive) {
					setLoading(false);
				}
			}
		};
		load();
		return () => {
			isActive = false;
		};
	}, []);

	return (
		<View style={[styles.innerContainer]}>
			<Text style={[styles.title, { color: theme.text }]}>useEffect</Text>
			<Text style={[styles.subtitle, { color: theme.text }]}>Секунд с открытия экрана: {seconds}</Text>
			{loading ? (
				<ActivityIndicator size="small" color={theme.button} />
			) : error ? (
				<Text style={[styles.status, { color: theme.text }]}>Ошибка загрузки: {error}</Text>
			) : weather ? (
				<View style={{ alignItems: 'center' }}>
					<Text style={[styles.subtitle, { color: theme.text }]}>Погода в Якутске сейчас:</Text>
					<Text style={[styles.status, { color: theme.text }]}>Температура: {weather.temperature_2m}°C</Text>
					<Text style={[styles.status, { color: theme.text }]}>Состояние: {codeToDescription(weather.weather_code)}</Text>
				</View>
			) : (
				<Text style={[styles.status, { color: theme.text }]}>Нет данных</Text>
			)}
			<View style={{ height: 12 }} />
			<View style={styles.buttonContainer}>
				<Button title="Сбросить таймер" onPress={() => setSeconds(0)} color={theme.button} />
			</View>
		</View>
	);
}

function codeToDescription(code) {
	switch (code) {
		case 0:
			return 'Ясно';
		case 1:
		case 2:
		case 3:
			return 'Преимущественно ясно/переменная облачность/пасмурно';
		case 45:
		case 48:
			return 'Туман';
		case 51:
		case 53:
		case 55:
			return 'Морось';
		case 61:
		case 63:
		case 65:
			return 'Дождь';
		case 71:
		case 73:
		case 75:
			return 'Снег';
		case 80:
		case 81:
		case 82:
			return 'Ливни';
		case 95:
			return 'Гроза';
		case 96:
		case 99:
			return 'Гроза с градом';
		default:
			return `Код ${code}`;
	}
}


