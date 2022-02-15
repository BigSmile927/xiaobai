import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import {
    Pressable,
    Text,
    Box,
    FlatList,
    ScrollView
} from "native-base"

const NewsDetail = ({ route }) => {
    const [newDetail, setnewsDetail] = useState({})
    useEffect(() => {
        getnewsDetail()
    }, [])
    const getnewsDetail = () => {
        fetch('http://shadowplay.top:7000/news/xiang')
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    data.msg.map((item) => {
                        if (item.id == route.params.id) {
                            setnewsDetail(item)
                        }
                    })
                }
            })
    }
    return <ScrollView> 
        <Image source={{
            uri: newDetail.img,
        }} alt="2" style={{ width: "100%", height: 200 }} />
        <Box bg="white" m="2" borderRadius="20">
        <Text mt="2" color="#99CC66" textAlign="center" fontSize="20" bold>{newDetail.name}</Text>
        <Text mt="2" fontSize="16" px="4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{newDetail.title}</Text>
        </Box>
    </ScrollView>
}

export default NewsDetail