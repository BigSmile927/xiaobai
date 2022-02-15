import React, { useEffect, useState } from "react"
import { Image } from "react-native"
import {
    Pressable,
    Text,
    Box,
    FlatList,
} from "native-base"
const Product = ({ navigation }) => {
    const [newlist, setnewList] = useState([])
    const [isloading, setIsLoading] = useState(false)
    useEffect(() => {
        getnewList()
    }, [])
    const getnewList = () => {
        setnewList([])
        fetch('http://shadowplay.top:7000/news/menu')
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    setnewList([...data.msg])
                    setIsLoading(false)
                }
            })
    }
    // onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
    //渲染列表每一项数据
    const renderItem = (item) => {
        return <Pressable onPress={() => navigation.navigate("NewsDetail", { id: item.id })}>
            <Box flexDirection="row" p="10px" bg="white" borderRadius="8" mx="2" verticalAlign="middle" mb="10px">
                <Image source={{
                    uri: item.img,
                }} alt="2" style={{ width: 100, height: 100, marginRight: 10 }} />
                {/*justify-content:主軸的對齊 */}
                <Box justifyContent="space-around" flex="1">
                    <Text color="#99CC66" bold>{item.name}</Text>
                    <Text>{item.title}</Text>
                </Box>
            </Box>
        </Pressable>
    }

    return <Box h="100%">
        <FlatList h="100%"
            mt="2"
            data={newlist}
            keyExtractor={(item, i) => i} // 解决 key 问题
            renderItem={({ item }) => renderItem(item)} // 调用方法，去渲染每一项
            //列表下拉刷新
            refreshing={isloading}
            onRefresh={
                () => {
                    getnewList()
                }
            }>
        </FlatList>
    </Box>
}

export default Product