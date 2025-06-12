import EditScreenInfo from "@/components/EditScreenInfo";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {ScrollView, View} from "react-native";
import {Header} from "@/components/Header";
import React, {useCallback, useEffect, useState} from "react";
import {VStack} from "@/components/ui/vstack";
import * as SecureStore from "expo-secure-store";
import {getWeekRange} from "@/components/utils/getWeekRange";
import {useFocusEffect, useRouter} from "expo-router";
import { ChevronDownIcon } from "@/components/ui/icon"
import {
    Select, SelectBackdrop, SelectContent, SelectDragIndicator,
    SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger
} from "@/components/ui/select";
import {FormControl, FormControlLabel, FormControlLabelText} from "@/components/ui/form-control";
import {Picker} from "@react-native-picker/picker";
import {Button, ButtonText} from "@/components/ui/button";
import {Toast, ToastDescription, ToastTitle, useToast} from "@/components/ui/toast";

export default function Form() {
    const router = useRouter()
    const [categoryList,setCategoryList] = useState<any>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>(categoryList[0]?.categoryId || 1);
    const [selectedTaskName, setSelectedTaskName] = useState<any>("");
    const [userInfo , setUserInfo] = useState<any>(null)

    const selectedCategory = categoryList?.find((cat:any) => cat.categoryId === selectedCategoryId);
    const taskList = selectedCategory?.tasks || [];
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
                if(token){
                    // const getAuth = await fetch("https://kajikashi.onrender.com/api/auth/me",{
                    const getAuth = await fetch('http://192.168.0.12:8080/api/auth/me',{
                        headers:{'Authorization': `Bearer ${token}`},
                        method: "GET"
                    })
                    if(!getAuth.ok){
                        router.push('/')
                    }else{
                        const userdata = await getAuth.json()
                        setUserInfo(userdata)
                        const getTaskList = await fetch('http://192.168.0.12:8080/api/tasks',{
                            headers:{'Authorization': `Bearer ${token}`},
                            method: "GET"
                        })
                        const data =  await getTaskList.json()
                        // console.log(data)
                        setCategoryList(data)
                    }
                }
            })()
        }, [])
    );
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
                    <Toast nativeID={uniqueToastId} action="success" variant="outline">
                        <ToastTitle>Success!</ToastTitle>
                        <ToastDescription>
                            家事実績登録しました！お疲れ様でした！！
                        </ToastDescription>
                    </Toast>
                )
            },
        })
    }
    const handleTaskRegister = async() => {
        if(selectedTaskName){
            const res = await fetch('http://192.168.0.12:8080/api/tasks',{
                method: "POST",
                credentials: "include",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({taskTypeName: selectedTaskName,email:userInfo?.email})
            })
            if(res.ok){
                handleToast()
            }
        }
    }
  return (
      <View className="flex-1" style={{backgroundColor: '#F5F5F5'}}>
          <Header />
          <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 16 }}>
              <VStack className='justify-center items-center w-full gap-10'>
                  <Text className='font-bold text-3xl' style={{color: '#333333'}}>家事記録フォーム</Text>
                  <View className="w-4/6 gap-10">
                      <FormControl>
                          <FormControlLabel>
                              <FormControlLabelText className="font-bold text-xl" style={{color:'#333333'}}>カテゴリーを選択</FormControlLabelText>
                          </FormControlLabel>
                          <Picker
                              selectedValue={selectedCategoryId}
                              onValueChange={(itemValue:any) => {
                                  setSelectedCategoryId(itemValue)
                                  const newCategory = categoryList.find((cat:any) => cat.categoryId === itemValue);
                                  const firstTaskName = newCategory?.tasks?.[0]?.name ?? "";
                                  setSelectedTaskName(firstTaskName);
                              }}
                              style={{
                                  backgroundColor: '#f0f0f0',
                                  borderRadius: 8,
                                  paddingHorizontal: 10,
                              }}
                          >
                              {categoryList.map((cat:any) => (
                                  <Picker.Item key={cat.categoryId} label={cat.categoryName} value={cat.categoryId} />
                              ))}
                          </Picker>
                      </FormControl>
                      <FormControl>
                          <FormControlLabel>
                              <FormControlLabelText className="font-bold text-xl" style={{color:'#333333'}}>実施した家事を選択</FormControlLabelText>
                          </FormControlLabel>
                          <Picker
                              selectedValue={selectedTaskName}
                              onValueChange={(itemValue:any) => setSelectedTaskName(itemValue)}
                              enabled={taskList.length > 0}
                              style={{
                                  backgroundColor: '#f0f0f0',
                                  borderRadius: 8,
                                  paddingHorizontal: 10,
                              }}
                          >
                              {taskList.map((task:any, id:any) => (
                              <Picker.Item key={id} label={task.name} value={task.name} />
                          ))}
                          </Picker>
                      </FormControl>
                      <Button className="w-[250px] h-[48px] rounded-full" style={{backgroundColor:'#4CAF50'}} onPress={handleTaskRegister}>
                          <ButtonText className="text-xl font-bold" style={{color:'#333333'}}>登録</ButtonText>
                      </Button>
                  </View>
              </VStack>
          </ScrollView>
      </View>
  );
}
