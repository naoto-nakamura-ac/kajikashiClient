import React from "react";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import {Image} from "@/components/ui/image";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonText} from "@/components/ui/button";
import {useRouter} from "expo-router";

export default function Home() {
  const router = useRouter()
  // @ts-ignore
  return (
    <Box className="flex-1 h-[100vh]" style={{backgroundColor: '#F5F5F5'}}>
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box className="flex flex-1 items-center my-16 mx-5 lg:my-24 lg:mx-32">
          <Box className="flex-1 justify-center items-center h-[20px] w-[300px] lg:h-[160px] lg:w-[400px]">
            <HStack className='items-center -mt-20'>
              <Image
                  size="2xl"
                  source={require('../assets/images/AppName.png')}
                  alt="AppTitle"
                  resizeMode="contain"
              />
              <Image
                  size="md"
                  source={require('../assets/images/logo.png')}
                  alt="AppTitle"
                  resizeMode="contain"
              />
            </HStack>
            <Button className="w-[160px] h-[48px] rounded-full" style={{backgroundColor:'#4CAF50'}} onPress={() => router.push('/login')}>
              <ButtonText className="text-xl font-bold" style={{color:'#333333'}}>START</ButtonText>
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
