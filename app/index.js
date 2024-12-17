import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Button, Image } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };
    
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>${item.price}</Text>
      <Button title="Добавить в корзину" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default HomeScreen;
