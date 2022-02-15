import React, { useState, useEffect } from "react";
import { Image, Text } from "react-native";
import { useToast, VStack, FormControl, Icon, Box, Button, View, Center, NativeBaseProvider, Input, Checkbox } from "native-base"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { WebView } from 'react-native-webview';
import md5 from "react-native-md5";
import { connect } from 'react-redux';

const LoginContent = (props) => {
    useEffect(() => {
        getcode()
    }, [])
    const toast = useToast()
    const [formData, setData] = useState({});
    const [nameerrors, setNerrors] = useState({});
    const [passerrors, setPerrors] = useState({});
    const [codeerrors, setCerrors] = useState({});
    const [show, setShow] = useState(false)
    const [yanzm, setyanzm] = useState('');
    let [loading, setLoading] = useState(false)

    const getuser = () => {
        fetch('http://shadowplay.top:7000/user/userinfo')
            .then(res => res.json())
            .then(data => {
                props.dispatch({
                    type: 'user/save',
                    payload: data
                })
                props.navigation.navigate('Me')
            })
    }
    const userLogin = () => {
        if (validate()) {
            setLoading(true)
            fetch("http://shadowplay.top:7000/user/signin", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.name,
                    password: md5.b64_md5(formData.password),
                    code: formData.code
                })
            })
                .then(res => res.json())
                .then(data => {
                    setLoading(false)
                    if (data.code === 0) {
                        setData(()=>({}))
                        getuser()
                    } else if (data.code === 1) {
                        toast.show({
                            title: "登陆失败",
                            status: "error",
                            description: "请检查用户名和密码.",
                        })
                        setTimeout(() => {
                            toast.closeAll()
                        }, 1000)
                    } else if (data.code === -1) {
                        toast.show({
                            title: "登陆失败",
                            status: "info",
                            description: "验证码错误.",
                        })
                        setTimeout(() => {
                            toast.closeAll()
                        }, 1000)
                    }
                })
        };
    }
    const getcode = () => {
        fetch('http://shadowplay.top:7000/user/getcode', {
            method: "POST",
            headers: {
                Accept: 'image/svg+xml',
                'Content-Type': 'image/svg+xml'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    setyanzm(data.message)
                }
            })

    }

    const validate = () => {
        setNerrors({})
        setPerrors({})
        setCerrors({})
        if (formData.name === undefined) {
            setNerrors({ name: '用户名不能为空' });
            return false
        }

        if (formData.password === undefined) {
            setPerrors({ password: '密码不能为空' });
            return false
        } else {
            const empty = /^[0-9a-zA-Z_]{6,12}$/;
            if (!empty.test(formData.password)) {
                setPerrors({ password: '密码为8到16位数字和字母' });
                return false
            }
        }

        if (formData.code === undefined) {
            setCerrors({ code: '验证码不能为空' });
            return false
        }
        return true;
    };
    const firstHtml = '<html><head><style>html, body { margin:0; padding:0; overflow:hidden } svg { position:fixed; top:0; left:0; height:100%; width:100% }</style></head><body>'
    const lastHtml = '</body></html>'
    return <VStack width="90%" mx="3">
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
            <FormControl.Label _text={{ bold: true }}>用户名</FormControl.Label>
            <Input
                placeholder="用户名"
                borderColor="#dbdbdb"
                value={formData.name}
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
                <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{nameerrors.name}</FormControl.ErrorMessage>
                :

                <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                    用户名至少3位.
                </FormControl.HelperText>
            }
        </FormControl>
        <FormControl isRequired isInvalid={'password' in passerrors}>
            <FormControl.Label _text={{ bold: true }}>密码</FormControl.Label>
            <Input
                placeholder="密码"
                borderColor="#dbdbdb"
                value={formData.password}
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
                <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{passerrors.password}</FormControl.ErrorMessage>
                :

                <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                    密码至少有6位，最多不超过12位.
                </FormControl.HelperText>
            }
        </FormControl>
        <FormControl isRequired isInvalid={'code' in codeerrors}>
            <FormControl.Label _text={{ bold: true }}>验证码</FormControl.Label>
            <Box style={{ display: "flex", flexDirection: 'row' }} >
                <Input
                    placeholder="验证码"
                    w="50%"
                    value={formData.code}
                    borderColor="#dbdbdb"
                    onChangeText={(value) => setData({ ...formData, code: value })}
                />
                <Text onPress={() => getcode()}>
                    <WebView
                        style={[{ width: 100, height: 50, backgroundColor: props.backgroundColor }]}
                        scrollEnabled={false}
                        source={{ html: `${firstHtml}${yanzm}${lastHtml}` }}
                    />
                </Text>
            </Box>
            {'code' in codeerrors ?
                <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{codeerrors.code}</FormControl.ErrorMessage>
                :

                <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                    请输入验证码.
                </FormControl.HelperText>
            }
        </FormControl>
        <Checkbox
            value="remember"
            size="sm"
            isDisabled
            defaultIsChecked
        >记住我 (请在私人设备上使用此功能)</Checkbox>
        <View mt="10">
            <Button onPress={userLogin} bgColor="#519f10" isLoading={loading}>登录</Button>
        </View>
        <View mt="3">
            <Button onPress={() => props.navigation.navigate('Register')} bgColor="#fff"
                _text={{
                    color: '#000'
                }}>注册</Button>
        </View>
    </VStack>
}

const Login = (props) => {
    return <NativeBaseProvider>
        <Center flex={1} px="3">
            <LoginContent {...props} />
        </Center>
    </NativeBaseProvider>
}

export default connect((state) => ({ user: state.user }))(Login);