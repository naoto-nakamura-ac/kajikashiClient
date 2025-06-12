import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText } from "@/components/ui/form-control";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import React, {useState} from "react";

type Props = {
    value: string;
    onChangeValue: (value: string) => void;
};

export const FamilyCodeInput:React.FC<Props> = ({value,onChangeValue})=> {
    const [showPass,setShowPass] = useState(false)
    return (
        <FormControl className='w-5/6' isDisabled={false} isReadOnly={false} isRequired={false} >
            <FormControlLabel>
                <FormControlLabelText style={{color: '#333333'}} className='font-bold text-2xl'>家族コード（無ければ未記入でOKです）</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" variant="underlined" size="xl">
                <InputField
                    type="text"
                    placeholder="Your Family Code"
                    value={value}
                    onChangeText={(text) => onChangeValue(text)}
                    style={{color: '#333333'}}
                />
            </Input>
            {/*<FormControlError>*/}
            {/*    <FormControlErrorIcon as={AlertCircleIcon} />*/}
            {/*    <FormControlErrorText>*/}
            {/*        家族コードを入力してください*/}
            {/*    </FormControlErrorText>*/}
            {/*</FormControlError>*/}
        </FormControl>
    );
};