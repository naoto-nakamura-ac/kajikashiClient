import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {ScrollView, View} from "react-native";
import {Header} from "@/components/Header";
import React, {useEffect, useState} from "react";
import {VStack} from "@/components/ui/vstack";
import {Card} from "@/components/ui/card";
import * as SecureStore from "expo-secure-store";
import {useRouter} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Button, ButtonText} from "@/components/ui/button";

export default function Profile() {
    const router = useRouter()
    const [userInfo , setUserInfo] = useState<any>(null)
    const [familyInfo , setFamilyInfo] = useState<any>(null)
    useEffect(() => {
        (async ()=>{
            const token = await SecureStore.getItemAsync('sessionToken')
            if(token){
                const getAuth = await fetch("https://kajikashi.onrender.com/api/auth/me",{
                // const getAuth = await fetch('http://192.168.0.12:8080/api/auth/me',{
                    headers:{'Authorization': `Bearer ${token}`},
                    method: "GET"
                })
                if(!getAuth.ok){
                    router.push('/')
                }else{
                    const data = await getAuth.json()
                    setUserInfo(data)
                    const getFamily = await fetch(`https://kajikashi.onrender.com/api/family?familyID=${data.familyID}`,{
                    // const getFamily = await fetch(`http://192.168.0.12:8080/api/family?familyID=${data.familyID}`,{
                        headers:{'Authorization': `Bearer ${token}`},
                        method: "GET"
                    })
                    const familyData = await getFamily.json()
                    console.log(familyData)
                    setFamilyInfo(familyData)
                }
            }
        })()
    }, []);

    const handleLogout = async () =>{
        const token = await SecureStore.getItemAsync('sessionToken')
        const res = await fetch('https://kajikashi.onrender.com/api/auth/logout',{
        // const res = await fetch('http://192.168.0.12:8080/api/auth/logout',{
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        router.push('/login')
    }
    return (
        <View className="flex-1" style={{backgroundColor: '#F5F5F5'}}>
            <Header />
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 16 }}>
            <VStack className='justify-center items-center w-full'>
                <Text className='font-bold text-3xl' style={{color: '#333333'}}>アカウント</Text>
                <Card size='lg' variant='filled' className='m-3 bg-gray-300 w-5/6 gap-1'  >
                    <Heading size="lg" className="mb-1 text-2xl　text-center" style={{color: '#333333'}}>
                        あなたの情報
                    </Heading>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="user-circle" size={20} color="#333" style={{ marginRight: 8 }} />
                        <Text size="xl" className="text-2xl" style={{ color: '#333333' }}>
                            {userInfo?.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="envelope" size={20} color="#333" style={{ marginRight: 8 }} />
                        <Text size="xl" className="text-2xl" style={{ color: '#333333' }}>
                            {userInfo?.email}
                        </Text>
                    </View>
                </Card>

                <Card size='lg' variant='filled' className='m-3 bg-gray-300 w-5/6 gap-1'  >
                    <Heading size="lg" className="mb-1 text-2xl　text-center" style={{color: '#333333'}}>
                        家族の情報
                    </Heading>
                    <View style={{alignItems:'center'}}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 ,justifyContent:'center'}}>
                            {familyInfo?.map((item:any, index:any) => (
                                <View
                                    key={index}
                                    style={{
                                        width: '45%', // 2列表示（間隔含めて）
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 10,
                                    }}
                                >
                                    <FontAwesome name='user' size={20} color="#333" style={{ marginRight: 8 }} />
                                    <Text size="xl" className="text-2xl" style={{ color: '#333333' }}>
                                        {item.name}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                </Card>

                <Card size='lg' variant='filled' className='m-3 bg-gray-300 w-5/6 gap-1'  >
                    <Heading size="lg" className="mb-1 text-2xl　text-center" style={{color: '#333333'}}>
                        家族コード
                    </Heading>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="key" size={20} color="#333" style={{ marginRight: 8 }} />
                        <Text size="xl" className="text-2xl" style={{ color: '#333333' }}>
                            {userInfo?.familyCode}
                        </Text>
                    </View>
                </Card>

                <Button className="w-[250px] h-[48px] rounded-full" variant='outline' style={{backgroundColor:'#F5F5F5',borderStyle:'solid', borderColor:'#4CAF50'}} onPress={handleLogout}>
                    <ButtonText className="text-xl font-bold" style={{color:'#333333'}}>ログアウト</ButtonText>
                </Button>

            </VStack>
            </ScrollView>
        </View>
    );
}
