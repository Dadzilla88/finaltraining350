import * as React from 'react';
import {View, StyleSheet, Text, Dimensions, FlatList} from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';
import {useEffect, useState} from "react";






export const SearchLocation = ({setLocation}) => {

    const [huntList, setHuntList] = useState();
    const [gridLoading, setGridLoading] = useState(true);

    if(gridLoading) {
        const res = axios.get('http://10.0.2.2:4000/hunts').then(function (result) {
                let rep = result.data;
                console.log("This is rep: " + rep[0].huntID);
                setHuntList(rep);
                setGridLoading(false);
            })
        ;
        console.log("This is huntList: " + huntList);
    }

    return(
        <>
        <Text>Search Location Screen</Text>
        <View>
        <FlatList
            numColumns={1}
            keyExtractor={
                item => item.huntID
            } data={huntList}
        renderItem={({item}) => (
            <>
            <Text>{item.huntName}</Text>
            <Text>{item.difficulty}</Text>
            </>
        )}
        />
        </View>
            </>
    )

}
