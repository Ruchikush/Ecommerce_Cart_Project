import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {useSelector} from 'react-redux';
import {View, Text} from 'react-native';

const Tab = createBottomTabNavigator();

const CartIconWithBadge = () => {
  const cart = useSelector(state => state.cart.cartItems);
  return (
    <View style={{position: 'relative'}}>
      <Text>🛒</Text>
      {cart.length > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -6,
            backgroundColor: 'red',
            borderRadius: 10,
            paddingHorizontal: 6,
          }}>
          <Text style={{color: 'white', fontSize: 12}}>{cart.length}</Text>
        </View>
      )}
    </View>
  );
};

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{tabBarIcon: () => <CartIconWithBadge />}}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
