import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText } from "@/components/ui/form-control";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import {EyeIcon, EyeOffIcon} from "lucide-react-native";
import React, {useState} from "react";

type Props = {
    value: string;
    onChangeValue: (value: string) => void;
    isInvalid?: boolean;
};

export const Password:React.FC<Props> = ({value,onChangeValue,isInvalid})=> {
    const [showPass,setShowPass] = useState(false)
    return (
            <FormControl className='w-5/6' isInvalid={isInvalid} isDisabled={false} isReadOnly={false} isRequired={false} >
                <FormControlLabel>
                    <FormControlLabelText style={{color: '#333333'}} className='font-bold text-2xl'>Password</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" variant="underlined" size="xl">
                    <InputField
                        type={ showPass ? "text" :"password" }
                        placeholder="password"
                        value={value}
                        onChangeText={(text) => onChangeValue(text)}
                        style={{color: '#333333'}}
                    />
                    <InputSlot className="pr-3" onPress={()=>setShowPass(!showPass)}>
                        <InputIcon as={showPass ? EyeOffIcon: EyeIcon} />
                    </InputSlot>
                </Input>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        4文字以上入力してください
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
    );
};