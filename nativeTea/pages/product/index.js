import React, { useEffect, useState } from "react"
import { Image } from "react-native"
import {
    Pressable,
    Text,
    Box,
    FlatList,
    HStack,
    Spacer,
    Flex,
    Center,
    NativeBaseProvider,
} from "native-base"
const Product = ({ navigation }) => {
    const [prolist, setproList] = useState([])
    const [isloading, setIsLoading] = useState(false)
    useEffect(() => {
        getproList()
    }, [])
    const getproList = () => {
        setproList([])
        fetch('http://shadowplay.top:7000/product/list')
            .then(res => res.json())
            .then(data => {
                if (data.code === 1) {
                    setproList([...data.msg])
                    setIsLoading(false)
                }
            })
    }
    // onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
    //渲染列表每一项数据
    const renderItem = (item) => {
        return <Pressable onPress={() => navigation.navigate("Detail", { id: item._id })}>
            <Box flexDirection="row" p="10px" bg="white" borderRadius="8" mx="2" verticalAlign="middle" mb="10px">
                <Image source={{
                    uri: item.src,
                }} alt="2" style={{ width: 100, height: 100, marginRight: 10 }} />
                {/*justify-content:主軸的對齊 */}
                <Box justifyContent="space-around" pr="3">
                    <Text color="#99CC66">{item.name}</Text>
                </Box>
                <Box justifyContent="space-around" pr="3">
                    <Text>¥&nbsp;{item.price}.0</Text>
                </Box>
            </Box>
        </Pressable>
    }

    return <Box h="100%">
        <FlatList h="100%"
            mt="2"
            data={prolist}
            keyExtractor={(item, i) => i} // 解决 key 问题
            renderItem={({ item }) => renderItem(item)} // 调用方法，去渲染每一项
            //列表下拉刷新
            refreshing={isloading}
            onRefresh={
                () => {
                    getproList()
                }
            }>
        </FlatList>
    </Box>
}

export default Product