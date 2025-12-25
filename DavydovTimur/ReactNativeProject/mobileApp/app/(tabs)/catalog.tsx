import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert, Modal, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useCart } from '../CartContext';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  reviews?: any;
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [descExpanded, setDescExpanded] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterType, setFilterType] = useState<'none' | 'price' | 'rating' | 'discount'>('none');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };
  const handleSelectFilter = (type: 'none' | 'price' | 'rating' | 'discount') => {
    setFilterType(type);
    setFilterModalVisible(false);
  };

  let filteredProducts: Product[] = products.filter(item => {
    const q = searchQuery.trim().toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });
  if (filterType === 'price') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (filterType === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (filterType === 'discount') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setDescExpanded(false);
    setModalVisible(true);
  };

  const closeProductModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#202130', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      <View style={styles.topRow}>
        <View style={styles.searchContainer}>
          <Image source={require('../../assets/images/search.png')} style={styles.searchIcon}/>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск"
            placeholderTextColor="#B0B0B0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <Image source={require('../../assets/images/filter.png')} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {router.replace('/(tabs)/cart')}}>
          <Image source={require('../../assets/images/cart.png')} style={styles.iconImg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.replace('/posts' as any); }}>
          <Image source={require('../../assets/images/message.png')} style={styles.postsIconImg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.replace('/(auth)/login'); }}>
          <Image source={require('../../assets/images/user.png')} style={styles.iconImg} />
        </TouchableOpacity>
      </View>
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity style={styles.filterModalOverlay} activeOpacity={1} onPress={() => setFilterModalVisible(false)}>
          <View style={styles.filterModalBox}>
            <TouchableOpacity style={styles.filterOption} onPress={() => handleSelectFilter('none')}>
              <Text style={[styles.filterOptionText, filterType === 'none' && styles.filterOptionActive]}>Без фильтра</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterOption} onPress={() => handleSelectFilter('price')}>
              <Text style={[styles.filterOptionText, filterType === 'price' && styles.filterOptionActive]}>По цене</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterOption} onPress={() => handleSelectFilter('rating')}>
              <Text style={[styles.filterOptionText, filterType === 'rating' && styles.filterOptionActive]}>По рейтингу</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterOption} onPress={() => handleSelectFilter('discount')}>
              <Text style={[styles.filterOptionText, filterType === 'discount' && styles.filterOptionActive]}>По скидке</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openProductModal(item)}>
            <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}₽</Text>
                <Text style={styles.oldPrice}>
                  {(item.price / (1 - (item.discountPercentage || 0) / 100)).toFixed(0)}₽
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{item.discountPercentage ? Math.round(item.discountPercentage) : 0}%</Text>
                </View>
              </View>
              <View style={styles.ratingRow}>
                <Image source={require('../../assets/images/star.png')} style={styles.star} />
                <Text style={styles.rating}>{item.rating?.toFixed(1) || '0.0'}</Text>
                <Image source={require('../../assets/images/reviews.png')} style={styles.reviewsImg} />
                <Text style={styles.reviews}>{item.reviews?.rating} 999 отзывов</Text>
              </View>
              <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeProductModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.closeIconButton} onPress={closeProductModal}>
              <Text style={styles.closeIconText}>×</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
              <Image source={{ uri: selectedProduct?.thumbnail }} style={styles.modalImage} />
              <View style={styles.modalContent}>
                <View style={styles.modalPriceRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.price}>{selectedProduct?.price}₽</Text>
                    <Text style={styles.oldPrice}>
                      {selectedProduct ? (selectedProduct.price / (1 - (selectedProduct.discountPercentage || 0) / 100)).toFixed(0) : ''}₽
                    </Text>
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>-{selectedProduct ? Math.round(selectedProduct.discountPercentage) : 0}%</Text>
                    </View>
                  </View>
                  <View style={styles.modalStarsRow}>
                    <Image source={require('../../assets/images/star.png')} style={styles.star} />
                    <Text style={styles.rating}>{selectedProduct?.rating?.toFixed(1) || '0.0'}</Text>
                    <Image source={require('../../assets/images/reviews.png')} style={styles.reviewsImg} />
                    <Text style={styles.reviews}>999 отзывов</Text>
                  </View>
                </View>
                <Text style={styles.modalTitle}>{selectedProduct?.title}</Text>
                <View style={styles.modalDescRow}>
                  <Text style={styles.modalDesc} numberOfLines={descExpanded ? undefined : 3}>
                    {selectedProduct?.description}
                  </Text>
                  <TouchableOpacity onPress={() => setDescExpanded(!descExpanded)}>
                    <Image
                      source={require('../../assets/images/pageArrow.png')}
                      style={[styles.descArrowImg, { transform: [{ rotate: descExpanded ? '0deg' : '180deg' }] }]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalQtyRow}>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(q => q + 1)}>
                    <Text style={styles.plusText}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Text style={styles.minusText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addToCartButton} onPress={() => {
                    if (selectedProduct) {
                      addToCart({
                        id: selectedProduct.id,
                        title: selectedProduct.title,
                        price: selectedProduct.price,
                        discount: Math.round(selectedProduct.discountPercentage),
                        image: selectedProduct.thumbnail,
                      }, quantity);
                    }
                    setModalVisible(false);
                  }}>
                    <Text style={styles.addToCartText}>Добавить в корзину</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#202130',
    paddingHorizontal: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    marginBottom: 18,
    marginLeft: 6,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#404459',
    borderRadius: 10,
    height: 38,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingLeft: 6,
  },
  searchIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#B0B0B0',
  },
  iconImg: {
    width: 55,
    height: 28,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  postsIconImg: {
    width: 55,
    height: 28,
    resizeMode: 'contain',
    tintColor: '#fff',
    marginHorizontal: 4,
  },
  list: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    width: '49%',
    backgroundColor: '#1C1E27',
    borderRadius: 10,
    borderColor: '#404459',
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
    flex: 1,
    flexDirection: 'column',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 6,
  },
  oldPrice: {
    color: '#fff',
    fontSize: 12,
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  discount: {
    color: '#FF5A5F',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#404459',
    marginVertical: 4,
  },
  desc: {
    color: '#B0B0B0',
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 16,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  star: {
    width: 12,
    height: 12,
    marginRight: 4,
    resizeMode: 'cover',
    tintColor: '#FFD600',
  },
  rating: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  reviewsImg: {
    width: 12,
    height: 12,
    marginRight: 4,
    resizeMode: 'cover',
    tintColor: '#B0B0B0',
  },
  reviews: {
    color: '#B0B0B0',
    fontSize: 11,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '97%',
    backgroundColor: '#1C1E27',
    borderRadius: 20,
    alignItems: 'center',
    maxHeight: '90%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#404459',
  },
  modalContent: {
    flex: 1,
    padding: 14,
    flexDirection: 'column',
  },
  modalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  modalStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  modalTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 18,
    textAlign: 'center',
  },
  modalDescRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  modalDesc: {
    color: '#B0B0B0',
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
  },
  descArrowImg: {
    color: '#fff',
    width: 18,
    height: 18,
    marginLeft: 8,
    marginTop: 2,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  modalQtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  quantityButton: {
    backgroundColor: '#2E3140',
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  minusText: {
    color: '#F09D9E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  plusText: {
    color: '#93E1A1',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 8,
    minWidth: 32,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#5940C4',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginLeft: 12,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  closeIconButton: {
    position: 'absolute',
    top: -15,
    right: 0,
    padding: 15,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  closeIconText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  filterButton: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  filterIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  filterModalBox: {
    backgroundColor: '#23243a',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 18,
    marginHorizontal: 0,
  },
  filterOption: {
    paddingVertical: 12,
  },
  filterOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  filterOptionActive: {
    color: '#5940C4',
    fontWeight: 'bold',
  },
  discountBadge: {
    backgroundColor: '#FF5A5F',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});