import { View, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Case'>;

export default function Case({ navigation }: { navigation: Nav }) {
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
