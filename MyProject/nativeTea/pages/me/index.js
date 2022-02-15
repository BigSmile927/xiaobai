import React, { useState, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { Box, Center, NativeBaseProvider, Text } from "native-base"
import { connect } from 'react-redux';


const Me = ({ user, navigation, dispatch }) => {
    const exit = () => {
        fetch('http://shadowplay.top:7000/user/exit')
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    dispatch({
                        type: 'user/save',
                        payload: {
                            name: '',
                            email: '',
                            login: false
                        }
                    })
                }
            })
    }
    return <Box>
        {user.login ? (<Box h="100%">
            <Box bg="primary.500" h="200">
                <Center my="auto">
                    <Image source={require('../../images/pic.webp')} style={styles.img}></Image>
                    <Text>{user.name}</Text>
                </Center>
            </Box>
            <Box h="70" bg="white" m="2" borderRadius="10" flexDirection="row">
                <Text fontSize="18" fontWeight="bold" lineHeight="70" color="gray.400" onPress={() => navigation.navigate('Address')} w="100%" pl="5">我的地址</Text>
            </Box>
            <Box h="70" bg="white" m="2" borderRadius="10" flexDirection="row">
                <Text fontSize="18" fontWeight="bold" lineHeight="70" color="gray.400" onPress={() => navigation.navigate('Order')} w="100%" pl="5">我的订单</Text>
            </Box>

            <Box h="70" bg="error.600" m="2" borderRadius="10" w="200" mx="auto">
                <Text onPress={() => exit()} fontSize="18" fontWeight="bold" color="white" lineHeight="70" textAlign="center">退出登录</Text>
            </Box>
        </Box>) : <Box h="100%">
            <Box bg="primary.500" h="200">
                <Center my="auto">
                    <Image source={require('../../images/moren.webp')} style={styles.img}></Image>
                </Center>
            </Box>
            <Box h="70" bg="#66CC66" mx="4" mt="10" borderRadius="10">
                <Text onPress={() => navigation.navigate('Login')} fontSize="18" fontWeight="bold" color="white" lineHeight="70" textAlign="center">登陆</Text>
            </Box>
            <Box h="70" bg="#66CC66" mx="4" mt="5" borderRadius="10">
                <Text onPress={() => navigation.navigate('Register')} fontSize="18" fontWeight="bold" color="white" lineHeight="70" textAlign="center">注册</Text>
            </Box>
        </Box>}
    </Box>
}

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#90AF6B',
    }
})
export default connect((state) => ({ user: state.user }))(Me);