import * as React from 'react';
import { NativeBaseProvider, IconButton, Text, Menu } from 'native-base'
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import indexModel from './models/index';
import { Provider } from 'react-redux';
import { create } from 'dva-core';

import Home from './pages/home';
import Me from './pages/me';
import News from './pages/news';
import Product from './pages/product';
import Car from './pages/car'
import Detail from './pages/detail';
import NewsDetail from './pages/newsdetail';
import Login from './pages/login'
import Register from './pages/register'
import Order from './pages/order';
import AddAddress from './pages/addAddress';
import Address from './pages/address';
import DingDan from './pages/buying'
import OrderDetail from './pages/orderDetail';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const models = [indexModel];
const app = create();
models.forEach((o) => {
  // 装载models对象
  app.model(o);
});
app.start(); // 实例初始化
const store = app._store; // 获取redux的store对象供react-redux使用

const TabBar = () => {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Product') {
          iconName = focused ? 'cards-playing-outline' : 'cards-outline';
        } else if (route.name === 'News') {
          iconName = focused ? 'dots-horizontal-circle' : 'dots-horizontal-circle-outline';
        } else if (route.name === 'Car') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else {
          iconName = focused ? 'account' : 'account-outline';
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#66CC66',
      tabBarInactiveTintColor: 'gray',
      //隐藏TabNavigator自带的导航条
      headerShown: false
    })}>
    <Tab.Screen name="Home" component={Home} options={{ title: 'Rang茶' }} />
    <Tab.Screen name="Product" component={Product} options={{
      title: '商品',
    }} />
    <Tab.Screen name="News" component={News} options={{
      title: '新闻',
    }} />
    <Tab.Screen name="Car" component={Car} options={{
      title: '购物车',
    }} initialParams={{ id: 1 }} />
    <Tab.Screen name="Me" component={Me} options={{
      title: '我的',
    }} />
  </Tab.Navigator>
}

export default function App() {
  const navigationRef = useNavigationContainerRef();
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="TabBar"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#66CC66',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
              //指定右侧按钮
              headerRight: () => {
                return <Menu
                  w="90"
                  trigger={(triggerProps) => {
                    return (
                      <IconButton
                        bg="#66CC66"
                        size="sm"
                        variant="solid"
                        _icon={{
                          as: Ionicons,
                          name: "ios-ellipsis-horizontal-sharp",
                        }}
                        {...triggerProps}
                      />
                    )
                  }}
                >
                  <Menu.Item onPress={() => navigationRef.navigate("Product")}>商品列表</Menu.Item>
                  <Menu.Item onPress={() => navigationRef.navigate("Car", { id: 1 })}>购物车</Menu.Item>
                  <Menu.Item onPress={() => navigationRef.navigate("Me")}>个人中心</Menu.Item>
                </Menu>
              }
            }}>
            <Stack.Screen name="TabBar" component={TabBar} options={({ route }) => ({
              headerTitle: () => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
                switch (routeName) {
                  case 'Home':
                    return <Text color="#fff" fontWeight="bold" fontSize="18">Rang茶</Text>;
                  case 'Product':
                    return <Text color="#fff" fontWeight="bold" fontSize="18">商品列表</Text>;
                  case 'News':
                    return <Text color="#fff" fontWeight="bold" fontSize="18">茶叶知识</Text>;
                  case 'Car':
                    return <Text color="#fff" fontWeight="bold" fontSize="18">购物车</Text>;
                  case 'Me':
                    return <Text color="#fff" fontWeight="bold" fontSize="18">我的</Text>;
                }
              },
            })} ></Stack.Screen>
            <Stack.Screen name="Detail" component={Detail} options={{ title: '商品详情' }} />
            <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ title: '饮茶更要懂茶' }} />
            <Stack.Screen name="Login" component={Login} options={{ title: '登录' }} />
            <Stack.Screen name="Order" component={Order} options={{ title: '订单列表' }} />
            <Stack.Screen name="Address" component={Address} options={{ title: '地址列表' }} />
            <Stack.Screen name="AddAddress" component={AddAddress} options={{ title: '添加地址' }} />
            <Stack.Screen name="DingDan" component={DingDan} options={{ title: '确认订单' }} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ title: '订单详情' }} />
            <Stack.Screen name="Register" component={Register} options={{ title: '注册' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}