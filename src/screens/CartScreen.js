import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';

export default function CartScreen() {
  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <View>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ProductCard product={item} isCartItem />}
        />
      )}
    </View>
  );
}
