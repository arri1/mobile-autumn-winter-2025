import { useMemo, useState } from "react";
import { 
  View, 
  Text, 
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { UseMemoStyles } from '../styles/UseMemoStyles';
import { AppStyles } from '../styles/AppStyles';

const { width, height } = Dimensions.get('window');

export default function UseMemoScreen({ goBack, setActiveScreen, activeScreen }) {
  const [sortingLoading, setSortingLoading] = useState(false);
  const [usersCount, setUsersCount] = useState(50);
  const [tempUsersCount, setTempUsersCount] = useState(usersCount);

  // Генерация "пользователей"
  const generateUsers = (count) => {
    const names = [
      "Alex", "Maria", "Ivan", "Olga", "Dmitry", "Anna", "Sergey", "Elena",
      "Andrew", "Natalia", "Pavel", "Tatiana", "Michael", "Julia", "Vladimir",
      "Ksenia", "Artem", "Ekaterina", "Nikolay", "Svetlana", "Roman", "Victoria"
    ];
    
    const surnames = [
      "Ivanov", "Petrov", "Sidorov", "Smirnov", "Kuznetsov", "Popov", "Vasiliev",
      "Sokolov", "Mikhailov", "Novikov", "Fedorov", "Morozov", "Volkov", "Alekseev",
      "Lebedev", "Semenov", "Egorov", "Pavlov", "Kozlov", "Stepanov", "Nikitin"
    ];    
    const domains = ["mail.com", "gmail.com", "yandex.com", "outlook.com", "hotmail.com"];    
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
    console.log("Recalculating sortedUsers");
    const users = generateUsers(usersCount);
    return sortUsers(users);
  }, [usersCount]);

  const userStats = useMemo(() => {
    console.log("Recalculating statistics");
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
      topUser: sortedUsers[0]?.name || "No data",
      bottomUser: sortedUsers[sortedUsers.length - 1]?.name || "No data"
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
    <View style={UseMemoStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={UseMemoStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={UseMemoStyles.header}>
            <View style={UseMemoStyles.headerCenter}>
              <View style={UseMemoStyles.titleBadge}>
                <Text style={UseMemoStyles.titleBadgeText}>⌗ useMemo</Text>
              </View>
              <Text style={UseMemoStyles.headerSubtitle}>COMPUTATION OPTIMIZATION</Text>
            </View>
          </View>

          {/* Разделительная линия */}
          <View style={UseMemoStyles.cyberLine} />

          {/* Control Card */}
          <View style={UseMemoStyles.cardWrapper}>
            <View style={UseMemoStyles.card}>
              <View style={UseMemoStyles.cardHeader}>
                <View style={UseMemoStyles.cardIcon}>
                  <Ionicons name="people" size={24} color="#00d4ff" />
                </View>
                <View style={UseMemoStyles.cardTitleContainer}>
                  <Text style={UseMemoStyles.cardTitle}>DATA SET CONTROL</Text>
                  <Text style={UseMemoStyles.cardDescription}>Manage dataset size and sorting</Text>
                </View>
              </View>
              
              <View style={UseMemoStyles.counterSection}>
                <Text style={UseMemoStyles.counterLabel}>DATASET SIZE:</Text>                
                <View style={UseMemoStyles.counterContainer}>
                  <TouchableOpacity 
                    style={UseMemoStyles.countButton}
                    onPress={() => {
                      if (tempUsersCount > 10) 
                        setTempUsersCount(value => value - 10);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[UseMemoStyles.countButtonGradient, { backgroundColor: 'rgba(255, 42, 109, 0.1)' }]}>
                      <Ionicons name="remove" size={18} color="#ff2a6d" />
                      <Text style={[UseMemoStyles.countButtonText, { color: '#ff2a6d' }]}>-10</Text>
                    </View>
                  </TouchableOpacity>                  
                  
                  <TouchableOpacity 
                    style={UseMemoStyles.countButton}
                    onPress={() => {
                      if (tempUsersCount > 1) 
                        setTempUsersCount(value => value - 1);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[UseMemoStyles.countButtonGradient, { backgroundColor: 'rgba(255, 42, 109, 0.1)' }]}>
                      <Ionicons name="remove" size={18} color="#ff2a6d" />
                      <Text style={[UseMemoStyles.countButtonText, { color: '#ff2a6d' }]}>-1</Text>
                    </View>
                  </TouchableOpacity>   
                  
                  <View style={UseMemoStyles.counterValueContainer}>
                    <Text style={UseMemoStyles.counterValue}>{tempUsersCount}</Text>
                    <Text style={UseMemoStyles.counterValueLabel}>ENTRIES</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={UseMemoStyles.countButton}
                    onPress={() => {
                      if (tempUsersCount < 200) 
                        setTempUsersCount(value => value + 1);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[UseMemoStyles.countButtonGradient, { backgroundColor: 'rgba(0, 212, 255, 0.1)' }]}>
                      <Ionicons name="add" size={18} color="#00d4ff" />
                      <Text style={[UseMemoStyles.countButtonText, { color: '#00d4ff' }]}>+1</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={UseMemoStyles.countButton}
                    onPress={() => {
                      if (tempUsersCount < 190) 
                        setTempUsersCount(value => value + 10);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[UseMemoStyles.countButtonGradient, { backgroundColor: 'rgba(0, 212, 255, 0.1)' }]}>
                      <Ionicons name="add" size={18} color="#00d4ff" />
                      <Text style={[UseMemoStyles.countButtonText, { color: '#00d4ff' }]}>+10</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity
                  style={UseMemoStyles.sortButton}
                  onPress={handleSortButton}
                  activeOpacity={0.8}
                  disabled={sortingLoading}
                >
                  <View style={[UseMemoStyles.sortButtonGradient, { backgroundColor: 'rgba(0, 212, 255, 0.1)' }]}>
                    {sortingLoading ? (
                      <ActivityIndicator size="small" color="#00d4ff" />
                    ) : (
                      <>
                        <Ionicons name="flash" size={20} color="#00d4ff" />
                        <Text style={[UseMemoStyles.sortButtonText, { color: '#00d4ff' }]}>COMPUTE & SORT</Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Статистика */}
          {userStats && !sortingLoading && (
            <View style={UseMemoStyles.cardWrapper}>
              <View style={UseMemoStyles.card}>
                <View style={UseMemoStyles.cardHeader}>
                  <View style={UseMemoStyles.cardIcon}>
                    <Ionicons name="stats-chart" size={24} color="#00d4ff" />
                  </View>
                  <View style={UseMemoStyles.cardTitleContainer}>
                    <Text style={UseMemoStyles.cardTitle}>DATA STATISTICS</Text>
                    <Text style={UseMemoStyles.cardDescription}>Optimized with useMemo</Text>
                  </View>
                </View>         
                
                <View style={UseMemoStyles.statsGrid}>
                  <View style={UseMemoStyles.statItem}>
                    <Text style={UseMemoStyles.statValue}>{userStats.avgAge}</Text>
                    <Text style={UseMemoStyles.statLabel}>AVG AGE</Text>
                    <Text style={UseMemoStyles.statEmoji}>📊</Text>
                  </View>
                  <View style={UseMemoStyles.statItem}>
                    <Text style={UseMemoStyles.statValue}>{userStats.maxScore}</Text>
                    <Text style={UseMemoStyles.statLabel}>MAX SCORE</Text>
                    <Text style={UseMemoStyles.statEmoji}>🏆</Text>
                  </View>
                  <View style={UseMemoStyles.statItem}>
                    <Text style={UseMemoStyles.statValue}>{userStats.uniqueDomains}</Text>
                    <Text style={UseMemoStyles.statLabel}>DOMAINS</Text>
                    <Text style={UseMemoStyles.statEmoji}>✉️</Text>
                  </View>
                  <View style={UseMemoStyles.statItem}>
                    <Text style={UseMemoStyles.statValue}>{userStats.minScore}</Text>
                    <Text style={UseMemoStyles.statLabel}>MIN SCORE</Text>
                    <Text style={UseMemoStyles.statEmoji}>📉</Text>
                  </View>
                </View>
                
                <View style={UseMemoStyles.topBottomContainer}>
                  <View style={UseMemoStyles.topBottomItem}>
                    <Text style={UseMemoStyles.topBottomLabel}>TOP ENTRY:</Text>
                    <Text style={UseMemoStyles.topBottomValue}>{userStats.topUser}</Text>
                  </View>
                  <View style={UseMemoStyles.topBottomItem}>
                    <Text style={UseMemoStyles.topBottomLabel}>LAST ENTRY:</Text>
                    <Text style={UseMemoStyles.topBottomValue}>{userStats.bottomUser}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Результаты сортировки */}
          {!sortingLoading ? (
            <View style={UseMemoStyles.cardWrapper}>
              <View style={UseMemoStyles.card}>
                <View style={UseMemoStyles.cardHeader}>
                  <View style={UseMemoStyles.cardIcon}>
                    <Ionicons name="list" size={24} color="#00d4ff" />
                  </View>
                  <View style={UseMemoStyles.cardTitleContainer}>
                    <Text style={UseMemoStyles.cardTitle}>SORTED DATA OUTPUT</Text>
                    <Text style={UseMemoStyles.cardDescription}>Heavy computations cached with useMemo</Text>
                  </View>
                </View>
                
                <ScrollView 
                  style={UseMemoStyles.resultsScrollView}
                  contentContainerStyle={UseMemoStyles.resultsContent}
                  showsVerticalScrollIndicator={false}
                >
                  {sortedUsers.map((user, index) => (
                    <View
                      key={user.id}
                      style={[
                        UseMemoStyles.userCard,
                        index === 0 && UseMemoStyles.topUserCard,
                        index === sortedUsers.length - 1 && UseMemoStyles.bottomUserCard
                      ]}
                    >
                      <View style={UseMemoStyles.userHeader}>
                        <View style={UseMemoStyles.userRankContainer}>
                          <Text style={UseMemoStyles.userRank}>#{index + 1}</Text>
                          <Text style={UseMemoStyles.userMedal}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🔸'}
                          </Text>
                        </View>
                        <View style={UseMemoStyles.userInfo}>
                          <Text style={UseMemoStyles.userName}>{user.name}</Text>
                          <Text style={UseMemoStyles.userDetail}>Age: {user.age}</Text>
                        </View>
                        <Text style={UseMemoStyles.userScore}>{user.score}</Text>
                      </View>
                      <Text style={UseMemoStyles.userEmail}>{user.email}</Text>
                    </View>
                  ))}
                </ScrollView>
                
                <View style={UseMemoStyles.legendContainer}>
                  <View style={UseMemoStyles.legendItem}>
                    <View style={[UseMemoStyles.legendColor, UseMemoStyles.legendGold]} />
                    <Text style={UseMemoStyles.legendText}>TOP ENTRY</Text>
                  </View>
                  <View style={UseMemoStyles.legendItem}>
                    <View style={[UseMemoStyles.legendColor, UseMemoStyles.legendRed]} />
                    <Text style={UseMemoStyles.legendText}>LAST ENTRY</Text>
                  </View>
                  <View style={UseMemoStyles.legendItem}>
                    <Text style={UseMemoStyles.legendEmoji}>⚡</Text>
                    <Text style={UseMemoStyles.legendText}>useMemo</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={UseMemoStyles.cardWrapper}>
              <View style={[UseMemoStyles.card, { borderColor: 'rgba(255, 42, 109, 0.3)' }]}>
                <View style={UseMemoStyles.loadingContainer}>
                  <ActivityIndicator size="large" color="#ff2a6d" />
                  <Text style={UseMemoStyles.loadingText}>
                    PROCESSING {tempUsersCount} ENTRIES...
                  </Text>
                  <Text style={UseMemoStyles.loadingSubtext}>
                    useMemo will cache results to prevent recomputation!
                  </Text>
                </View>
              </View>
            </View>
          )}
          {/* Пробел для нижней навигации */}
          <View style={AppStyles.bottomSpacer}></View>
        </ScrollView>
      </SafeAreaView>

      {/* Нижняя док-панель для навигации */}
      <View style={AppStyles.dockContainer}>
        <View style={AppStyles.dock}>
          {/* Главный экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('home')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="home" size={24} color={activeScreen === 'home' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'home' && AppStyles.dockTextActive]}>
              Home
            </Text>
          </TouchableOpacity>

          {/* Разделитель */}
          <View style={AppStyles.dockDivider}></View>

          {/* useState экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('usestate')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="git-branch" size={24} color={activeScreen === 'usestate' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'usestate' && AppStyles.dockTextActive]}>
              useState
            </Text>
          </TouchableOpacity>

          {/* Разделитель */}
          <View style={AppStyles.dockDivider}></View>

          {/* useEffect экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('useeffect')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="infinite" size={24} color={activeScreen === 'useeffect' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'useeffect' && AppStyles.dockTextActive]}>
              useEffect
            </Text>
          </TouchableOpacity>

          {/* Разделитель */}
          <View style={AppStyles.dockDivider}></View>

          {/* useMemo экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('usememo')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="flash" size={24} color={activeScreen === 'usememo' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'usememo' && AppStyles.dockTextActive]}>
              useMemo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}