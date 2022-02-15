import React, { useEffect, useState } from "react";
import { Image, Linking, TextInput } from "react-native";
import { Select, ScrollView, VStack, CheckIcon, Box, Text, Button, AlertDialog, Center } from 'native-base'
import { connect } from 'react-redux';

const DingDan = ({ user, navigation }) => {
  let [shop, changeshop] = useState([])
  let [username, changeusername] = useState("")
  let [phone, changephone] = useState("")
  let [adress, changeadress] = useState("")
  let [beizhu, changebeizhu] = useState("")
  let [allsum, changeallsum] = useState("")
  let [loading, setLoading] = useState(false)
  let [loading2, setLoading2] = useState(false)
  const [pd, setPd] = useState(false)
  const change = (e) => {
    setList(e)
    changeusername(e.name)
    changephone(e.phone)
    changeadress(e.adress)
    setPd(true)

  }
  const [list, setList] = useState({
    _v: 0,
    _id: '',
    adress: '',
    adressname: '',
    name: '',
    phone: '',
    username: ''
  })
  useEffect(() => {
    setLoading2(true)
    getCar();
    getAddress()
  }, [])
  const getCar = () => {
    fetch('http://shadowplay.top:7000/car/cars')
      .then(res => res.json())
      .then(data => {
        if (data.code === 0) {
          var sum = 0;
          for (i = 0; i < data.cardata.length; i++) {
            sum += data.cardata[i].price * data.cardata[i].num
            data.cardata[i].sum = data.cardata[i].price * data.cardata[i].num
          }
          changeshop(data.cardata)
          changeallsum(sum)
        }
      })
  }
  const getAddress = () => {
    fetch('http://shadowplay.top:7000/infos/adress')
      .then(res => res.json())
      .then(data => {
        if (data.code === 0) {
          setService(data.msg)
          setLoading2(false)
        }
      })
  }
  const nameChange = (text) => {
    changeusername(text)
    setList(Object.assign(list, { name: text }))
  }
  const phoneChange = (text) => {
    changephone(text)
    setList(Object.assign(list, { phone: text }))
  }
  const adressChange = (text) => {
    changeadress(text)
    setList(Object.assign(list, { adress: text }))
  }
  const beizhuChange = (text) => {
    changebeizhu(text)
  }

  let [adressname, setService] = useState([])
  //获取当前时间
  const timestampToTime = () => {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
    var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':';
    var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ':';
    var ss = date.getSeconds() < 10 ? '0' + date.getDate() : date.getSeconds();
    return Y + M + D + hh + mm + ss;
  }

  const open = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.warn('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', url));
  }

  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef(null)

  const submit = () => {
    if (shop.length) {
      setLoading(true)
      const a = {
        username: user.name,
        shop: {
          things: shop.length ? true : false,
          allsum: allsum,
          shop: shop
        },
        info: {
          name: list.name,
          phone: list.phone,
          address: adress,
          remark: beizhu,
          newtime: timestampToTime(),
          email: user.email
        }
      }
      fetch('http://shadowplay.top:7000/car/buy', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(a)
      })
        .then(res => res.json())
        .then(data => {
          if (data.code === 0) {
            fetch('http://shadowplay.top:7000/car/deleteCar', {
              method: "POST",
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            })
              .then(res => res.json())
              .then(msg => {
                if (msg.code === 0) {
                  getCar()
                  setIsOpen(!isOpen)
                  setLoading(false)
                  open(data.message)
                }
              })
          }
        })
    }
  }

  return <ScrollView h="100%" px="8" keyboardShouldPersistTaps="handled">
    <Text style={{ fontSize: 20, height: 35, color: '#333' }} mt="5">账单地址</Text>
    <Box _text={{ fontSize: 10, color: '#444', fontWeight: 'bold' }} w="100%">选择已保存的地址:</Box>
    <VStack alignItems="center" space={4}>
      <Select
        selectedValue={adressname}
        minWidth="172"
        accessibilityLabel="Choose Service"
        placeholder={pd ? list.adress : "请选择地址"}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => change(itemValue)}
      >
        {adressname.map((item, index) => { return <Select.Item key={index} label={item.adress} value={item} /> })}
      </Select>
    </VStack>
    <Box flexDirection="row" my="2">
      <Text onPress={() => { onClose(); navigation.navigate('Address') }} style={{ color: '#9EC14D' }} flex={1}>新增地址</Text>
      <Button onPress={() => { setLoading2(true); getAddress() }} w="130" p="0" bgColor="#66cc66" _text={{ color: "white" }} isLoading={loading2} spinnerPlacement="end" >点击刷新地址</Button>
    </Box>
    <Box style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Text style={{ marginRight: 130 }}>姓名*</Text>
      <Text style={{ marginRight: 100 }}>电话*</Text>
    </Box>
    <Box style={{ flexDirection: 'row' }}>
      <TextInput
        style={{ height: 40, borderColor: '#02ACBE', borderWidth: 1, width: 134, color: '#333', marginLeft: 1 }}
        onChangeText={text => nameChange(text)}
        value={username}
      />
      <TextInput
        style={{ height: 40, borderColor: '#02ACBE', borderWidth: 1, width: 134, marginLeft: 30, color: '#333' }}
        onChangeText={text => phoneChange(text)}
        value={phone}
      />
    </Box>
    <Text style={{ marginTop: 10 }}>地址*</Text>
    <TextInput
      style={{ height: 40, borderColor: '#02ACBE', borderWidth: 1, width: 298, color: '#333', marginLeft: 1 }}
      onChangeText={text => adressChange(text)}
      value={adress}
    />
    <Text style={{ fontSize: 20, height: 35, color: '#333', marginTop: 10 }}>其他信息</Text>
    <Text style={{}}>订单备注</Text>
    <TextInput
      numberOfLines={4}
      style={{ height: 80, borderColor: '#02ACBE', borderWidth: 1, width: 298, color: '#333', marginLeft: 1 }}
      onChangeText={text => beizhuChange(text)}
    />
    <Text style={{ fontSize: 20, height: 35, color: '#333', marginTop: 10 }}>订单详情</Text>
    <Box style={{ flexDirection: 'row', color: 'black' }}>
      <Text style={{ marginRight: 242 }}>商品</Text>
      <Text>合计</Text>
    </Box>
    <Box style={{ width: 300, height: 5, backgroundColor: '#ccc' }}></Box>
    {shop.map((item, index) => {
      return <Box key={index} display="flex" h="50" flexDirection='row'>
        <Image style={{ height: 50, width: 50 }} source={{
          uri: item.src
        }}></Image>
        <Text color="#9EC14D" mt="15" w="100" textAlign="center">{item.name}</Text>
        <Text mt="15" flex={1} textAlign="center">¥{item.price}X{item.num}</Text>
        <Text mt="15" w="50" textAlign="center">¥{item.price * item.num}</Text>
      </Box>
    })}
    <Box display="flex" flexDirection='row'>
      <Text flex={1}>购物车小计</Text>
      <Text w="45" >¥{allsum}</Text>
    </Box>
    <Box display="flex" flexDirection='row'>
      <Text flex={1}>运费</Text>
      <Text w="63">免费送货</Text>
    </Box>
    <Box display="flex" flexDirection='row'>
      <Text flex={1}>订单总计</Text>
      <Text w="45">¥{allsum}</Text>
    </Box>
    <Button bgColor="#519F10" onPress={submit} mb="5" mt="5" isLoading={loading}>下单</Button>
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>订单支付中...</AlertDialog.Header>
          <AlertDialog.Body>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请在浏览器中支付完毕后去订单页面查看。
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="success" onPress={() => { onClose(); navigation.navigate('Me') }}>
                查看订单
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  </ScrollView>
}

export default connect((state) => ({ user: state.user }))(DingDan);