import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Box, Text, ScrollView, Center, Flex, Button, Icon, useToast } from 'native-base'
import AntDesign from "react-native-vector-icons/AntDesign"
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
    },
    stretch: {
        width: 345,
        height: 345,
        resizeMode: 'stretch',
    },
    stretch2: {
        width: 78,
        height: 78,
        resizeMode: 'stretch',
    },
    stretch3: {
        width: 345,
        height: 229,
        resizeMode: 'stretch',
    },
});

const Detail = ({ route, navigation, user }) => {
    const [number, setNumber] = useState(1)
    const [value, setValue] = useState({})
    const toast = useToast()
    //加
    const increase = () => {
        setNumber(number + 1);
    }

    //减
    const reduce = () => {
        if (number > 1) {
            setNumber(number - 1);
        }
        else {
            setNumber(1);
        }

    }
    useEffect(() => {
        getDetail()
    }, [])

    const getDetail = () => {
        fetch(`http://shadowplay.top:7000/product/detail?id=${route.params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.code === 1) {
                    setValue(data.msg)
                }
            })
    }
    const addCar = () => {
        if (user.login) {
            fetch('http://shadowplay.top:7000/car/add', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: value._id,
                    name: value.name,
                    num: number,
                    price: value.price,
                    src: value.src
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 0) {
                        toast.show({
                            render: () => {
                                return (
                                    <Text bg="#66CC99" px="4" py="2" rounded="sm" mb={5} fontSize="25" color="white">
                                        添加购物车成功!
                                    </Text>
                                )
                            },
                        })
                        setTimeout(() => {
                            toast.closeAll()
                            navigation.navigate('Car',{id:1})
                        }, 1000)
                    }
                })
        } else {
            toast.show({
                render: () => {
                    return (
                        <Text bg="#66CC99" px="4" py="2" rounded="sm" mb={5} fontSize="25" color="white">
                            请登录后重试!
                        </Text>
                    )
                },
            })
        }
    }
    return <ScrollView>
        <Flex
            style={styles.container}
            px="3"
            py="5"
            direction="column"
            mb="2.5"
            mt="1.5"
            _text={{
                color: "coolGray.800",
            }}
        >
            <Center size="345" alignItems='center' >
                <Image
                    style={styles.stretch}
                    source={{
                        uri: value.src,
                    }}
                />
            </Center>

            <Center size="78" mt="4">
                <Image
                    style={styles.stretch2}
                    source={{
                        uri: value.src,
                    }}
                />
            </Center>

            <Box
                mt="4"
                _text={{
                    fontSize: "22",
                    fontWeight: "medium",
                    color: "#444444",
                    letterSpacing: "lg",
                }}
            >
                {value.name}
                <Box w="30" h="3.2" bgColor="#dddddd" mt="5"></Box>
            </Box>

            <Box
                mt="4"
                _text={{
                    fontSize: "lg",
                    fontWeight: "medium",
                    letterSpacing: "lg",
                }}
            >
                <Text fontSize="22" color="#444444" mb="3">¥{value.price}.0</Text>
                <Text color="#939393" fontSize="13">饮茶不但是传统饮食文化，同时，由于茶中含有多种抗氧化物质与抗氧化营养素，对于消除自由基有一定的效果。因此喝茶也有助防老，具养生保健功能，每天喝三两杯茶可起到防老的作用。茶叶中含有多种维生素和氨基酸，喝茶对于清油解腻，增强神经兴奋以及消食利尿也具有一定的作用。</Text>
            </Box>

            <Box
                mt="4"
                _text={{

                }}
            >
                <Box py="2" borderTopWidth="1" borderBottomWidth="1" borderColor="#ddd" borderStyle='dashed'><Text fontSize="14" color="#777">商品编号：{value.number}</Text></Box>
                <Text color="#777" pt="2">分类：{value.sort}</Text>
            </Box>

            <Box
                mt="4"
                mb="3"
                _text={{
                }}
            >
                <Flex
                    direction="row"
                >
                    <Box><Button
                        w="140"
                        bgColor="#66CC66"
                        _text={{
                            fontSize: "16",
                            color: "white"
                        }}
                        leftIcon={<Icon as={AntDesign} name="shoppingcart" size="sm" />}
                        onPress={() => { addCar() }}
                    >
                        加入购物车
                    </Button></Box>
                    <Box ml="4">
                        <Flex
                            p="0" s
                            direction="row">
                            <Button
                                w="8"
                                bgColor="#66CC66"
                                _text={{
                                    fontSize: "16",
                                    color: "white"
                                }}
                                onPress={reduce}>
                                -
                            </Button>
                            <Center w="8">{number}</Center>
                            <Button
                                w="8"
                                bgColor="#66CC66"
                                _text={{
                                    fontSize: "16",
                                    color: "white"
                                }}
                                onPress={increase}>
                                +
                            </Button>
                        </Flex>
                    </Box>
                </Flex>

            </Box>

            <Box
                mt="4"
                _text={{

                }}
            >
                <Box borderTopWidth="1" borderColor="#ddd"><Box w="16" pl="4" pt="2" pb="5" borderTopWidth="4" borderColor="#333"><Text color="#333" fontSize="15" fontWeight="bold">描述</Text></Box></Box>
                <Text color="#777" fontSize="15" lineHeight="24">{value.described}</Text>
                <Box mt="3"><Image
                    style={styles.stretch3}
                    source={{
                        uri: value.desSrc,
                    }}
                /></Box>
            </Box>


        </Flex>
    </ScrollView>
}

export default connect((state) => ({ user: state.user }))(Detail);
