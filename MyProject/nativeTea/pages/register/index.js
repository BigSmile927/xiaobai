import React, { useState } from "react";
import { Image} from "react-native";
import { useToast, Box, VStack, Icon, Button, FormControl, View,Center, NativeBaseProvider, Input, Checkbox } from "native-base"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import md5 from "react-native-md5";

const Register = (props) => {
    const [formData, setData] = useState({});
    const [nameerrors, setNerrors] = useState({});
    const [passerrors, setPerrors] = useState({});
    const [emailerrors, setMerrors] = useState({});
    const [confirmerrors, setCerrors] = useState({});
    const [coderrors, setCoderrors] = useState({});
    const [show, setShow] = useState(false)
    const [cshow, setcShow] = useState(false)
    const [count, setCount] = useState({});
    const toast = useToast()

    const userRegister = () => {
        if (validate()) {
            fetch("http://shadowplay.top:7000/user/signup", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.name,
                    email: formData.email,
                    password: md5.b64_md5(formData.password),
                    code: formData.code
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 0) {
                        toast.show({
                            title: "注册成功",
                            status: "success",
                            description: "恭喜您成为Rang会员.",
                        })
                        setData(() => ({}))
                        setTimeout(() => {
                            toast.closeAll()
                            props.navigation.navigate('Login')
                        }, 1000)
                    } else if (data.code === -1) {
                        toast.show({
                            title: "登陆失败",
                            status: "error",
                            description: data.message,
                        })
                        setTimeout(() => {
                            toast.closeAll()
                        }, 1000)
                    }
                })
        };
    }

    const getcode = () => {
        setMerrors({})
        if (formData.email === undefined) {
            setMerrors({ email: '邮箱不能为空' });
            return false
        } else {
            const mailt = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!mailt.test(formData.email)) {
                setMerrors({ email: '请输入正确邮箱格式' });
                return false
            }
        }
        setCount({ num: 10 })
        const timer = setInterval(() => {
            setCount((count) => {
                if (count.num == 1) {
                    clearInterval(timer);
                }
                return ({ num: count.num - 1 })
            })
        }, 1000);
        fetch('http://shadowplay.top:7000/user/email', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formData.email })
        })
            .then(res => res.json())
            .then(data => {
                toast.show({
                    title: "验证码发送成功",
                    status: "success",
                    description: "请到邮箱查看.",
                })
            })
    }

    const validate = () => {
        setNerrors({})
        setPerrors({})
        setCerrors({})
        setMerrors({})
        setCoderrors({})
        if (formData.name === undefined) {
            setNerrors({ name: '用户名不能为空' });
            return false
        } else if (formData.name.length < 3) {
            setNerrors({ name: '用户名少于3位' });
            return false
        }

        if (formData.email === undefined) {
            setMerrors({ email: '邮箱不能为空' });
            return false
        } else {
            const mailt = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!mailt.test(formData.email)) {
                setMerrors({ email: '请输入正确邮箱格式' });
                return false
            }
        }

        if (formData.password === undefined) {
            setPerrors({ password: '密码不能为空' });
            return false
        } else {
            const empty = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
            if (!empty.test(formData.password)) {
                setPerrors({ password: '密码为6到12位数字和字母' });
                return false
            }
        }

        if (formData.confirm === undefined) {
            setCerrors({ confirm: '确认密码不能为空' });
            return false
        } else if (formData.confirm != formData.password) {
            setCerrors({ confirm: '两次输入不相同' });
            return false
        }
        if (formData.code === undefined) {
            setCoderrors({ code: '验证码不能为空' });
            return false
        }
        return true;
    };
    return <NativeBaseProvider>
        <Center flex={1} px="3">
            <VStack width="90%" mx="3">
                <View mx="auto">
                    <Image
                        source={{
                            uri: "http://shadowplay.top/Logo.jpg"
                        }}
                        alt="tea"
                        style={{
                            width: 118,
                            height: 75,
                        }} />
                </View>
                <FormControl isRequired isInvalid={'name' in nameerrors}>
                    <Input
                        placeholder="用户名"
                        borderColor="#dbdbdb"
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="person" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        onChangeText={(value) => setData({ ...formData, name: value })}
                    />
                    {'name' in nameerrors ?
                        <FormControl.ErrorMessage mt="0" mb="1" _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{nameerrors.name}</FormControl.ErrorMessage>
                        :

                        <FormControl.HelperText mt="0" mb="1" _text={{ fontSize: 'xs' }}>
                            用户名至少3位.
                        </FormControl.HelperText>
                    }
                </FormControl>
                <FormControl isRequired isInvalid={'email' in emailerrors}>
                    <Input
                        placeholder="邮箱"
                        borderColor="#dbdbdb"
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="person" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        onChangeText={(value) => setData({ ...formData, email: value })}
                    />
                    {'email' in emailerrors ?
                        <FormControl.ErrorMessage mt="0" mb="1" _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{emailerrors.email}</FormControl.ErrorMessage>
                        :

                        <FormControl.HelperText mt="0" mb="1" _text={{ fontSize: 'xs' }}>
                            请填写邮箱.
                        </FormControl.HelperText>
                    }
                </FormControl>
                <FormControl isRequired isInvalid={'password' in passerrors}>
                    <Input
                        placeholder="密码"
                        borderColor="#dbdbdb"
                        type={show ? "text" : "password"}
                        InputRightElement={
                            <Icon
                                as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                                size={5}
                                mr="2"
                                color="muted.400"
                                onPress={() => setShow(!show)}
                            />
                        }
                        onChangeText={(value) => setData({ ...formData, password: value })}
                    />
                    {'password' in passerrors ?
                        <FormControl.ErrorMessage mt="0" mb="1" _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{passerrors.password}</FormControl.ErrorMessage>
                        :

                        <FormControl.HelperText mt="0" mb="1" _text={{ fontSize: 'xs' }}>
                            密码至少有6位，最多不超过12位.
                        </FormControl.HelperText>
                    }
                </FormControl>
                <FormControl isRequired isInvalid={'confirm' in confirmerrors}>
                    <Input
                        placeholder="请再输一次密码"
                        borderColor="#dbdbdb"
                        type={cshow ? "text" : "password"}
                        InputRightElement={
                            <Icon
                                as={<MaterialIcons name={cshow ? "visibility" : "visibility-off"} />}
                                size={5}
                                mr="2"
                                color="muted.400"
                                onPress={() => setcShow(!cshow)}
                            />
                        }
                        onChangeText={(value) => setData({ ...formData, confirm: value })}
                    />
                    {'confirm' in confirmerrors ?
                        <FormControl.ErrorMessage mt="0" mb="1" _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{confirmerrors.confirm}</FormControl.ErrorMessage>
                        :

                        <FormControl.HelperText mt="0" mb="1" _text={{ fontSize: 'xs' }} >
                            密码至少有6位，最多不超过12位.
                        </FormControl.HelperText>
                    }
                </FormControl>
                <FormControl isRequired isInvalid={'code' in coderrors}>
                    <Box style={{ display: "flex", flexDirection: 'row' }} >
                        <Input
                            placeholder="验证码"
                            w="50%"
                            borderColor="#dbdbdb"
                            onChangeText={(value) => setData({ ...formData, code: value })}
                        />
                        <Button ml="1" w="35%" onPress={() => getcode()} disabled={count.num ? true : false} bgColor={count.num ? "#757679" : "#519f10"}>
                            {`${count.num ? count.num : '获取验证码'}`}
                        </Button>
                    </Box>
                    {'code' in coderrors ?
                        <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{coderrors.code}</FormControl.ErrorMessage>
                        :

                        <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                            请输入验证码.
                        </FormControl.HelperText>
                    }
                </FormControl>
                <Checkbox
                    value="remember"
                    isDisabled
                    defaultIsChecked
                    size="sm"
                >我同意《用户手册》和《保密条框》</Checkbox>
                <View>
                    <Button onPress={userRegister} bgColor="#519f10">马上注册</Button>
                </View>
                <Button mt="3" onPress={() => props.navigation.navigate('Login')} bgColor="#fff"
                    _text={{
                        color: '#000'
                    }}>登录</Button>
            </VStack>
        </Center>
    </NativeBaseProvider>
};
export default Register;