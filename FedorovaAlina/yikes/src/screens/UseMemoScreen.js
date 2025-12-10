import { useMemo, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { UseMemoStyles } from '../styles/UseMemoStyles';

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
      colors={['#0D1B2A', '#1B263B', '#2C3E50']}
      style={UseMemoStyles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={UseMemoStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={UseMemoStyles.header}>
            <TouchableOpacity 
              style={UseMemoStyles.backButton} 
              onPress={goBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <Text style={UseMemoStyles.backButtonText}>Назад</Text>
            </TouchableOpacity>
            <View style={UseMemoStyles.headerCenter}>
              <View style={UseMemoStyles.titleBadge}>
                <Text style={UseMemoStyles.titleBadgeText}>⚡ useMemo</Text>
              </View>
              <Text style={UseMemoStyles.headerSubtitle}>Оптимизация вычислений</Text>
            </View>
            <View style={UseMemoStyles.headerPlaceholder} />
          </View>

          {/* Декоративные снежинки */}
          <View style={UseMemoStyles.snowflakeContainer}>
            <Text style={UseMemoStyles.snowflake}>❄️</Text>
            <Text style={[UseMemoStyles.snowflake, UseMemoStyles.snowflake2]}>❄️</Text>
            <Text style={[UseMemoStyles.snowflake, UseMemoStyles.snowflake3]}>❄️</Text>
          </View>

          

          {/* Блок счетчика */}
          <View style={UseMemoStyles.controlCard}>
            <LinearGradient
              colors={['#0b490fff','#35aa3dff', '#2E8B57']}
              style={UseMemoStyles.controlCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={UseMemoStyles.cardHeader}>
                <View style={UseMemoStyles.cardIcon}>
                  <Ionicons name="people" size={28} color="white" />
                </View>
                <View style={UseMemoStyles.cardTitleContainer}>
                  <Text style={UseMemoStyles.cardTitle}>Список гостей</Text>
                  <Text style={UseMemoStyles.cardDescription}>Управление количеством и сортировкой</Text>
                </View>
              </View>
              
              <View style={UseMemoStyles.counterSection}>
                <Text style={UseMemoStyles.counterLabel}>Количество гостей на празднике:</Text>
                
                <View style={UseMemoStyles.counterContainer}>
                  <TouchableOpacity 
                    style={UseMemoStyles.countButton}
                    onPress={() => {
                      if (tempUsersCount > 10) 
                        setTempUsersCount(value => value - 10);
                    }}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={['#FF6B6B', '#FF5252']}
                      style={UseMemoStyles.countButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name="remove" size={22} color="white" />
                      <Text style={UseMemoStyles.countButtonText}>-10</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={UseMemoStyles.countButton}
                    onPress={() => {
                      if (tempUsersCount > 1) 
                        setTempUsersCount(value => value - 1);
                    }}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={['#FF6B6B', '#FF5252']}
                      style={UseMemoStyles.countButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name="remove" size={22} color="white" />
                      <Text style={UseMemoStyles.countButtonText}>-1</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <View style={UseMemoStyles.counterValueContainer}>
                    <Text style={UseMemoStyles.counterValue}>{tempUsersCount}</Text>
                    <Text style={UseMemoStyles.counterValueLabel}>гостей</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={UseMemoStyles.countButton}
                    onPress={() => {
                      if (tempUsersCount < 200) 
                        setTempUsersCount(value => value + 1);
                    }}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={['#2196F3', '#1976D2']}
                      style={UseMemoStyles.countButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name="add" size={22} color="white" />
                      <Text style={UseMemoStyles.countButtonText}>+1</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={UseMemoStyles.countButton}
                    onPress={() => {
                      if (tempUsersCount < 190) 
                        setTempUsersCount(value => value + 10);
                    }}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={['#2196F3', '#1976D2']}
                      style={UseMemoStyles.countButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name="add" size={22} color="white" />
                      <Text style={UseMemoStyles.countButtonText}>+10</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity
                  style={UseMemoStyles.sortButton}
                  onPress={handleSortButton}
                  activeOpacity={0.8}
                  disabled={sortingLoading}
                >
                  <LinearGradient
                    colors={['#FFD700', '#FFC107']}
                    style={UseMemoStyles.sortButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {sortingLoading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <>
                        <Ionicons name="star" size={22} color="white" />
                        <Text style={UseMemoStyles.sortButtonText}>Составить рейтинг гостей</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Статистика */}
          {userStats && !sortingLoading && (
            <View style={UseMemoStyles.statsCard}>
              <LinearGradient
                colors={['#2166ceff', '#0d335eff', '#1E3A8A']}
                style={UseMemoStyles.statsCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={UseMemoStyles.cardHeader}>
                  <View style={UseMemoStyles.cardIcon}>
                    <Ionicons name="stats-chart" size={28} color="white" />
                  </View>
                  <View style={UseMemoStyles.cardTitleContainer}>
                    <Text style={UseMemoStyles.cardTitle}>Статистика праздника</Text>
                    <Text style={UseMemoStyles.cardDescription}>Результаты оптимизированы useMemo</Text>
                  </View>
                </View>
                
                <View style={UseMemoStyles.statsGrid}>
                  <View style={UseMemoStyles.statItem}>
                    <Text style={UseMemoStyles.statValue}>{userStats.avgAge}</Text>
                    <Text style={UseMemoStyles.statLabel}>Средний возраст</Text>
                    <Text style={UseMemoStyles.statEmoji}>🎂</Text>
                  </View>
                  <View style={UseMemoStyles.statItem}>
                    <Text style={UseMemoStyles.statValue}>{userStats.maxScore}</Text>
                    <Text style={UseMemoStyles.statLabel}>Макс. рейтинг</Text>
                    <Text style={UseMemoStyles.statEmoji}>🏆</Text>
                  </View>
                  <View style={UseMemoStyles.statItem}>
                    <Text style={UseMemoStyles.statValue}>{userStats.uniqueDomains}</Text>
                    <Text style={UseMemoStyles.statLabel}>Уникальные письма</Text>
                    <Text style={UseMemoStyles.statEmoji}>✉️</Text>
                  </View>
                  <View style={UseMemoStyles.statItem}>
                    <Text style={UseMemoStyles.statValue}>{userStats.minScore}</Text>
                    <Text style={UseMemoStyles.statLabel}>Мин. рейтинг</Text>
                    <Text style={UseMemoStyles.statEmoji}>📉</Text>
                  </View>
                </View>
                
                <View style={UseMemoStyles.topBottomContainer}>
                  <View style={UseMemoStyles.topBottomItem}>
                    <Text style={UseMemoStyles.topBottomLabel}>🎅 Лучший гость:</Text>
                    <Text style={UseMemoStyles.topBottomValue}>{userStats.topUser}</Text>
                  </View>
                  <View style={UseMemoStyles.topBottomItem}>
                    <Text style={UseMemoStyles.topBottomLabel}>⛄ Худший гость:</Text>
                    <Text style={UseMemoStyles.topBottomValue}>{userStats.bottomUser}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Результаты сортировки */}
          {!sortingLoading ? (
            <View style={UseMemoStyles.resultsCard}>
              <LinearGradient
                colors={['#0b490fff','#35aa3dff', '#2E8B57']}
                style={UseMemoStyles.resultsCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={UseMemoStyles.cardHeader}>
                  <View style={UseMemoStyles.cardIcon}>
                    <Ionicons name="list" size={28} color="white" />
                  </View>
                  <View style={UseMemoStyles.cardTitleContainer}>
                    <Text style={UseMemoStyles.cardTitle}>Рейтинг гостей по активности</Text>
                    <Text style={UseMemoStyles.cardDescription}>Тяжёлые вычисления кэшируются useMemo</Text>
                  </View>
                </View>
                
                <ScrollView 
                  style={UseMemoStyles.resultsScrollView}
                  contentContainerStyle={UseMemoStyles.resultsContent}
                  showsVerticalScrollIndicator={false}
                >
                  {sortedUsers.map((user, index) => (
                    <LinearGradient
                      key={user.id}
                      colors={index === 0 ? 
                        ['rgba(255, 215, 0, 0.15)', 'rgba(255, 193, 7, 0.15)'] : 
                        index === sortedUsers.length - 1 ? 
                        ['rgba(244, 67, 54, 0.15)', 'rgba(211, 47, 47, 0.15)'] : 
                        ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
                      }
                      style={[
                        UseMemoStyles.userCard,
                        index === 0 && UseMemoStyles.topUserCard,
                        index === sortedUsers.length - 1 && UseMemoStyles.bottomUserCard
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={UseMemoStyles.userHeader}>
                        <View style={UseMemoStyles.userRankContainer}>
                          <Text style={UseMemoStyles.userRank}>#{index + 1}</Text>
                          <Text style={UseMemoStyles.userMedal}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎁'}
                          </Text>
                        </View>
                        <View style={UseMemoStyles.userInfo}>
                          <Text style={UseMemoStyles.userName}>{user.name}</Text>
                          <Text style={UseMemoStyles.userDetail}>Возраст: {user.age}</Text>
                        </View>
                        <Text style={UseMemoStyles.userScore}>{user.score}</Text>
                      </View>
                      <Text style={UseMemoStyles.userEmail}>{user.email}</Text>
                    </LinearGradient>
                  ))}
                </ScrollView>
                
                <View style={UseMemoStyles.legendContainer}>
                  <View style={UseMemoStyles.legendItem}>
                    <View style={[UseMemoStyles.legendColor, UseMemoStyles.legendGold]} />
                    <Text style={UseMemoStyles.legendText}>Победитель</Text>
                  </View>
                  <View style={UseMemoStyles.legendItem}>
                    <View style={[UseMemoStyles.legendColor, UseMemoStyles.legendRed]} />
                    <Text style={UseMemoStyles.legendText}>Аутсайдер</Text>
                  </View>
                  <View style={UseMemoStyles.legendItem}>
                    <Text style={UseMemoStyles.legendEmoji}>⚡</Text>
                    <Text style={UseMemoStyles.legendText}>useMemo оптимизация</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          ) : (
            <View style={UseMemoStyles.loadingCard}>
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={UseMemoStyles.loadingCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={UseMemoStyles.loadingText}>
                  🎄 Санта составляет список из {tempUsersCount} гостей...
                </Text>
                <Text style={UseMemoStyles.loadingSubtext}>
                  useMemo запомнит результат, чтобы не считать заново!
                </Text>
              </LinearGradient>
            </View>
          )}

          

         
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}