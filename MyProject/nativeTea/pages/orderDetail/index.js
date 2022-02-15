import React from "react";
import { NativeBaseProvider,Box, Text, HStack, VStack } from "native-base"

const OrderDetail = ({route}) => {

    return <NativeBaseProvider>
            <Box w="100%" borderWidth="1" borderColor="#ddd">
                <HStack px="1" borderWidth="1" borderColor="#ddd" h="10" w="100%" _text={{ color: "#5e5e5e" }}>
                    <Text w='70%' style={{ textAlignVertical: 'center' }}>
                        订单:{route.params.msg._id}
                    </Text>
                    <Text w='30%' textAlign="right" style={{ textAlignVertical: 'center' }}>
                        状态:{route.params.msg.state}
                    </Text>
                </HStack>
                <HStack px="1" borderWidth="1" borderColor="#ddd" h="10" w="100%" _text={{ color: "#5e5e5e" }}>
                    <Text w='50%' style={{ textAlignVertical: 'center' }}>
                        商品
                    </Text>
                    <Text w='50%' textAlign="right" style={{ textAlignVertical: 'center' }}>
                        合计
                    </Text>
                </HStack>
                {route.params.msg.shop.shop.map((item, index) => {
                    return <HStack px="1" key={index} borderWidth="1" borderColor="#ddd" h="10" w="100%" _text={{ color: "#5e5e5e" }}>
                        <Text w='50%' style={{ textAlignVertical: 'center' }}>
                            {item.name} ✖ {item.num}
                        </Text>
                        <Text w='50%' textAlign="right" style={{ textAlignVertical: 'center' }}>
                            {item.sum}
                        </Text>
                    </HStack>
                })}
                <HStack px="1" borderWidth="1" borderColor="#ddd" h="10" w="100%" _text={{ color: "#5e5e5e" }}>
                    <Text w='50%' style={{ textAlignVertical: 'center' }}>
                        购物小计:
                    </Text>
                    <Text w='50%' textAlign="right" style={{ textAlignVertical: 'center' }}>
                        ￥{route.params.msg.shop.allsum}
                    </Text>
                </HStack>
                <HStack px="1" borderWidth="1" borderColor="#ddd" h="10" w="100%" _text={{ color: "#5e5e5e" }}>
                    <Text w='50%' style={{ textAlignVertical: 'center' }}>
                        配送:
                    </Text>
                    <Text w='50%' textAlign="right" style={{ textAlignVertical: 'center' }}>
                        免费送货
                    </Text>
                </HStack>
                <HStack px="1" borderWidth="1" borderColor="#ddd" h="10" w="100%" _text={{ color: "#5e5e5e" }}>
                    <Text w='50%' style={{ textAlignVertical: 'center' }}>
                        订单合计:
                    </Text>
                    <Text w='50%' textAlign="right" style={{ textAlignVertical: 'center' }}>
                        ￥{route.params.msg.shop.allsum}
                    </Text>
                </HStack>
                <HStack px="1" borderWidth="1" borderColor="#ddd" h="10" w="100%" _text={{ color: "#5e5e5e" }}>
                    <Text style={{ textAlignVertical: 'center' }}>
                        客户详情
                    </Text>
                </HStack>
                <HStack px="1" borderWidth="1" borderColor="#ddd" h="10" w="100%" _text={{ color: "#5e5e5e" }}>
                    <Text w='50%' style={{ textAlignVertical: 'center' }}>
                        电子邮件:
                    </Text>
                    <Text w='50%' textAlign="right" style={{ textAlignVertical: 'center' }}>
                        {route.params.msg.info.email}
                    </Text>
                </HStack>
                <HStack px="1" borderWidth="1" borderColor="#ddd" h="10" w="100%" _text={{ color: "#5e5e5e" }}>
                    <Text w='50%' style={{ textAlignVertical: 'center' }}>
                        电话:
                    </Text>
                    <Text w='50%' textAlign="right" style={{ textAlignVertical: 'center' }}>
                        {route.params.msg.info.phone}
                    </Text>
                </HStack>
                <VStack px="1" borderWidth="1" borderColor="#ddd" h="100" w="100%" _text={{ color: "#5e5e5e" }}>
                    <Text style={{ textAlignVertical: 'center' }}>
                        账单地址:
                    </Text>
                    <Text style={{ textAlignVertical: 'center' }}>
                        {route.params.msg.info.address}
                    </Text>
                </VStack>
            </Box>
    </NativeBaseProvider>
}
export default OrderDetail