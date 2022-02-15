import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Image } from 'react-native'
import {
    Box,
    FlatList,
    Text,
    Center,
    Pressable,
    Button,
    Icon
} from "native-base"
import Ionicons from 'react-native-vector-icons/Ionicons'

const Car = ({ navigation, user, route }) => {
    const [carlist, setCarlist] = useState([])
    // 是否正在加载数据
    const [isloading, setIsLoading] = useState(false)
    useEffect(() => {
        getCar()
    }, [route.params])
    const addNum = (index) => {
        let a = carlist
        a[index].num += 1;
        setCarlist([...a])
    }
    const reduceNum = (index) => {
        let a = carlist
        if (a[index].num > 1) {
            a[index].num -= 1;
            setCarlist([...a])
        }
    }
    const total = () => {
        let price = 0
        carlist.map((item) => {
            price += item.price * item.num
        })
        return price
    }
    const getCar = () => {
        fetch('http://shadowplay.top:7000/car/cars')
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    setCarlist([...data.cardata])
                    setIsLoading(false)
                }
            })
    }
    const deleteCar = (idd) => {
        fetch('http://shadowplay.top:7000/car/detele', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idd
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    getCar()
                }
            })
    }
    const toOrder = () => {
        if (carlist.length) {
            fetch('http://shadowplay.top:7000/car/change', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    list: carlist
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 0) {
                        navigation.navigate('DingDan')
                    }
                })
        }
    }
    // onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
    //渲染列表每一项数据
    const renderItem = (item, index) => {
        return <Pressable>
            <Box flexDirection="row" p="10px" bg="white" borderRadius="8" mx="2" verticalAlign="middle" mb="10px">
                <Image source={{
                    uri: item.src,
                }} alt="2" style={{ width: 100, height: 100, marginRight: 10 }} />
                {/*justify-content:主軸的對齊 */}
                <Box justifyContent="space-around" pr="3" w="150">
                    <Text onPress={() => navigation.navigate("Detail", { id: item.id })} color="#99CC66">{item.name}</Text>
                    <Text>¥&nbsp;{item.price * item.num}.0</Text>
                </Box>
                <Box justifyContent="space-around">
                    <Button
                        size="6"
                        endIcon={<Icon as={Ionicons} name="ios-remove" size="6" color="#10b981" />}
                        bgColor="white"
                        onPress={() => reduceNum(index)}
                        _pressed={{
                            bg: '#CCFFFF'
                        }}
                    >
                    </Button>
                </Box>
                <Box justifyContent="space-around">
                    <Center w="6">{item.num}</Center>
                </Box>
                <Box justifyContent="space-around">
                    <Button
                        size="6"
                        endIcon={<Icon as={Ionicons} name="add-outline" size="6" color="#10b981" />}
                        bgColor="white"
                        onPress={() => addNum(index)}
                        _pressed={{
                            bg: '#CCFFFF'
                        }}
                    >
                    </Button>
                </Box>
                <Box position="absolute" right="0">
                    <Button
                        mt="1"
                        mr="1"
                        onPress={() => { deleteCar(item.id) }}
                        size="6"
                        endIcon={<Icon as={Ionicons} name="close-circle-outline" size="6" color="#FF0033" />}
                        bgColor="white"
                        _pressed={{
                            bg: '#CCFFFF'
                        }}
                    >
                    </Button>
                </Box>
            </Box>
        </Pressable>
    }

    return <Box w="100%">
        {user.login ?
            <Box h="100%">
                <FlatList h="91%"
                    mt="2"
                    data={carlist}
                    keyExtractor={(item, i) => i} // 解决 key 问题
                    renderItem={({ item, index }) => renderItem(item, index)} // 调用方法，去渲染每一项
                    //列表下拉刷新
                    refreshing={isloading}
                    onRefresh={
                        () => {
                            getCar()
                        }
                    }>
                </FlatList>
                <Box h="9%" display="flex" flexDirection="row" bg="white">
                    <Box flex="1" pl="2" display="flex" flexDirection="row">
                        <Text lineHeight="52" w="100" color="#99CC66">购物车总计:</Text>
                        <Text lineHeight="52" flex="1" color="#FF0033">¥&nbsp;{total()}</Text>
                    </Box>
                    <Box w="120" pr="2" pt="1"><Button onPress={() => toOrder()} px="8" borderRadius="20" >去结算</Button></Box>
                </Box>
            </Box> : <Box h="100%">
                <Center>
                    <Button mt="200" onPress={() => navigation.navigate('Login')}>请登录后查看</Button>
                </Center>
            </Box>}
    </Box>
}

export default connect((state) => ({ user: state.user }))(Car);