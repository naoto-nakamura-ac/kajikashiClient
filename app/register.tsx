import {Box} from "@/components/ui/box";
import {Platform} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context'
import React, {useCallback, useState} from "react";
import * as SecureStore from 'expo-secure-store'
import {useFocusEffect, useRouter} from "expo-router";
import {Button, ButtonText} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {Header} from "@/components/Header";
import {Password} from "@/components/Password";
import {Text} from "@/components/ui/text";
import {Email} from "@/components/Email";
import {NameInput} from "@/components/NameInput";
import {
    useToast,
    Toast,
    ToastTitle,
    ToastDescription,
} from "@/components/ui/toast"
import {FamilyCodeInput} from "@/components/FamilyCodeInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function login(){
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [familyCode, setFamilyCode] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const isInvalid = password.length < 4 && isSubmit;
    const isInvalidEmail = !email && isSubmit && !name;
    const isInvalidName = !name && isSubmit;

    const toast = useToast()
    const [toastId, setToastId] = useState(0)
    const handleToast = () => {
        if (!toast.isActive(String(toastId))) {
            showNewToast()
        }
    }
    useFocusEffect(
        useCallback(() => {
            (async ()=>{
                const token = await SecureStore.getItemAsync('sessionToken')
                console.log('token:',token)
                if(token){
                    const getAuth = await fetch("https://kajikashi.onrender.com/api/auth/me",{
                    // const getAuth = await fetch('http://192.168.0.12:8080/api/auth/me',{
                        headers:{'Authorization': `Bearer ${token}`},
                        method: "GET"
                    })

                    if(getAuth.ok){
                        router.push('/tabs/(tabs)/home')
                    }
                }
            })()
        }, [])
    )

    const handleRegister= async ()=>{
        setIsSubmit(true);
        if(password.length >= 4 && email && name){
            console.log('登録処理')
            let reqfamilyCode;
            if(!familyCode){
                reqfamilyCode="null"
            }else{
                reqfamilyCode = familyCode
            }
            console.log(JSON.stringify({name,email,password,familyCode:reqfamilyCode}))
            const res = await fetch('https://kajikashi.onrender.com/api/auth/register',{
            // const res = await fetch('http://192.168.0.12:8080/api/auth/register',{
                method: "POST",
                credentials: "include",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({name,email,password,familyCode:reqfamilyCode})
            })
            // console.log(res)
            if(res.ok){
                const resData = await res.json()
                console.log(resData)
                await SecureStore.setItemAsync('sessionToken',resData.token)
                router.push('/tabs/(tabs)/home')
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
                            登録に失敗しました。メールアドレス、家族コードを見直してみてください。
                        </ToastDescription>
                    </Toast>
                )
            },
        })
    }
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={Platform.OS === 'ios' ? 20 : 100}
            extraHeight={Platform.OS === 'ios' ? 20 : 100}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
                <Box className="flex-1" style={{backgroundColor: '#F5F5F5'}}>
                    <Box className="flex flex-1  mx-5 lg:my-24 lg:mx-32">
                        <Header />
                        <VStack className='gap-5 w-[300px] justify-center items-center'>
                            <Text className='font-bold text-3xl' style={{color: '#333333'}}>新規登録</Text>
                            <NameInput value={name} onChangeValue={setName} isInvalid={isInvalidName} />
                            <Email value={email} onChangeValue={setEmail} isInvalid={isInvalidEmail} />
                            <Password
                                value={password}
                                onChangeValue={setPassword}
                                isInvalid={isInvalid}
                            />
                            <FamilyCodeInput value={familyCode} onChangeValue={setFamilyCode}/>
                            <Button className="w-[250px] h-[48px] rounded-full" style={{backgroundColor:'#4CAF50'}} onPress={handleRegister}>
                                <ButtonText className="text-xl font-bold" style={{color:'#333333'}}>新規登録</ButtonText>
                            </Button>
                        </VStack>
                    </Box>
                </Box>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}