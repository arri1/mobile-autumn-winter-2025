import React, { useMemo, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";

export default function SortedList() {
  const [reverse, setReverse] = useState(false);

  const data = ["Banana", "Orange", "Apple", "Kiwi", "Grape"];

  const sortedData = useMemo(() => {
    const arr = [...data].sort();
    return reverse ? arr.reverse() : arr;
  }, [reverse]);

  return (
    <View style={{ padding: 20 }}>
      <Button
        title={reverse ? "Сортировать по возрастанию" : "Сортировать по убыванию"}
        onPress={() => setReverse(prev => !prev)}
      />

      <FlatList
        data={sortedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 20, marginTop: 10 }}>{item}</Text>
        )}
      />
    </View>
  );
}
