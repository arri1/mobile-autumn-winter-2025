
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';


const asyncStorage = {
  getItem: async (name) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.warn('Error getting item from storage:', error);
      return null;
    }
  },
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.warn('Error setting item to storage:', error);
    }
  },
  removeItem: async (name) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.warn('Error removing item from storage:', error);
    }
  },
};

export const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (text) => {
        const newTodo = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toLocaleString('ru-RU'),
        };
        
        set((state) => ({
          todos: [newTodo, ...state.todos]
        }));
      },
      
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        }));
      },
      
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }));
      },
      
      editTodo: (id, newText) => {
        set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, text: newText.trim() } : todo
          )
        }));
      },
      
      clearAllTodos: () => {
        set({ todos: [] });
      },
      
      getTodosCount: () => {
        const todos = get().todos;
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        return { total, completed };
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => asyncStorage),
    }
  )
);