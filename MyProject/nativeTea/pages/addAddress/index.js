import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

import {
    VStack,
    Button,
    FormControl,
    Input,
    Select,
    CheckIcon,
    useToast,
    Text
} from "native-base";


const AddAddress = ({ user, navigation }) => {
    const toast = useToast()
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [address, newaddress] = React.useState("");
    // const [Alladdress, setaddress] = React.useState({});
    let [loading, setLoading] = useState(false)
    let [citydata, changecity] = useState([]);
    let [provincedata, changecity2] = useState([]);
    let [countydata, changecity3] = useState([]);
    const [service, setService] = React.useState("");
    const [service2, setService2] = React.useState("");
    const [service3, setService3] = React.useState("");
    const LogData = (itemValue) => {
        setService(itemValue)
        for (var i = 0; i < citydata.length; i++) {
            if (itemValue == citydata[i].value) {
                changecity2(citydata[i].children)
            }
        }
    }
    const LogData2 = (itemValue) => {
        setService2(itemValue)
        for (var i = 0; i < provincedata.length; i++) {
            if (itemValue == provincedata[i].value) {
                changecity3(provincedata[i].children)
            }
        }
    }
    useEffect(() => {
        getCity(),
            setService()
    }, [])
    const getCity = () => {
        fetch('http://shadowplay.top:7000/product/citydata')
            .then(res => res.json())
            .then(data => {
                changecity(data)
            })
    }
    const validate = () => {
        if (formData.name === undefined) {
            setErrors({
                ...errors,
                name: 'Name is required',
            });
            return false;
        } else if (formData.name.length < 2) {
            setErrors({
                ...errors,
                name: 'Name is too short',
            });
            return false;
        }
        setErrors((errors) => {
            delete errors.name
            return {
                ...errors,
            }
        });
        return true;
    }
    const validate2 = () => {
        let re = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (re.test(formData.phone)) {
            setErrors((errors) => {
                delete errors.phone
                return {
                    ...errors,
                }
            });
            return true;
        } else {
            setErrors({
                ...errors,
                phone: 'phone is required',
            });
            return false
        }
    };
    const validate3 = () => {
        if (service === undefined) {
            setErrors({
                ...errors,
                service: 'service is required',
            })
            return false
        } else {
            setErrors((errors) => {
                delete errors.service
                return {
                    ...errors,
                }
            })
            return true;
        }
    }

    const onSubmit = () => {
        if (validate() && validate2() && validate3()) {
            setLoading(true)
            let a = {
                adress: service + service2 + service3 + address,
                name: formData.name,
                phone: formData.phone,
                username: user.name,
                adressname: 'xxx'
            }
            fetch('http://shadowplay.top:7000/infos/getadress', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    useradress: a
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 0) {
                        toast.show({
                            render: () => {
                                return (
                                    <Text bg="#66CC99" px="4" py="2" rounded="sm" mb={5} fontSize="25" color="white">
                                        添加地址成功!
                                    </Text>
                                )
                            },
                        })
                        setTimeout(() => {
                            setLoading(false)
                            toast.closeAll()
                            navigation.navigate('Address', { id: 1 })
                        }, 1000)
                    }
                })
        }
    };
    return <VStack width="90%" mx="auto" mt="4">
        <FormControl isRequired isInvalid={'name' in errors}>
            <FormControl.Label _text={{ bold: true }}>姓名</FormControl.Label>
            <Input
                placeholder="请输入您的姓名"
                onChangeText={(value) => setData({ ...formData, name: value })}
            />
            {'name' in errors ?
                <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>至少输入两个字符</FormControl.ErrorMessage>
                :
                <FormControl.HelperText _text={{ fontSize: 'xs' }}>

                </FormControl.HelperText>
            }
        </FormControl>
        <FormControl isRequired isInvalid={'phone' in errors}>
            <FormControl.Label _text={{ bold: true }}>手机号码</FormControl.Label>
            <Input
                placeholder="请输入您的电话号码"
                onChangeText={(value) => setData({ ...formData, phone: value })}
            />
            {'phone' in errors ?
                <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>请重新输入正确数据</FormControl.ErrorMessage>
                :
                <FormControl.HelperText _text={{ fontSize: 'xs' }}>

                </FormControl.HelperText>
            }
        </FormControl>
        <FormControl isRequired isInvalid={'service' in errors}>
            <FormControl.Label _text={{ bold: true }}>选择地址</FormControl.Label>
            <Select
                selectedValue={service}
                minWidth="80"
                accessibilityLabel="Choose Service"
                placeholder="请选择您的省份"
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => LogData(itemValue)}

            >
                {citydata.map((item, index) => { return <Select.Item key={index} label={item.value} value={item.value} /> })}
            </Select>
            <Select
                selectedValue={service2}
                minWidth="80"
                accessibilityLabel="Choose Service"
                placeholder="请选择您的城市"
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => LogData2(itemValue)}
            >
                {provincedata.map((item, index) => { return <Select.Item label={item.value} value={item.value} key={index} /> })}
            </Select>
            <Select
                selectedValue={service3}
                minWidth="80"
                accessibilityLabel="Choose Service"
                placeholder="请选择您的县(区)"
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setService3(itemValue)}
            >
                {countydata.map((item, index) => { return <Select.Item key={index} label={item.value} value={item.value} /> })}
            </Select>
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{ bold: true }}>详细地址</FormControl.Label>
            <Input
                placeholder="请输入详细地址(街道等)"
                onChangeText={(value) => newaddress(value)}
            />
        </FormControl>
        <Button onPress={onSubmit} mt="5" colorScheme="cyan" bgColor="#66CC66" isLoading={loading}>
            确认提交
        </Button>
    </VStack>

}

export default connect((state) => ({ user: state.user }))(AddAddress);