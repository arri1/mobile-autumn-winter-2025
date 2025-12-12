import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Modal } from 'react-native';
import { router } from 'expo-router';
import { useCart } from '../CartContext';


export default function Cart() {
  const { cart, inc, dec, removeFromCart,clear } = useCart();
  const [cityModalVisible, setCityModalVisible] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState<string>('Адрес доставки');
  const cities = ['Якутск', 'Москва', 'Санкт-Петербург', 'Новосибирск', 'Казань'];

  const { totalCount, totalSum, totalDiscount } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.totalCount += item.quantity;
        acc.totalSum += item.price * item.quantity * (1 - item.discount / 100);
        acc.totalDiscount += item.price * item.quantity * (item.discount / 100);
        return acc;
      },
      { totalCount: 0, totalSum: 0, totalDiscount: 0 },
    );
  }, [cart]);

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => {router.replace('/(tabs)/catalog')}}>
          <Image source={require('../../assets/images/home.png')} style={styles.iconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addressButton} onPress={() => setCityModalVisible(true)}>
          <Image source={require('../../assets/images/geo.png')} style={styles.geoIcon} />
          <Text style={styles.addressText}>{selectedCity}</Text>
        </TouchableOpacity >
        <TouchableOpacity onPress={() => { router.replace('/(auth)/login'); }}>
          <Image source={require('../../assets/images/user.png')} style={styles.iconImg} />
        </TouchableOpacity>
      </View>
      <Modal
        visible={cityModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <TouchableOpacity style={styles.cityModalOverlay} activeOpacity={1} onPress={() => setCityModalVisible(false)}>
          <View style={styles.cityModalBox}>
            {cities.map(city => (
              <TouchableOpacity
                key={city}
                style={styles.cityOption}
                onPress={() => {
                  setSelectedCity(city);
                  setCityModalVisible(false);
                }}
              >
                <Text style={[styles.cityOptionText, selectedCity === city && styles.cityOptionActive]}>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.cartBlock}>
        <Text style={styles.cartTitle}>Корзина</Text>
        <FlatList
          data={cart}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.cartItemImg} />
              <View style={styles.cartItemInfo}>
                <View style={styles.cartItemRow}>
                  <Text style={styles.cartItemPriceOld}>{item.price}₽</Text>
                  <Text style={styles.cartItemPriceNew}>{Math.round(item.price * (1 - item.discount / 100))}₽</Text>
                  <Text style={styles.cartItemDiscount}>С учётом скидки -{item.discount}%</Text>
                </View>
                <Text style={styles.cartItemTitle}>{item.title}</Text>
                <View style={styles.cartItemActions}>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => dec(item.id)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => inc(item.id)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                    <Image source={require('../../assets/images/trash-can.png')} style={styles.removeIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.summaryBlock}>

        <View style={styles.orderInfo}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCell}>
              <Text style={styles.summaryLabel}>
                Товаров: <Text style={styles.summaryValue}>{totalCount}</Text>
              </Text>
            </View>
            <View style={styles.summaryCellRight}>
              <Text style={styles.summaryLabel}>
                Итого: <Text style={styles.summarySum}>{Math.round(totalSum)} ₽</Text>
              </Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCell}>
              <Text style={styles.summaryLabel}>
                Скидка: <Text style={styles.summaryDiscount}>-{Math.round(totalDiscount)} ₽</Text>
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={() => {clear(); window.alert('Заказ оформлен!')}}>
          <Text style={styles.checkoutButtonText}>Перейти к оформлению</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#202130',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    marginBottom: 18,
    marginLeft: 6,
  },
  iconImg: {
    width: 55,
    height: 28,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  addressButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#404459',
    borderRadius: 10,
    height: 38,
  },
  geoIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  addressText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cartBlock: {
    backgroundColor: '#1C1E27',
    borderRadius: 10,
    borderColor: '#404459',
    marginBottom: 12,
    padding: 12,
    flex: 1,
  },
  cartTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#404459',
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cartItemPriceOld: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'line-through',
    opacity: 0.5,
    marginRight: 8,
  },
  cartItemPriceNew: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  cartItemDiscount: {
    color: '#93E1A1',
    fontSize: 13,
    fontWeight: '600',
  },
  cartItemTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#2E3140',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    color: '#fff',
    fontSize: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F09D9E',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  removeIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#404459',
    marginVertical: 4,
  },
  summaryBlock: {
    backgroundColor: '#23243a',
    borderRadius: 16,
    padding: 16,
    paddingBottom: 24,
  },
  orderInfo:{
    paddingHorizontal: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryCell: {
    flex: 1,
  },
  summaryCellRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 15,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 15,
  },
  summarySum: {
    color: '#93E1A1',
    fontSize: 15,
    fontWeight: 'bold',
  },
  summaryDiscount: {
    color: '#F09D9E',
    fontSize: 15,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#5940C4',
    borderRadius: 12,
    marginTop: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cityModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityModalBox: {
    backgroundColor: '#23243a',
    borderRadius: 16,
    padding: 18,
    minWidth: 220,
    alignItems: 'stretch',
  },
  cityOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#404459',
  },
  cityOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  cityOptionActive: {
    color: '#93E1A1',
    fontWeight: 'bold',
  },
});
