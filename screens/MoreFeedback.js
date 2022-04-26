import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import {Checkbox} from 'react-native-paper';
import axios from 'axios';




export const MoreFeedback = ({answer}) =>{



    const [pChecked, setPChecked] = useState({
        Aesthetic: false,
        Ease: false,
        Useful: false
    });
    const [nChecked, setNChecked] = useState({
        Slow: false,
        Crashes: false,
        Ugly: false
    });

    const submitValues = (values) => {
        let optionsList = [];
        Object.keys(values).forEach(key=>{
            if (values[key] === true){
                optionsList.push(key);
            };
        })
        const res = axios.post('http://10.0.2.2:4000/feedback',{list: optionsList})

    }




    if(answer === 'Yes'){
        return(
            <>
                <Text>Aesthetic</Text>
                <Checkbox
                    status={pChecked.Aesthetic ? 'checked' : 'unchecked'}
                    onPress={()=>{

                        setPChecked({Aesthetic: !pChecked.Aesthetic,
                        Ease: pChecked.Ease,
                        Useful: pChecked.Useful});
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                    />
                <Text>Ease of Use</Text>
                <Checkbox
                    status={pChecked.Ease ? 'checked' : 'unchecked'}
                    onPress={()=>{
                        setPChecked({Ease: !pChecked.Ease,
                        Aesthetic: pChecked.Aesthetic,
                        Useful: pChecked.Useful});
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                    />
                <Text>Useful</Text>
                <Checkbox
                    status={pChecked.Useful ? 'checked' : 'unchecked'}
                    onPress={()=>{
                        setPChecked({Useful: !pChecked.Useful,
                        Aesthetic: pChecked.Aesthetic,
                        Ease: pChecked.Ease});
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                    />
                <Button
                    onPress = {()=>{submitValues(pChecked)}} title="Submit Feedback"/>
                </>
                )
    }
    else if (answer === 'No'){
        return (
            <>
                <Text>Too Slow</Text>
                <Checkbox
                    status={nChecked.Slow ? 'checked' : 'unchecked'}
                    onPress={()=>{

                        setNChecked({Slow: !nChecked.Slow,
                            Crashes: nChecked.Crashes,
                            Ugly: nChecked.Ugly});
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                />
                <Text>Crashes</Text>
                <Checkbox
                    status={nChecked.Crashes ? 'checked' : 'unchecked'}
                    onPress={()=>{
                        setNChecked({Crashes: !nChecked.Crashes,
                            Ugly: nChecked.Ugly,
                            Slow: nChecked.Slow});
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                />
                <Text>Ugly</Text>
                <Checkbox
                    status={nChecked.Ugly ? 'checked' : 'unchecked'}
                    onPress={()=>{
                        setNChecked({Ugly: !nChecked.Ugly,
                            Crashes: nChecked.Crashes,
                            Slow: nChecked.Slow});
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                />
                <Button
                    onPress = {()=>{submitValues(nChecked)}} title="Submit Feedback"/>
            </>
        )
    }
    else{
        return(
        <>
            <Text>Please return to previous page and indicate</Text>
            <Text>whether you are satisfied with the app or not</Text>
            </>
    )}
}
