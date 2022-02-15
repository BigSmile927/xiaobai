import React, { useEffect, useState } from "react";
import {
    Box,
    FlatList,
    Heading,
    HStack,
    VStack,
    Text,
    Button,
} from "native-base"


const Address = ({ navigation, route }) => {
    const [value, setValue] = useState([])
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getAddress()
    }, [route.params])
    const getAddress = () => {
        fetch('http://shadowplay.top:7000/infos/adress')
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    setValue([...data.msg])
                    setLoading(false)
                }
            })
    }
    const deleteAddress = (id) => {
        setLoading(true)
        fetch('http://shadowplay.top:7000/infos/delete', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    getAddress()
                }
            })
    }
    return <Box w={{ base: "100%", md: "25%", }} >
        <FlatList
            h="70%" w="90%" mx="auto"  mt="4"
            data={value}
            renderItem={({ item }) => (
                <Box
                mb="5"
                    pl="4"
                    pr="5"
                    py="4"
                    bg="white"
                    borderRadius="10"
                    mb="2"
                >
                    <HStack>
                        <VStack w="30%">
                            <Text
                                _dark={{
                                    color: "warmGray.50",
                                }}
                                color="coolGray.800"
                                bold
                            >
                                {item.name}
                            </Text>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                            >
                                {item.phone}
                            </Text>
                        </VStack>
                        <Text
                            w="50%"
                            mr="4"
                            fontSize="xs"
                            _dark={{
                                color: "warmGray.50",
                            }}
                            color="coolGray.800"
                            alignSelf="flex-start"
                        >
                            {item.adress}
                        </Text>
                        <Button onPress={() => { deleteAddress(item._id) }} bgColor="#66CC66">
                            删除
                        </Button>
                    </HStack>
                </Box>
            )}
            keyExtractor={(item) => item._id}
        />
        <Button onPress={() => navigation.navigate('AddAddress')} bgColor="blue.500" w="150" mx="auto" mt="10" mb="10" bgColor="#66CC66" isLoading={loading}>添加新地址</Button>
    </Box>
}



export default Address