import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
    Box,
    FlatList,
    Heading,
    Avatar,
    HStack,
    VStack,
    Text,
    Spacer,
    Center,
    NativeBaseProvider,
    Button,
} from "native-base"


const Address = ({ navigation }) => {
    const [value, setValue] = useState([])
     // 是否正在加载数据
     const [isloading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getAddress()
    }, [])
    const getAddress = () => {
        fetch('http://shadowplay.top:7000/car/getbuydata', { method: "POST" })
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    setIsLoading(false)
                    setValue([...data.msg])
                }
            })
    }
    return <Box bgColor="#F2F2F2" w={{ base: "100%", md: "25%", }}>
        <FlatList h="100%" mt="4"
            data={value}
            //列表下拉刷新
            refreshing={isloading}
            onRefresh={() => {
                getAddress()
                }}
            renderItem={({ item }) => (
                <Box
                    bgColor="white"
                    m="2"
                    borderRadius="5"
                    _dark={{
                        borderColor: "gray.900",
                    }}
                    borderColor="coolGray.900"
                    pl="2"
                    pr="2"
                    py="4"
                >
                    <HStack>
                        <VStack w="60">
                            <Text
                                _dark={{
                                    color: "warmGray.50",
                                }}
                                color="coolGray.900"
                                bold
                            >
                                {item.username}
                            </Text>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                            >
                                {item.state}
                            </Text>
                        </VStack>
                        <VStack flex={1}>
                            <Text fontSize="xs" color="coolGray.400" w="100%" textAlign="right" pr="6">{item.outtradeno}</Text>
                            <Text fontSize="xs" color="coolGray.400" w="100%" textAlign="right" pr="6">{item.info.newtime}</Text>
                        </VStack>
                        <Button bgColor="#66CC66" w="10" p="0" onPress={() => { navigation.navigate('OrderDetail', { msg: item }) }}>查看详情</Button>
                    </HStack>
                </Box>
            )}
            keyExtractor={(item) => item._id}
        />
    </Box>
}



export default Address