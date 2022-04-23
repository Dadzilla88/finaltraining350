import * as React from 'react';
import {View, StyleSheet, Text, Dimensions, TextInput, Button, TextInputComponent, Alert} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';
import {DisplayLocation} from "./DisplayLocation";





export const AddLocation = ({location, defaultloc}) => {
    console.log(location);

    const submitValues = (values) => {
        const res = axios.put('http://10.0.2.2:4000/hunts', {huntName: values.huntName, difficulty: values.difficulty, latitude: values.latitude, longitude: values.longitude}).then(function(result){
            let rep = result.data;
            console.log("This is rep: "+rep);
            if (rep === "DUPENAME"){
                Alert.alert("That hunt name already exists");
            } else if (rep === "SUCCESS"){
                Alert.alert("Hunt successfully added");
                <DisplayLocation hunt={values} />;
            } else {
                Alert.alert("An error has occurred");
            }
        });
    }
        if (!defaultloc){
            let text = JSON.stringify(location);
            let latitude = JSON.stringify(location.coords.latitude);
            let longitude = JSON.stringify(location.coords.longitude);
            return(
                <>
                    <Formik
                        initialValues={{
                            huntName: '',
                            difficulty: '',
                            latitude: latitude,
                            longitude: longitude}}
                        onSubmit={values => submitValues(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View>
                                <TextInput
                                    onChangeText={handleChange('huntName')}
                                    onBlur={handleBlur('huntName')}
                                    value={values.huntName}
                                    placeholder="Enter name of hunt"
                                />
                                <TextInput
                                    onChangeText={handleChange('difficulty')}
                                    onBlur={handleBlur('difficulty')}
                                    value={values.difficulty}
                                    placeholder="Enter difficulty here"
                                />
                                <Button onPress={handleSubmit} title="Submit" />
                            </View>
                        )}
                    </Formik>
            <Text>Current latitude is {latitude}</Text>
            <Text>Current longitude is {longitude}</Text>
                </>
        )
    }else {
        return(
            <Text>Location is null</Text>
        )
    }

}
