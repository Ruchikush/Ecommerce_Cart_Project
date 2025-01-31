import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';
import {fetchProducts} from '../api/api';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const cartItems = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();

      const updatedProducts = data.map(product => {
        const cartItem = cartItems.find(item => item.id === product.id);
        return {...product, quantity: cartItem ? cartItem.quantity : 0};
      });
      setProducts(updatedProducts);
    };

    loadProducts();
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductCard product={item} />}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
