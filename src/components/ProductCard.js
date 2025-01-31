import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../store/cartSlice';

export default function ProductCard({product, isCartItem = false}) {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false); // State to track if description is expanded

  const toggleDescription = () => {
    setIsExpanded(!isExpanded); // Toggle description visibility
  };

  return (
    <View style={styles.card}>
      <Image source={{uri: product.image}} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>

        <Text style={styles.description} numberOfLines={isExpanded ? 0 : 3}>
          {product.description}
        </Text>

        {!isExpanded && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.toggleText}>... See More</Text>
          </TouchableOpacity>
        )}

        {isExpanded && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.toggleText}>Show Less</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.price}>${product.price}</Text>

        <View style={styles.actions}>
          {/* Custom Add to Cart Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(addToCart(product))}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{product.quantity || 0}</Text>

          {/* Custom Remove from Cart Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              product.quantity > 0 && dispatch(removeFromCart(product))
            }>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#ddd',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 15,
    borderRadius: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    flexWrap: 'wrap', // Allow wrapping of text if it's too long
    marginBottom: 0,
  },
  toggleText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c1c1c1',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#ddd',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
