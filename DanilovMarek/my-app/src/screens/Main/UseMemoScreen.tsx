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
        <View>
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
            <Button title="Пересортировать" onPress={ HandlerButton } />
            {
            !sortingLoading ?
                <ScrollView>
                    <Text style={styles.numbersListName}>Отсортированные числа:</Text>
                    <Text style={styles.numbersList}>
                        {sortedNumbers.map(number => (
                            number + "  "
                        ))}
                    </Text>
                </ScrollView>
            : <Text style={styles.numbersListPlaceHolder}>Конец сортировки</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    numbersCounterName: {
        alignSelf: 'center',
        fontSize: 20
    },
    numbersCounter: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        padding: 5,
        gap: 10,
    },
    numbersCounterText: {
        fontSize: 30,
        marginHorizontal: 15
    },
    numbersList: {
        flexDirection: 'column',
        gap: 50,
        margin: 10,
        paddingBottom: 160,
        fontSize: 25
    },
    numbersListPlaceHolder: {
        fontSize: 50,
        marginTop: 250,
        marginLeft: 90,
        justifyContent: 'center'
    },
    numbersListName: {
        alignSelf: 'center',
        fontSize: 30
    }
});