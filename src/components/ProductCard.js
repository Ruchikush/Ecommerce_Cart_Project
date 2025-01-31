import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../store/cartSlice';

export default function ProductCard({product, isCartItem = false}) {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        margin: 5,
        borderRadius: 8,
        alignItems: 'center',
      }}>
      <Image source={{uri: product.image}} style={{width: 100, height: 100}} />
      <Text>{product.title}</Text>
      <Text>${product.price}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button title="+" onPress={() => dispatch(addToCart(product))} />
        <Text style={{marginHorizontal: 10}}>{product.quantity || 0}</Text>
        <Button
          title="-"
          onPress={() =>
            product.quantity > 0 && dispatch(removeFromCart(product))
          }
        />

        {/* <Text style={{marginHorizontal: 10}}>{product.quantity || 0}</Text>
        <Button title="-" onPress={() => dispatch(removeFromCart(product))} /> */}
      </View>
    </View>
  );
}
