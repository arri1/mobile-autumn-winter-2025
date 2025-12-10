import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const IMAGES = [
  {
    id: '1',
    source: require('../../images/food1.jpg'),
    type: 'food'
  },
    {
    id: '2',
    source: require('../../images/food2.jpg'),
    type: 'food'
  },
    {
    id: '3',
    source: require('../../images/food3.jpg'),
    type: 'food'
  },
  {
    id: '4',
    source: require('../../images/food4.jpg'),
    type: 'food'
  },
  {
    id: '5',
    source: require('../../images/building (1).jpg'),
    type: 'building'
  },
  {
    id: '6',
    source: require('../../images/building (2).jpg'),
    type: 'building'
  },
  {
    id: '7',
    source: require('../../images/building (3).jpg'),
    type: 'building'
  },
  {
    id: '8',
    source: require('../../images/beach (1).jpg'),
    type: 'beach'
  },
  {
    id: '9',
    source: require('../../images/beach (2).jpg'),
    type: 'beach'
  },
  {
    id: '10',
    source: require('../../images/beach (3).jpg'),
    type: 'beach'
  },
];

const FILTERS = [
  { key: 'all', label: 'Все' },
  { key: 'food', label: 'Еда' },
  { key: 'building', label: 'Здание' },
  { key: 'beach', label: 'Пляж' },
];

export default function UseMemoScreen() {
  const [activeType, setActiveType] = useState('all');

  const filtered = useMemo(() => {
    if (activeType === 'all') return IMAGES;
    return IMAGES.filter((item) => item.type === activeType);
  }, [activeType]);

  const renderItem = ({ item }) => (
    <View style={styles.Card}>
      <Image
        source={item.source}
        style={styles.Image}
        resizeMode="cover"
      />
      <Text style={styles.galleryCaption}>{item.label}</Text>
    </View>
  );

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    FILTERS.map((f) => ({ label: f.label, value: f.key }))
  );

  return (
    <View style={styles.Container}>
      <View style={styles.PickerWrap}>
        <Text style={styles.PickerLabel}>Тип:</Text>
        <DropDownPicker
          open={open}
          value={activeType}
          items={items}
          setOpen={setOpen}
          setValue={setActiveType}
          setItems={setItems}
          containerStyle={{ flex: 1 }}
          zIndex={1000}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.galleryRow}
        contentContainerStyle={styles.List}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    PickerWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ddd',
    },
    PickerLabel: {
      color: '#555',
      fontSize: 14,
    },
    List: {
      padding: 12,
    },
    galleryRow: {
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    Card: {
      width: '48%',
      backgroundColor: '#fafafa',
      borderRadius: 10,
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#e5e5e5',
    },
    Image: {
      width: '100%',
      height: 120,
      backgroundColor: '#eee',
    },
});

