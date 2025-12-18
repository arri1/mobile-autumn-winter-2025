import { useMemo, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native"
import Timer from "../../components/Timer";


export default function UseMemoScreen() {
    const [sortingLoading, setSortingLoading] = useState(false);
    const [numbersCount, setNumbersCount] = useState(50);
    const [numbersCounterValue, setNumbersCounterValue] = useState(numbersCount);

    const ramdomNumbers = (count: number) => {
        const tempNumbers = [];
        for (let i = 0; i < count; i++)
            tempNumbers.push(Math.floor(Math.random() * 2 * numbersCount  - numbersCount));
        return tempNumbers;
    }

    const slowSort = (arr: number[], left = 0, right = arr.length - 1) => {
        if (left >= right) 
            return;
        const mid = Math.floor((left + right) / 2);
        slowSort(arr, left, mid);
        slowSort(arr, mid + 1, right);
        if (arr[mid] > arr[right]) {
            [arr[mid], arr[right]] = [arr[right], arr[mid]];
        }
        slowSort(arr, left, right - 1);
    }

    const sortNumbers = (number: number[]) => {
        const arr = number.slice(0);
        slowSort(arr);
        return arr;
    }

    const sortedNumbers = useMemo(() => sortNumbers(ramdomNumbers(numbersCount)), [numbersCount]);

    const HandlerButton = async () => {
        setNumbersCount(numbersCounterValue);
        setSortingLoading(true);
        await new Promise(resolve => setTimeout(resolve, 0));
        setTimeout(() => { setSortingLoading(false) }, 1000);
        
    }
    
    return (
        <View style={styles.container}>
            <Timer />
            <Text style={styles.numbersCounterName}>Количество чисел:</Text>
            <View style={styles.numbersCounter}>
                <Button title="-10" onPress={() => {
                    if (numbersCounterValue > 10)
                        setNumbersCounterValue((value) => value - 10)
                }}/>
                <Button title="-1" onPress={() => {
                    if (numbersCounterValue > 1)
                        setNumbersCounterValue((value) => --value)
                }}/>
                <Text style={styles.numbersCounterText}>{numbersCounterValue}</Text>
                <Button title="+1" onPress={() => {
                    if (numbersCounterValue < 100)
                        setNumbersCounterValue((value) => ++value)
                }}/>
                <Button title="+10" onPress={() => {
                    if (numbersCounterValue < 141)
                        setNumbersCounterValue((value) => value + 10)
                }}/>
            </View>
            <View style={styles.buttonWrapper}>
                <Button title="Пересортировать" onPress={ HandlerButton } />
            </View>
            {
            !sortingLoading ?
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.numbersListName}>Отсортированные числа:</Text>
                     <View style={styles.numbersGrid}>
                        {sortedNumbers.map((number, index) => (
                            <View key={index} style={styles.numberCard}>
                                <Text style={styles.numberText}>{number}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            : <View style={styles.placeholderContainer}>
                <Text style={styles.numbersListPlaceHolder}>Конец сортировки</Text>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 15,
    },
    numbersCounterName: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    numbersCounter: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        marginBottom: 15,
        gap: 10
    },
    numbersCounterText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginHorizontal: 20,
        minWidth: 40,
        textAlign: 'center',
    },
    buttonWrapper: {
        marginBottom: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    numbersListName: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 15,
        paddingTop: 10,
    },
    numbersGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 30,
    },
    numberCard: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        margin: 4,
        minWidth: 60,
        alignItems: 'center',
    },
    numberText: {
        fontSize: 20,
        fontWeight: '500',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    numbersListPlaceHolder: {
        fontSize: 32,
        fontWeight: '600',
        color: '#888',
        textAlign: 'center',
    }
});