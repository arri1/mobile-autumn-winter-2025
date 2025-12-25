import { View, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import Post from '../post/post'
import AsyncStorage from '@react-native-async-storage/async-storage';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Case'>;

export default function Case({ navigation }: { navigation: Nav }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.log('Ошибка выхода:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnWrapper}>
        <Button
          title="Счетчик"
          onPress={() => navigation.navigate('Counter')}
        />
      </View>

      <View style={styles.btnWrapper}>
        <Button
          title="Переключатель"
          onPress={() => navigation.navigate('Switcher')}
        />
      </View>

      <View style={styles.btnWrapper}>
        <Button
          title="Сортировщик"
          onPress={() => navigation.navigate('Sorter')}
        />
      </View>
    
      <View style={styles.btnWrapper}>
        <Button title="Посты" onPress={() => navigation.navigate('Post')}/>
      </View>
      <View style={styles.btnWrapper}>
        <Button
          title="Выйти"
          onPress={handleLogout}
          color="red"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  btnWrapper: {
    marginBottom: 12
  }
});