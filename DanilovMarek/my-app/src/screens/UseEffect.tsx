import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function UseEffect() {
    const [str, setStr] = useState('');
    const [isNameLoad, setNameLoad] = useState(false);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${Math.floor(Math.random() * 10 + 1)}`)
            .then(response => response.json())
            .then(user => { setStr('Привет, ' + user.name + '!') })
            .catch(error => console.log(error))
            .finally(() => { setNameLoad(false) })
    }, [isNameLoad])

    return (
    <View style={styles.style}>
        <Text>UseEffect</Text>
        <Text>Приветствие:</Text>
        <Text>{str}</Text>
        <Button title="Другое имя" onPress={() => {setNameLoad(true)}} />
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
