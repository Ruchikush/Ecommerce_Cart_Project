import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';
import {fetchProducts} from '../api/api';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const cartItems = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      // Ensure every product has a quantity, even if it's not in cart
      const updatedProducts = data.map(product => {
        const cartItem = cartItems.find(item => item.id === product.id);
        return {...product, quantity: cartItem ? cartItem.quantity : 0};
      });
      setProducts(updatedProducts);
    };

    loadProducts();
  }, [cartItems]); // Depend on cartItems to update when cart changes

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductCard product={item} />}
      />
    </View>
  );
}
