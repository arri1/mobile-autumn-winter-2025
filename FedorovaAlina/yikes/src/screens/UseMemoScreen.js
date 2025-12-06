import { useMemo, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function UseMemoScreen({ goBack }) {
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
    <LinearGradient
      colors={['#0A0A0A', '#1A1A2E']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={goBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={28} color="white" />
              <Text style={styles.backButtonText}>Назад</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>useMemo</Text>
              <Text style={styles.headerSubtitle}>Оптимизация вычислений</Text>
            </View>
            <View style={styles.headerPlaceholder} />
          </View>
          
          <Text style={styles.subtitle}>
            Пользователей: {usersCount}
          </Text>

          {/* Блок счетчика */}
          <View style={styles.controlCard}>
            <Text style={styles.counterLabel}>Количество пользователей:</Text>
            
            <View style={styles.counterContainer}>
              <TouchableOpacity 
                style={styles.countButton}
                onPress={() => {
                  if (tempUsersCount > 10) 
                    setTempUsersCount(value => value - 10);
                }}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#FF6B6B', '#FF5252']}
                  style={styles.countButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="remove" size={20} color="white" />
                  <Text style={styles.countButtonText}>10</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.countButton}
                onPress={() => {
                  if (tempUsersCount > 1) 
                    setTempUsersCount(value => value - 1);
                }}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#FF6B6B', '#FF5252']}
                  style={styles.countButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="remove" size={20} color="white" />
                  <Text style={styles.countButtonText}>1</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={styles.counterValueContainer}>
                <Text style={styles.counterValue}>{tempUsersCount}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.countButton}
                onPress={() => {
                  if (tempUsersCount < 200) 
                    setTempUsersCount(value => value + 1);
                }}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#4ECDC4', '#26A69A']}
                  style={styles.countButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="add" size={20} color="white" />
                  <Text style={styles.countButtonText}>1</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.countButton}
                onPress={() => {
                  if (tempUsersCount < 190) 
                    setTempUsersCount(value => value + 10);
                }}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#4ECDC4', '#26A69A']}
                  style={styles.countButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="add" size={20} color="white" />
                  <Text style={styles.countButtonText}>10</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={styles.sortButton}
              onPress={handleSortButton}
              activeOpacity={0.8}
              disabled={sortingLoading}
            >
              <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={styles.sortButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {sortingLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Ionicons name="sync" size={20} color="white" />
                    <Text style={styles.sortButtonText}>Сгенерировать и отсортировать</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Статистика */}
          {userStats && !sortingLoading && (
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Статистика:</Text>
              <View style={styles.statsGrid}>
                <LinearGradient
                  colors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)']}
                  style={styles.statItem}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.statValue}>{userStats.avgAge}</Text>
                  <Text style={styles.statLabel}>Средний возраст</Text>
                </LinearGradient>
                <LinearGradient
                  colors={['rgba(240, 147, 251, 0.1)', 'rgba(245, 87, 108, 0.1)']}
                  style={styles.statItem}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.statValue}>{userStats.maxScore}</Text>
                  <Text style={styles.statLabel}>Макс. score</Text>
                </LinearGradient>
                <LinearGradient
                  colors={['rgba(79, 172, 254, 0.1)', 'rgba(0, 242, 254, 0.1)']}
                  style={styles.statItem}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.statValue}>{userStats.uniqueDomains}</Text>
                  <Text style={styles.statLabel}>Уникальные домены</Text>
                </LinearGradient>
                <LinearGradient
                  colors={['rgba(255, 107, 107, 0.1)', 'rgba(255, 82, 82, 0.1)']}
                  style={styles.statItem}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.statValue}>{userStats.minScore}</Text>
                  <Text style={styles.statLabel}>Мин. score</Text>
                </LinearGradient>
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
                showsVerticalScrollIndicator={false}
              >
                {sortedUsers.map((user, index) => (
                  <LinearGradient
                    key={user.id}
                    colors={index === 0 ? 
                      ['rgba(76, 175, 80, 0.1)', 'rgba(56, 142, 60, 0.1)'] : 
                      index === sortedUsers.length - 1 ? 
                      ['rgba(244, 67, 54, 0.1)', 'rgba(211, 47, 47, 0.1)'] : 
                      ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
                    }
                    style={[
                      styles.userCard,
                      index === 0 && styles.topUserCard,
                      index === sortedUsers.length - 1 && styles.bottomUserCard
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.userHeader}>
                      <Text style={styles.userRank}>#{index + 1}</Text>
                      <Text style={styles.userName}>{user.name}</Text>
                      <Text style={styles.userScore}>{user.score}</Text>
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetail}>Возраст: {user.age}</Text>
                      <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                  </LinearGradient>
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

          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8A8D93',
    marginTop: 2,
  },
  headerPlaceholder: {
    width: 80,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8A8D93',
    marginBottom: 16,
  },
  controlCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  counterLabel: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: 'white',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  countButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  countButtonGradient: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  countButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  counterValueContainer: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.3)',
  },
  counterValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
  },
  sortButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  sortButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  sortButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#8A8D93',
    textAlign: 'center',
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
    color: '#8A8D93',
    marginBottom: 4,
  },
  topBottomValue: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  resultsWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: 'white',
  },
  resultsScrollView: {
    flex: 1,
    maxHeight: 400,
  },
  resultsContent: {
    paddingBottom: 20,
  },
  userCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  topUserCard: {
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  bottomUserCard: {
    borderColor: 'rgba(244, 67, 54, 0.3)',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userRank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8A8D93',
    marginRight: 12,
    width: 40,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
    color: '#8A8D93',
  },
  userEmail: {
    fontSize: 12,
    color: '#8A8D93',
    fontStyle: 'italic',
    maxWidth: '60%',
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 40,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 16,
    color: 'white',
  },
  spacer: {
    height: 40,
  },
});