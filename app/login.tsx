import {Box} from "@/components/ui/box";
import {ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store'
import {useRouter} from "expo-router";
import {HStack} from "@/components/ui/hstack";
import {Image} from "@/components/ui/image";
import {Button, ButtonText} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {Header} from "@/components/Header";
import {Password} from "@/components/Password";
import {Text} from "@/components/ui/text";
import {Email} from "@/components/Email";
import {Toast, ToastDescription, ToastTitle, useToast} from "@/components/ui/toast";

export default function login(){
    // console.log('hogeeeeee')
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const isInvalid = password.length < 4 && isSubmit;
    const isInvalidEmail = !email && isSubmit;
    const toast = useToast()
    const [toastId, setToastId] = useState(0)
    const handleToast = () => {
        if (!toast.isActive(String(toastId))) {
            showNewToast()
        }
    }
    useEffect(() => {
        (async ()=>{
            const token = await SecureStore.getItemAsync('sessionToken')
            if(token){
                // const getAuth = await fetch("https://kajikashi.onrender.com/api/auth/me",{
                const getAuth = await fetch('http://192.168.0.12:8080/api/auth/me',{
                    headers:{'Authorization': `Bearer ${token}`},
                    method: "GET"
                })
                if(getAuth.ok){
                    router.push('/home')
                }
            }
        })()
    }, []);

    const handleLogin= async ()=>{
        setIsSubmit(true);
        if(password.length >= 4 && email){
            console.log('ログイン処理')
            // const res = await fetch('https://kajikashi.onrender.com/api/auth/login',{
            const res = await fetch('http://192.168.0.12:8080/api/auth/login',{
                method: "POST",
                credentials: "include",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({email,password})
            })
            if(res.ok){
                const resData = await res.json()
                await SecureStore.setItemAsync('sessionToken',resData.token)
                router.push('/home')
            }else{
                handleToast()
            }
        }
    }
    const showNewToast = () => {
        const newId = Math.random()
        setToastId(newId)
        toast.show({
            id: String(newId),
            placement: "top",
            duration: 3000,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id
                return (
                    <Toast nativeID={uniqueToastId} action="error" variant="outline">
                        <ToastTitle>Error!</ToastTitle>
                        <ToastDescription>
                            ログインに失敗しました。メールアドレス、パスワードを見直してみてください。
                        </ToastDescription>
                    </Toast>
                )
            },
        })
    }
    return (
        <Box className="flex-1" style={{backgroundColor: '#F5F5F5'}}>
            <ScrollView
                style={{ height: "100%" }}
                contentContainerStyle={{ flexGrow: 1,justifyContent: 'center', alignItems: 'center' }}
            >
                <Box className="flex flex-1  mx-5 lg:my-24 lg:mx-32">
                    <Header />
                    {/*<Box className="flex-1 justify-center items-center w-[300px]">*/}
                        <VStack className='gap-10 w-[300px] justify-center items-center'>
                            <Text className='font-bold text-3xl' style={{color: '#333333'}}>ログイン</Text>
                            <Email value={email} onChangeValue={setEmail} isInvalid={isInvalidEmail} />
                            <Password
                                value={password}
                                onChangeValue={setPassword}
                                isInvalid={isInvalid}
                            />

                            <Button className="w-[250px] h-[48px] rounded-full" style={{backgroundColor:'#4CAF50'}} onPress={handleLogin}>
                                <ButtonText className="text-xl font-bold" style={{color:'#333333'}}>LOGIN</ButtonText>
                            </Button>
                            <Button className="w-[250px] h-[48px] rounded-full" variant='outline' style={{borderColor:'#4CAF50',backgroundColor:'#F5F5F5'}} onPress={() => router.push('/register')}>
                                <ButtonText className="text-xl font-bold" style={{color:'#333333'}}>新規登録</ButtonText>
                            </Button>
                        </VStack>
                    {/*</Box>*/}
                </Box>
            </ScrollView>
        </Box>
    );
}