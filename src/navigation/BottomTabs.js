import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {useSelector} from 'react-redux';
import {View, Text, Image} from 'react-native';

const Tab = createBottomTabNavigator();

// Cart Icon with Badge
const CartIconWithBadge = ({color}) => {
  const cart = useSelector(state => state.cart.cartItems);
  return (
    <View style={{position: 'relative'}}>
      <Text style={{fontSize: 24, color: color}}>🛒</Text>{' '}
      {/* Cart Icon with dynamic color */}
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
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: 'black', // Inactive tab color is black
        tabBarActiveTintColor: '#4A90E2', // Active tab color is blue
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://img.icons8.com/ios-filled/50/000000/home.png',
              }}
              style={{
                width: size,
                height: size,
                tintColor: color, // Apply dynamic color here
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color}) => <CartIconWithBadge color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://img.icons8.com/ios-filled/50/000000/user.png',
              }}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
