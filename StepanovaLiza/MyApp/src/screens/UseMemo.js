import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';

function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

function filterTodos(todos, tab) {
  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}


function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );

  return (
    <Container>
      <NoteText>
        <Text style={{fontWeight: 'bold'}}>Note:</Text> filterTodos is artificially slowed down!
      </NoteText>
      <ScrollView>
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id}>
            {todo.completed ? (
              <CompletedTodoText>
                {todo.text}
              </CompletedTodoText>
            ) : (
              <TodoText>
                {todo.text}
              </TodoText>
            )}
          </TodoItem>
        ))}
      </ScrollView>
    </Container>
  );
}

// Main App Component
const todos = createTodos();

export default function UseMemoExample() {
  const [tab, setTab] = useState('all');

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <Container>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {tabs.map(tabItem => (
          <TabButton
            key={tabItem.key}
            active={tab === tabItem.key}
            onPress={() => setTab(tabItem.key)}
          >
            <TabButtonText active={tab === tabItem.key}>
              {tabItem.label}
            </TabButtonText>
          </TabButton>
        ))}
      </View>
      <Divider />
      <TodoList
        todos={todos}
        tab={tab}
      />
    </Container>
  );
}


const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: '#ffffff';
`;

const TabButton = styled.TouchableOpacity`
  padding: 10px 15px;
  margin: 5px;
  background-color: ${props => props.active ? '#007AFF' : '#f0f0f0'};
  border-radius: 8px;
`;

const TabButtonText = styled.Text`
  color: ${props => props.active ? '#ffffff' : '#333333'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const TodoItem = styled.View`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const TodoText = styled.Text`
  font-size: 16px;
  color: '#333333';
`;

const CompletedTodoText = styled.Text`
  font-size: 16px;
  color:'#888888';
  text-decoration-line: line-through;
`;

const NoteText = styled.Text`
  font-style: italic;
  color:'#666666';
  margin-bottom: 15px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin: 15px 0;
`;