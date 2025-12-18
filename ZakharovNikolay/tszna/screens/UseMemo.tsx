import { useState, useMemo, useRef, useEffect } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

const sumCache = new Map<number, number>();
const timeCache = new Map<number, number>();

const calculateSum = (n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < 1000000; j++) {
        }
        sum += i;
    }
    return sum;
};

export default function UseMemoLab() {
    const [number, setNumber] = useState(100);
    const computationTimeRef = useRef<number | null>(null);
    const computedNumbers = useRef<Set<number>>(new Set());
    const previousNumber = useRef<number>(100);
    const lastComputedNumber = useRef<number | null>(null);

    const result = useMemo(() => {
        const wasComputed = computedNumbers.current.has(number);
        const wasInCache = sumCache.has(number);
        
        if (wasComputed || wasInCache) {
            console.log(`Используется кэш useMemo для ${number} - пересчёта нет!`);
            const cachedTime = timeCache.get(number);
            if (cachedTime !== undefined) {
                computationTimeRef.current = cachedTime;
            }
            const cachedResult = sumCache.get(number)!;
            return cachedResult;
        }
        
        const startTime = performance.now();
        console.log(`Вычисление суммы для ${number}...`);
        
        const sumResult = calculateSum(number);
        
        const endTime = performance.now();
        const time = endTime - startTime;
        computationTimeRef.current = time;
        lastComputedNumber.current = number;
        computedNumbers.current.add(number);
        sumCache.set(number, sumResult);
        timeCache.set(number, time);
        
        console.log(`Вычислено за ${time.toFixed(2)} мс`);
        return sumResult;
    }, [number]);

    useEffect(() => {
        if (previousNumber.current !== number) {
            const cachedTime = timeCache.get(number);
            if (cachedTime !== undefined) {
                computationTimeRef.current = cachedTime;
            }
            previousNumber.current = number;
        }
    }, [number]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <View style={{ marginBottom: 40, alignItems: "center" }}>
                <Text style={{ fontSize: 30, marginBottom: 10 }}>Сумма чисел</Text>
                <Text style={{ fontSize: 24, marginBottom: 10 }}>От 1 до {number}</Text>
                <Text style={{ fontSize: 20, marginBottom: 10, color: '#0000ff', fontWeight: 'bold' }}>
                    Сумма = {result.toLocaleString()}
                </Text>
                
                {computationTimeRef.current !== null && (
                    <View style={styles.timeBox}>
                        <Text style={styles.timeText}>
                            Время: {computationTimeRef.current.toFixed(2)} мс
                        </Text>
                    </View>
                )}
            </View>

            <View style={{ marginBottom: 30, alignItems: "center", width: '100%' }}>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Изменение числа:</Text>
                    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                        <Button title="-10" onPress={() => setNumber(Math.max(10, number - 10))} />
                        <Button title="+10" onPress={() => setNumber(number + 10)} />
                    </View>
                    <Button title="Сбросить (100)" onPress={() => setNumber(100)} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    timeBox: {
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        minWidth: 200,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

