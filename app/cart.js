import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shop.db');

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists cart (id integer primary key not null, title text, price real, image text);'
      );
    });

    const fetchCartItems = () => {
      db.transaction(tx => {
        tx.executeSql('select * from cart', [], (_, { rows }) => {
          setCartItems(rows._array);
        });
      });
    };

    fetchCartItems();
  }, []);

  const removeFromCart = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from cart where id = ?', [id], () => {
        setCartItems(cartItems.filter(item => item.id !== id));
      });
    });
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>{item.title}</Text>
      <Text>${item.price}</Text>
      <Button title="Удалить" onPress={() => removeFromCart(item.id)} />
    </View>
  );

  return (
    <FlatList
      data={cartItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default CartScreen;
