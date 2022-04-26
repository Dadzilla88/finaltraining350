import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import {Checkbox} from 'react-native-paper';




export const MoreFeedback = ({answer}) =>{

    const optionsList = ['Useful','Ease','Aesthetic']
    const [checked, setChecked] = useState({
        Aesthetic: false,
        Ease: false,
        Useful: false
    });




    if(answer === 'Yes'){
        return(
            <>
                <Text>Aesthetic</Text>
                <Checkbox
                    status={checked.Aesthetic ? 'checked' : 'unchecked'}
                    onPress={()=>{

                        setChecked({Aesthetic: !checked.Aesthetic,
                        Ease: checked.Ease,
                        Useful: checked.Useful});
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                    />
                <Text>Ease of Use</Text>
                <Checkbox
                    status={checked.Ease ? 'checked' : 'unchecked'}
                    onPress={()=>{
                        setChecked({Ease: !checked.Ease,
                        Aesthetic: checked.Aesthetic,
                        Useful: checked.Useful});
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                    />
                <Text>Useful</Text>
                <Checkbox
                    status={checked.Useful ? 'checked' : 'unchecked'}
                    onPress={()=>{
                        setChecked({Useful: !checked.Useful,
                        Aesthetic: checked.Aesthetic,
                        Ease: checked.Ease});
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                    />
                </>
                )
    }
    else {
        return (
            //TODO enter negative feedback multi select here
            <>
                <Text>This is the MoreFeedback page</Text>
                <Text>This is the value of answer: {answer}</Text>
            </>
        )
    }
}
