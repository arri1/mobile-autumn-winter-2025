import React, { useMemo, useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

export default function useMemoLab(){
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {

      } 
    };
    fetchPosts();
  }, []);

  const sortedUsers = useMemo(() => {
    console.log('Выполняется фильтрация и сортировка...');
    
    let filtered = users;

    // Сортировка
    return [...filtered].sort((a, b) => {
      if (sortBy === 'id'){
        return a.id - b.id;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'length') {
        return a.name.length - b.name.length;
      }
      return 0;
    });
  }, [users, sortBy]); // Зависимости

  return(
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>UseMemo</Text>
        <View style ={styles.blockButtons}>
          <Text style={{fontSize:20}}>Сортировать по </Text>
          <Button title='ID' onPress={() => setSortBy('id')}></Button>
          <Button title='имени' onPress={() => setSortBy('name')}></Button>
          <Button title='длине имени' onPress={() => setSortBy('length')}></Button>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={sortedUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.block}>
            <Text style={{ fontWeight:'bold'}}>{item.id} </Text>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    blockButtons: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    list: {
        marginBlock: 10
    },
    block: {
        flexDirection: 'row',
        marginHorizontal: 20, 
        marginBottom: 10, 
        borderRadius: 10, 
        padding: 16, 
        backgroundColor: '#dddddd'
    }
})