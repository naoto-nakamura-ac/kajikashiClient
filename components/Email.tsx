import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText } from "@/components/ui/form-control";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import React, {useState} from "react";

type Props = {
    value: string;
    onChangeValue: (value: string) => void;
    isInvalid?: boolean;
};

export const Email:React.FC<Props> = ({value,onChangeValue,isInvalid})=> {
    const [showPass,setShowPass] = useState(false)
    return (
        <FormControl className='w-5/6' isInvalid={isInvalid} isDisabled={false} isReadOnly={false} isRequired={false} >
            <FormControlLabel>
                <FormControlLabelText style={{color: '#333333'}} className='font-bold text-2xl'>メールアドレス</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" variant="underlined" size="xl">
                <InputField
                    type="text"
                    placeholder="Email"
                    value={value}
                    onChangeText={(text) => onChangeValue(text)}
                    style={{color: '#333333'}}
                />
            </Input>
            <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                    メールアドレスを入力してください
                </FormControlErrorText>
            </FormControlError>
        </FormControl>
    );
};