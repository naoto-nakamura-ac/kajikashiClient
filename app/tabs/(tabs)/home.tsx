import EditScreenInfo from "@/components/EditScreenInfo";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {Header} from "@/components/Header";
import {Dimensions, ScrollView, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {VStack} from "@/components/ui/vstack";
import {Card} from "@/components/ui/card";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Button, ButtonText} from "@/components/ui/button";
import {useFocusEffect, useRouter} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {getWeekRange} from "@/components/utils/getWeekRange";
import {getPieChartData} from "@/components/utils/getPieChartData";
import {PieChart} from "react-native-chart-kit";

export default function Home() {
    const router = useRouter()
    const [userInfo , setUserInfo] = useState<any>(null)
    const [userSummary , setUserSummary] = useState<number>(0)
    const [lastsummary , setLastSummary] = useState<any>(null)
    const [summary , setSummary] = useState<any>(null)
    const [pieData,setPieData] = useState<any>([])
    const screenWidth = Dimensions.get('window').width;
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
                        const getSummary = await fetch(`http://192.168.0.12:8080/api/summary?familyId=${data.familyID}&from=${thisWeek.from}&to=${thisWeek.to}`,{
                            headers:{'Authorization': `Bearer ${token}`},
                            method: "GET"
                        })
                        const summaryData = await getSummary.json()
                        // console.log(summaryData)
                        setSummary(summaryData)

                        const lastWeek = getWeekRange(-1)
                        const getLastSummary = await fetch(`http://192.168.0.12:8080/api/summary?familyId=${data.familyID}&from=${lastWeek.from}&to=${lastWeek.to}`,{
                            headers:{'Authorization': `Bearer ${token}`},
                            method: "GET"
                        })
                        const lastsummaryData = await getLastSummary.json()
                        setLastSummary(lastsummaryData)
                    }
                }
            })()
        }, [])
    );

    useEffect(() => {
        if(userInfo){
            const data = getPieChartData(userInfo?.name, summary)
            setPieData(data)
            const findSummary = summary.find((item:any)=>item.user === userInfo?.name)
            setUserSummary(findSummary.total)
        }
    }, [summary]);

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const compPoint = (item:any):any => {
        if(!lastsummary) return (<Text>"読み込み中"</Text>)
        const compObj = lastsummary?.find((lastitem:any) => item?.user === lastitem?.user)
        const result = item?.total - compObj.total
        if(result<0){
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name="thumbs-down" size={15} color="#333" style={{ marginRight: 8 }} />
                    <Text size="xl" className="text-sm" style={{ color: '#333333' }}>
                        {`先週より${Math.abs(result)}ポイント低下`}
                    </Text>
                </View>
            )

        }else{
            return(
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name="thumbs-up" size={15} color="#333" style={{ marginRight: 8 }} />
                    <Text size="xl" className="text-sm" style={{ color: '#333333' }}>
                        {`先週より${Math.abs(result)}ポイント増加`}
                    </Text>
                </View>
            )

        }
    }
    return (
        <View className="flex-1" style={{backgroundColor: '#F5F5F5'}}>
            <Header />
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 16 }}>
                <VStack className='justify-center items-center w-full'>
                    <Text className='font-bold text-3xl' style={{color: '#333333'}}>今週のスコア</Text>
                    <View style={{ padding: 30 }} className='items-center justify-center'>
                        <Card
                            size='lg'
                            variant='outline'
                            className='m-3 w-5/6 bg-green-50 gap-1'
                            style={{
                                // backgroundColor: "#F8F8F8",
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                        >
                            <View>
                                <Text size="3xl" className="text-3xl font-bold" style={{ color: '#333333' }}>
                                    Total : {userSummary} Point
                                </Text>
                            </View>
                        </Card>
                        <PieChart
                            data={pieData}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                        />
                    </View>
                    <Text className='font-bold text-3xl' style={{color: '#333333'}}>家族の記録</Text>
                    <View style={{alignItems:'center'}}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 ,justifyContent:'center'}}>
                            {summary?.map((item:any, index:any) => (
                                <Card
                                    size='lg'
                                    variant='filled'
                                    className='m-3 bg-gray-200 w-5/6 gap-1'
                                    key={index}
                                >
                                    <View className='w-full flex-row justify-between items-center'>
                                        <Text size="3xl" className="text-3xl" style={{ color: '#333333' }}>
                                            {item?.user}
                                        </Text>
                                        <Text size="3xl" className="text-3xl font-bold pl-3" style={{ color: '#333333' }}>
                                            {item?.total} Pt
                                        </Text>
                                    </View>
                                    <View className='items-end'>
                                        {compPoint(item)}
                                    </View>
                                </Card>

                            ))}
                        </View>
                    </View>

                </VStack>
            </ScrollView>

        </View>
  );
}
