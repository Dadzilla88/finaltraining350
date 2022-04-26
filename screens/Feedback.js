import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';

export const Feedback = ({setAnswer}) =>{


    let radio_props = [
        {label: 'Yes', value: 'Yes'},
        {label: 'No', value: 'No'}
    ];

    return(
        <View>
            <Text>Are you happy with this application?</Text>
            <RadioForm
                radio_props={radio_props}
/*                initial={}*/
                onPress={(value) => {setAnswer(value)}}
                />
        </View>
    )
}
