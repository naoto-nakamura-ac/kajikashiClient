import EditScreenInfo from "@/components/EditScreenInfo";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {ScrollView, View} from "react-native";
import {Header} from "@/components/Header";
import React, {useCallback, useState} from "react";
import {VStack} from "@/components/ui/vstack";
import {FormControl, FormControlLabel, FormControlLabelText} from "@/components/ui/form-control";
import {Picker} from "@react-native-picker/picker";
import {Button, ButtonText} from "@/components/ui/button";
import {useFocusEffect, useRouter} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {getWeekRange} from "@/components/utils/getWeekRange";
import {format} from "date-fns";
import { toZonedTime} from 'date-fns-tz';
import { ja } from 'date-fns/locale';

export default function TaskAll() {
    const router = useRouter()
    const [userInfo , setUserInfo] = useState<any>(null)
    const [taskLog , setTaskLog] = useState<any>(null)
    useFocusEffect(
        useCallback(() => {
            (async ()=>{
                const token = await SecureStore.getItemAsync('sessionToken')
                if(token){
                    // const getAuth = await fetch("https://kajikashi.onrender.com/api/auth/me",{
                    const getAuth = await fetch('http://192.168.0.12:8080/api/auth/me',{
                        headers:{'Authorization': `Bearer ${token}`},
                        method: "GET"
                    })
                    if(!getAuth.ok){
                        router.push('/')
                    }else{
                        const data = await getAuth.json()
                        setUserInfo(data)
                        const thisWeek = getWeekRange(0)
                        const getTaskLog = await fetch(`http://192.168.0.12:8080/api/tasks/log?familyId=${data.familyID}&from=1900-01-01&to=${thisWeek.to}`,{
                            headers:{'Authorization': `Bearer ${token}`},
                            method: "GET"
                        })
                        const getTaskLogData = await getTaskLog.json()
                        const sortedTaskLog = getTaskLogData.slice().sort((a:any, b:any) => {
                            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        })
                        console.log(sortedTaskLog)
                        setTaskLog(sortedTaskLog)
                    }
                }
            })()
        }, [])
    );
const jaDate = (createdAt:any) => {
    const japanTime = toZonedTime(createdAt, 'Asia/Tokyo');
    const formatted = format(japanTime, 'yyyy年M月d日');
    return formatted;
}

  return (
      <View className="flex-1" style={{backgroundColor: '#F5F5F5'}}>
          <Header />
          <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 16 }}>
              <VStack className='justify-center items-center w-full gap-10'>
                  <Text className='font-bold text-3xl' style={{color: '#333333'}}>実績一覧</Text>
                  {taskLog?.map((log:any, id:any) => (
                      <VStack key={id} >
                          <View className="w-full px-5  border-gray-300 pb-1 mb-1 flex-row">
                              <View className="w-[25%] pr-5 border-r border-gray-300 items-center">
                                  <Text className="text-gray-800 text-xl">{log.categoryName}</Text>
                              </View>
                              <View className="w-[50%] px-5 border-r border-gray-300 items-center">
                                  <Text className="text-gray-800 text-xl">{log.taskTypeName}</Text>
                              </View>
                              <View className="w-[25%]  pl-5 items-center">
                                  <Text className="text-right text-gray-800 text-xl">{log.point} pt</Text>
                              </View>
                          </View>
                          <View className='flex-row justify-end items-end gap-5 border-b px-5  border-gray-300'>
                              <Text className='text-md' style={{color:"#333333"}} >{log.userName}</Text>
                              <Text className='text-md' style={{color:"#333333"}} >{jaDate(log.createdAt)}</Text>
                          </View>
                          <Divider className="my-0.5" />
                      </VStack>
                  ))}
              </VStack>
          </ScrollView>
      </View>
  );
}
