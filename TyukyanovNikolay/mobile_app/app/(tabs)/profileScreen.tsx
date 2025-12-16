import {View, Button, Text, StyleSheet} from "react-native"
import { useAuthStore } from "@/store/authStore"

export default function profileScreen() {
    const {user, logout} = useAuthStore();
    return(
        <View style={styles.container}>
            <View style={{}}>
                <Text>Текущий аккаунт</Text>
                <Text>Имя: {user?.name}</Text>
                <Text>Email: {user?.email}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button title="Выйти из аккаунта" onPress={logout}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        verticalAlign: 'middle',
        alignItems: 'center',
        minWidth: 400
    },
    buttonsContainer: {
        alignItems: 'center',
    }
})