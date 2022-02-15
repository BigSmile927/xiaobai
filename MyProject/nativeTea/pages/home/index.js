import React, { useState, useEffect } from "react";
import { ImageBackground, Image } from "react-native";
import { Box, Text, Pressable, Center, ScrollView } from 'native-base'
import Swiper from 'react-native-swiper'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  box: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    marginLeft: 12
  },
  box1: {
    width: '100%',
    marginTop: 20
  },
  box2: {
    padding: 20
  },
  box3: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20
  },
  box4: {
    // paddingBottom:30
  }

})

function Home({ navigation, dispatch }) {
  const [goods, setGoods] = useState([])
  useEffect(() => {
    getuser()
  }, [])
  const getuser = () => {
    fetch('http://shadowplay.top:7000/user/userinfo')
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'user/save',
          payload: data
        })
      })
  }

  useEffect(() => {
    const url = `http://shadowplay.top:7000/product/list`
    getlist(url)
  }, [])

  const getlist = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let list = data.msg.slice(7)
        setGoods([...list]);
      })
  }


  const cards = [
    {
      text: 'card-one',
      name: 'one',
      image: { uri: "http://shadowplay.top:7000/slideimg1.webp" }
    },
    {
      text: 'card-two',
      name: 'two',
      image: { uri: "http://shadowplay.top:7000/slideimg2.webp" }
    }
  ]

  return <ScrollView style={styles.box4}>
    <Box w="100%" h="200">
      <Swiper loop={true} autoplay={true} autoplayTimeout={4}>
        {cards.map(item => <Box key={item.text}>
          <Image alt="1" style={{ width: 375, height: 200 }} source={item.image} />
        </Box>)}
      </Swiper>
    </Box>
    <Box bg="white" pt="2">
      <Center
        _text={{
          color: "black",
          fontWeight: "bold",
          fontSize: "20px"
        }}
        height={30}
        width={{
          base: 375,
          lg: 400,
        }}
      >
        新茶上市
      </Center>
      <Center
        _text={{
          color: "black",
          fontWeight: "normal",
        }}
        height={10}
        width={{
          base: 375,
          lg: 400,
        }}
      >
        Tea Leave
      </Center>
    </Box>

    <Box flexDirection="row" flexWrap="wrap" mt="10px">

      {goods.map(item => <Box key={item._id} >
        {/* <Image alt="1" w="100%" h="200" source={{uri:item.src}}/> */}
        <Pressable onPress={() => {
          navigation.navigate("Detail", { id: item._id })
        }}>
          <Box style={styles.box}>
            <Image alt="1" source={{ uri: item.src }} style={{ width: 100, height: 100 }}></Image>
            <Text>{item.name}</Text>
          </Box>
        </Pressable>
      </Box>)}

    </Box>


    <Box w="100%" h="560" >
      <Box style={styles.box1}>
        <ImageBackground source={{ uri: "http://shadowplay.top:7000/bgimg.webp" }} style={{ height: 560 }}>
          <Center
            _text={{
              color: "white",
              fontWeight: "bold",
              fontSize: "25px"
            }}
            height={20}
            width={{
              base: 375,
              lg: 400,
            }}
          >
            茶叶文化
          </Center>
          <Center
            _text={{
              color: "white",
              fontWeight: "normal",
              fontSize: "16px"
            }}
            height={5}
            width={{
              base: 375,
              lg: 400,
            }}
          >
            about
          </Center>
          <Box style={styles.box2}>
            <Box style={styles.box3} bg="#ffffff">  <Image alt="1" source={{ uri: "http://shadowplay.top:7000/infoimg.webp" }} style={{ width: 300, height: 200 }}></Image>
              <Text>
                茶叶源于中国，茶叶最早是被作为祭品使用的。但从春秋后期就被人们作为菜食，在西汉中期发展为药用，西汉后期才发展为宫廷高级饮料，普及民间作为普通饮料那是西晋以后的事。发现最早人工种植茶叶的遗迹在浙江余姚的田螺山遗址，已有6000多年的历史。饮茶始于中国。</Text>
            </Box>
          </Box>

        </ImageBackground>
      </Box>

    </Box>
  </ScrollView>
}

export default connect((state) => ({ user: state.user }))(Home);


