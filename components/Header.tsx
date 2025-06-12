import {Image} from "@/components/ui/image";
import {HStack} from "@/components/ui/hstack";
import React, {ReactNode} from "react";
import {Box} from "@/components/ui/box";

export const Header:React.FC= () =>{
    return(
        <Box className='min-h-[100px] flex justify-center items-center py-5'>
            <HStack className='items-center'>
                <Image
                    size="xl"
                    source={require('../assets/images/AppName.png')}
                    alt="AppTitle"
                    resizeMode="contain"
                />
                <Image
                    size="sm"
                    source={require('../assets/images/logo.png')}
                    alt="AppTitle"
                    resizeMode="contain"
                />
            </HStack>
        </Box>
    )
}