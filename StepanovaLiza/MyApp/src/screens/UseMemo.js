import React, { useState, useMemo } from 'react';
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
    <>
      <TodosContainer>
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
      </TodosContainer>
    </>
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
    <SafeArea>
      <Container>
        <Header>
          <Title>useMemo</Title>
          <SubTitle>Оптимизация производительности</SubTitle>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Фильтрация задач</CardTitle>
          </CardHeader>
          <Divider />
          <TabsContainer>
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
          </TabsContainer>
          <Divider />
          <TodoList
            todos={todos}
            tab={tab}
          />
        </Card>

        <BottomSpacer />
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled.View`
  flex: 1;
  background-color: #0f2042ff;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 24px;
  padding-top: 60px;
`;

const Header = styled.View`
  margin-bottom: 16px;
  align-items: center;
  text-align: center;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #e6e9ef;
  margin-bottom: 6px;
`;

const SubTitle = styled.Text`
  color: #9aa4b2;
`;

const Card = styled.View`
  background-color: #0c0f14;
  border: 1px solid #1c2230;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.Text`
  color: #e6e9ef;
  font-weight: 700;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #1c2230;
  margin: 12px 0;
`;

const TabsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  background-color: ${props => props.active ? '#4b87a2ff' : '#0f1218'};
  border: 1px solid ${props => props.active ? '#4b87a2ff' : '#1c2230'};
  border-radius: 12px;
  align-items: center;
`;

const TabButtonText = styled.Text`
  color: ${props => props.active ? '#052925' : '#9aa4b2'};
  font-weight: ${props => props.active ? '700' : 'normal'};
`;

const TodosContainer = styled.View`
  max-height: none;
`;

const TodoItem = styled.View`
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #1c2230;
`;

const TodoText = styled.Text`
  font-size: 16px;
  color: #e6e9ef;
`;

const CompletedTodoText = styled.Text`
  font-size: 16px;
  color: #9aa4b2;
  text-decoration-line: line-through;
`;

const NoteText = styled.Text`
  font-style: italic;
  color: #9aa4b2;
  margin-bottom: 15px;
`;

const Helper = styled.Text`
  color: ${(p) => p.color || '#9aa4b2'};
  ${(p) => (p.ml12 ? 'margin-left: 12px;' : '')};
  ${(p) => (p.bold ? 'font-weight: 700;' : '')};
`;

const BottomSpacer = styled.View`
  height: 24px;
`;