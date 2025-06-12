import React from "react";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import {Image} from "@/components/ui/image";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonText} from "@/components/ui/button";
import {useRouter} from "expo-router";
import * as SecureStore from 'expo-secure-store'
import {Header} from "@/components/Header";

export default function Home() {
    const router = useRouter()
    const handle = async () =>{
        const token = await SecureStore.getItemAsync('sessionToken')
        const res = await fetch('http://192.168.0.12:8080/api/auth/logout',{
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        // await SecureStore.deleteItemAsync('sessionToken')
        router.push('/login')
    }
    const handlenext=()=>{
        // @ts-ignore
        router.push('/tabs')
    }
    return (
        <Box className="flex-1 h-[100vh]" style={{backgroundColor: '#F5F5F5'}}>
            <ScrollView
                style={{ height: "100%" }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Header />

                <Button className="w-[160px] h-[48px] rounded-full" style={{backgroundColor:'#4CAF50'}} onPress={handle}>
                    <ButtonText className="text-xl font-bold" style={{color:'#333333'}}>back</ButtonText>
                </Button>

                <Button className="w-[160px] h-[48px] rounded-full" style={{backgroundColor:'#4CAF50'}} onPress={handlenext}>
                    <ButtonText className="text-xl font-bold" style={{color:'#333333'}}>next</ButtonText>
                </Button>
            </ScrollView>
        </Box>
    );
}
