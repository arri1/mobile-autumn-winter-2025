import {View, Button, Text, ScrollView, StyleSheet} from "react-native"
import { useAuthStore } from "@/store/authStore"

export default function profileScreen() {
    const {currentUser, logout} = useAuthStore();
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Текущий аккаунт</Text>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Имя: {currentUser?.name}</Text>
                <Text style={styles.text}>Email: {currentUser?.email}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button title="Выйти из аккаунта" onPress={logout}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        padding: 100,
        alignItems: 'center'
    },
    textContainer:{
        gap: 10,
        justifyContent: 'center',
        minWidth: 150
    },
    buttonsContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
    },
    text: {
        fontSize: 16,
    }
})