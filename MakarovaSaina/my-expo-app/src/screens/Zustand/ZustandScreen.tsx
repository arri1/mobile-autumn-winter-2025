import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert, ScrollView, FlatList } from 'react-native';
import { useUserStore } from '../../store/useUserStore';
import { ZustandStyles } from './ZustandStyle';

export default function ZustandLab({ navigation }: any) {
  const openDrawer = () => navigation.openDrawer();

  return (
    <SafeAreaView style={ZustandStyles.safeArea}>
      <ScrollView style={ZustandStyles.container}>
        <View style={ZustandStyles.content}>
          <Text style={ZustandStyles.title}>Zustand</Text>

          <UserManagementExample />

          <View style={ZustandStyles.navigationButtons}>
            <TouchableOpacity style={ZustandStyles.navButton} onPress={() => navigation.navigate('UseState')}>
              <Text style={ZustandStyles.navButtonText}>← К useState</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={ZustandStyles.navButton} onPress={() => navigation.navigate('UseMemo')}>
              <Text style={ZustandStyles.navButtonText}>→ К useMemo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ZustandStyles.drawerHint} onPress={openDrawer}>
              <Text style={ZustandStyles.drawerHintText}>📖 Открыть меню навигации</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

 

function UserManagementExample() {
  const { users, addUser, removeUser, currentUser, setCurrentUser } = useUserStore(); 
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');

  const handleAddUser = () => {
    if (newUserName.trim() && newUserUsername.trim()) {
      addUser({
        name: newUserName.trim(),
        username: newUserUsername.trim().toLowerCase(),
      });
      setNewUserName('');
      setNewUserUsername('');
      Alert.alert('Успех', 'Пользователь добавлен!');
    }
  };

  const handleRemoveUser = (user: any) => {
    Alert.alert('Удаление пользователя', `Удалить пользователя ${user.name}?`, [
      { text: 'Отмена', style: 'cancel' },
      { 
        text: 'Удалить', 
        style: 'destructive',
        onPress: () => removeUser(user.id)
      }
    ]);
  };

  return (
    <View style={ZustandStyles.exampleContainer}>
      <Text style={ZustandStyles.exampleTitle}>👥 Управление пользователями (локальное)</Text>
      <Text style={ZustandStyles.exampleDescription}>Локальное состояние в Zustand (не связано с API)</Text>

      {currentUser && (
        <View style={ZustandStyles.currentUserContainer}>
          <Text style={ZustandStyles.currentUserTitle}>Текущий пользователь:</Text>
          <Text style={ZustandStyles.currentUserText}>{currentUser.name} (@{currentUser.username})</Text>
        </View>
      )}

      <View style={ZustandStyles.addUserForm}>
        <TextInput
          style={ZustandStyles.userInput}
          placeholder="Имя пользователя"
          placeholderTextColor="#C5C6C7"
          value={newUserName}
          onChangeText={setNewUserName}
        />
        <TextInput
          style={ZustandStyles.userInput}
          placeholder="Логин"
          placeholderTextColor="#C5C6C7"
          value={newUserUsername}
          onChangeText={setNewUserUsername}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={[ZustandStyles.addButton, (!newUserName.trim() || !newUserUsername.trim()) && ZustandStyles.addButtonDisabled]}
          onPress={handleAddUser}
          disabled={!newUserName.trim() || !newUserUsername.trim()}
        >
          <Text style={ZustandStyles.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>

      <Text style={ZustandStyles.usersTitle}>Пользователи ({users.length}):</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={ZustandStyles.userItem}>
            <View style={ZustandStyles.userInfo}>
              <Text style={ZustandStyles.userName}>{item.name}</Text>
              <Text style={ZustandStyles.userUsername}>@{item.username}</Text>
            </View>
            <View style={ZustandStyles.userActions}>
              <TouchableOpacity 
                style={[ZustandStyles.userActionButton, ZustandStyles.selectButton]}
                onPress={() => setCurrentUser(item)}
              >
                <Text style={ZustandStyles.userActionText}>Выбрать</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[ZustandStyles.userActionButton, ZustandStyles.deleteButton]}
                onPress={() => handleRemoveUser(item)}
              >
                <Text style={ZustandStyles.userActionText}>Удалить</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={ZustandStyles.emptyText}>Нет пользователей</Text>}
      />
    </View>
  );
}