//
import { useMemo, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  ScrollView,
  ActivityIndicator,
  TouchableOpacity  // Добавлено
} from "react-native";

export default function UseMemoScreen({ goBack }) {  // Добавлен параметр goBack
  const [sortingLoading, setSortingLoading] = useState(false);
  const [usersCount, setUsersCount] = useState(50);
  const [tempUsersCount, setTempUsersCount] = useState(usersCount);

  // Генерация "пользователей"
  const generateUsers = (count) => {
    const names = [
      "Алексей", "Мария", "Иван", "Ольга", "Дмитрий", "Анна", "Сергей", "Елена",
      "Андрей", "Наталья", "Павел", "Татьяна", "Михаил", "Юлия", "Владимир",
      "Ксения", "Артем", "Екатерина", "Николай", "Светлана", "Роман", "Виктория"
    ];
    
    const surnames = [
      "Иванов", "Петров", "Сидоров", "Смирнов", "Кузнецов", "Попов", "Васильев",
      "Соколов", "Михайлов", "Новиков", "Федоров", "Морозов", "Волков", "Алексеев",
      "Лебедев", "Семенов", "Егоров", "Павлов", "Козлов", "Степанов", "Никитин"
    ];
    
    const domains = ["mail.ru", "gmail.com", "yandex.ru", "outlook.com", "hotmail.com"];
    
    const users = [];
    for (let i = 0; i < count; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const surname = surnames[Math.floor(Math.random() * surnames.length)];
      const age = 18 + Math.floor(Math.random() * 50);
      const email = `${name.toLowerCase()}.${surname.toLowerCase()}@${
        domains[Math.floor(Math.random() * domains.length)]
      }`;
      
      users.push({
        id: i,
        name: `${name} ${surname}`,
        age,
        email,
        score: Math.floor(Math.random() * 1000)
      });
    }
    return users;
  };

  // Медленная сортировка
  const slowSort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    slowSort(arr, left, mid);
    slowSort(arr, mid + 1, right);
    if (arr[mid].score > arr[right].score) {
      [arr[mid], arr[right]] = [arr[right], arr[mid]];
    }
    slowSort(arr, left, right - 1);
  };

  // Функция сортировки пользователей
  const sortUsers = (usersArray) => {
    const arr = usersArray.slice(0);
    slowSort(arr);
    return arr;
  };

  // useMemo для сортированных пользователей
  const sortedUsers = useMemo(() => {
    console.log("Пересчет sortedUsers");
    const users = generateUsers(usersCount);
    return sortUsers(users);
  }, [usersCount]);

  // useMemo для статистики
  const userStats = useMemo(() => {
    console.log("Пересчет статистики");
    if (sortedUsers.length === 0) return null;
    
    const totalAge = sortedUsers.reduce((sum, user) => sum + user.age, 0);
    const avgAge = totalAge / sortedUsers.length;
    
    const maxScore = Math.max(...sortedUsers.map(u => u.score));
    const minScore = Math.min(...sortedUsers.map(u => u.score));
    
    const emails = sortedUsers.map(u => u.email);
    const uniqueDomains = [...new Set(emails.map(email => email.split('@')[1]))];
    
    return {
      avgAge: avgAge.toFixed(1),
      maxScore,
      minScore,
      uniqueDomains: uniqueDomains.length,
      topUser: sortedUsers[0]?.name || "Нет данных",
      bottomUser: sortedUsers[sortedUsers.length - 1]?.name || "Нет данных"
    };
  }, [sortedUsers]);

  // Обработчик кнопки
  const handleSortButton = async () => {
    setUsersCount(tempUsersCount);
    setSortingLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 0));
    setTimeout(() => {
      setSortingLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Добавлена кнопка возврата в заголовке */}
      <View style={styles.header}>
        <Text style={styles.title}>useMemo Демонстрация</Text>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← На главную</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subtitle}>
        Пользователей: {usersCount}
      </Text>

      {/* Блок счетчика */}
      <View style={styles.controlCard}>
        <Text style={styles.counterLabel}>Количество пользователей:</Text>
        
        <View style={styles.counterContainer}>
          <Button 
            title="-10" 
            onPress={() => {
              if (tempUsersCount > 10) 
                setTempUsersCount(value => value - 10);
            }}
            color="#FF6B6B"
          />
          
          <Button 
            title="-1" 
            onPress={() => {
              if (tempUsersCount > 1) 
                setTempUsersCount(value => value - 1);
            }}
            color="#FF6B6B"
          />
          
          <Text style={styles.counterValue}>{tempUsersCount}</Text>
          
          <Button 
            title="+1" 
            onPress={() => {
              if (tempUsersCount < 200) 
                setTempUsersCount(value => value + 1);
            }}
            color="#4ECDC4"
          />
          
          <Button 
            title="+10" 
            onPress={() => {
              if (tempUsersCount < 190) 
                setTempUsersCount(value => value + 10);
            }}
            color="#4ECDC4"
          />
        </View>
        
        <Button 
          title="Сгенерировать и отсортировать" 
          onPress={handleSortButton}
          color="#2196F3"
        />
      </View>

      {/* Статистика */}
      {userStats && !sortingLoading && (
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Статистика:</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.avgAge}</Text>
              <Text style={styles.statLabel}>Средний возраст</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.maxScore}</Text>
              <Text style={styles.statLabel}>Макс. score</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.uniqueDomains}</Text>
              <Text style={styles.statLabel}>Уникальные домены</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.minScore}</Text>
              <Text style={styles.statLabel}>Мин. score</Text>
            </View>
          </View>
          <View style={styles.topBottomContainer}>
            <View style={styles.topBottomItem}>
              <Text style={styles.topBottomLabel}>Лучший:</Text>
              <Text style={styles.topBottomValue}>{userStats.topUser}</Text>
            </View>
            <View style={styles.topBottomItem}>
              <Text style={styles.topBottomLabel}>Худший:</Text>
              <Text style={styles.topBottomValue}>{userStats.bottomUser}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Результаты сортировки - БОЛЬШОЕ ОКНО */}
      {!sortingLoading ? (
        <View style={styles.resultsWrapper}>
          <Text style={styles.resultsTitle}>
            Отсортированные пользователи (по score):
          </Text>
          <ScrollView 
            style={styles.resultsScrollView}
            contentContainerStyle={styles.resultsContent}
          >
            {sortedUsers.map((user, index) => (
              <View key={user.id} style={[
                styles.userCard,
                index === 0 && styles.topUserCard,
                index === sortedUsers.length - 1 && styles.bottomUserCard
              ]}>
                <View style={styles.userHeader}>
                  <Text style={styles.userRank}>#{index + 1}</Text>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userScore}>{user.score}</Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetail}>Возраст: {user.age}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>
            Сортировка {tempUsersCount} пользователей...
          </Text>
        </View>
      )}

      {/* Добавлена кнопка возврата внизу */}
      <TouchableOpacity style={styles.bottomBackButton} onPress={goBack}>
        <Text style={styles.bottomBackButtonText}>← Вернуться на главную</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  backButton: {
    backgroundColor: '#34495e',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  controlCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counterLabel: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  counterValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#2196F3',
    minWidth: 60,
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  topBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  topBottomItem: {
    flex: 1,
    paddingHorizontal: 8,
  },
  topBottomLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  topBottomValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  resultsWrapper: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  resultsScrollView: {
    flex: 1,
  },
  resultsContent: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  topUserCard: {
    backgroundColor: '#e8f5e9',
    borderLeftColor: '#4CAF50',
  },
  bottomUserCard: {
    backgroundColor: '#ffebee',
    borderLeftColor: '#F44336',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  userRank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 8,
    width: 30,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  userScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    width: 60,
    textAlign: 'right',
  },
  userDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetail: {
    fontSize: 14,
    color: '#666',
  },
  userEmail: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    maxWidth: '60%',
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 40,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 16,
    color: '#333',
  },
  bottomBackButton: {
    backgroundColor: '#34495e',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  bottomBackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
