import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Product() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Товар #{id}</Text>
    </View>
  );
}
