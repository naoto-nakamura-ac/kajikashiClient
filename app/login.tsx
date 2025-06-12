import {Box} from "@/components/ui/box";
import {ScrollView} from "react-native";
import {useEffect} from "react";

export default function login(){
    useEffect(() => {
        (async ()=>{
            const auth = await fetch("https://kajikashi.onrender.com/api/auth/me")
        })()
    }, []);
    return (
        <Box className="flex-1 h-[100vh]" style={{backgroundColor: '#F5F5F5'}}>
            <ScrollView
                style={{ height: "100%" }}
                contentContainerStyle={{ flexGrow: 1 }}
            >

            </ScrollView>
        </Box>
    );
}