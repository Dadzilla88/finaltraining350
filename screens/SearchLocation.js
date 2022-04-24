import * as React from 'react';
import {View, StyleSheet, Text, Dimensions, FlatList, Alert} from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';
import {useEffect, useState} from "react";
import {TouchableOpacity} from "react-native";


export const SearchLocation = ({setLocation}) => {

    const pressHandler = (item) =>{
        setLocation({"coords":{
            latitude: item.latitude,
            longitude: item.longitude,
            huntName: item.huntName
            }});
        Alert.alert("The location has been set \n Swipe over to see the map");
    }

    const [huntList, setHuntList] = useState();
    const [gridLoading, setGridLoading] = useState(true);

    if(gridLoading) {
        const res = axios.get('http://10.0.2.2:4000/hunts').then(function (result) {
                let rep = result.data;
                console.log("This is rep: " + rep[0].latitude);
                setHuntList(rep);

            })
        ;
        setGridLoading(false);
        console.log("This is huntList: " + huntList);
    }
    if (gridLoading){
        return(
            <Text>Search Location Screen</Text>
        )
    }else{
        return(
            <>
            <View>
            <FlatList
                numColumns={1}
                keyExtractor={
                    item => item.huntID
                } data={huntList}
            renderItem={({item}) => (
                <TouchableOpacity onPress={()=> pressHandler(item)}>
                    <Text>{item.huntName}</Text>
                    <Text>{item.difficulty}</Text>
                </TouchableOpacity>
            )}
            />
            </View>
                </>
    )}

}
