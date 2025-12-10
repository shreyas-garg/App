import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { CartProvider, useCart } from './context/CartContext';

import ProductListScreen from './screens/ProductListScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrdersScreen from './screens/OrdersScreen';

const Stack = createNativeStackNavigator();

const CartBadge = ({ navigation }) => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.cartButton}
    >
      <Text style={styles.cartIcon}>🛒</Text>
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const OrdersBadge = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Orders')}
      style={styles.ordersButton}
    >
      <Text style={styles.ordersIcon}>📦</Text>
    </TouchableOpacity>
  );
};

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="Products"
        component={ProductListScreen}
        options={({ navigation }) => ({
          title: 'Pocket Bazaar',
          headerRight: () => (
            <View style={styles.headerRight}>
              <OrdersBadge navigation={navigation} />
              <CartBadge navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={({ navigation }) => ({
          title: 'Product Details',
          headerRight: () => (
            <View style={styles.headerRight}>
              <OrdersBadge navigation={navigation} />
              <CartBadge navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          title: 'Shopping Cart',
          headerRight: () => <OrdersBadge navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
        }}
      />
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          title: 'Order History',
          headerRight: () => <CartBadge navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    marginRight: 16,
    position: 'relative',
  },
  cartIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  ordersButton: {
    marginRight: 16,
  },
  ordersIcon: {
    fontSize: 24,
  },
});
