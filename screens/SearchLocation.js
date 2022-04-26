import * as React from 'react';
import {View, StyleSheet, Text, Dimensions, FlatList, Alert, Button,TextInput,SafeAreaView} from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';
import {useEffect, useState} from "react";
import {TouchableOpacity} from "react-native";


export const SearchLocation = ({setSearchLocation,gridLoading,setGridLoading,setDefaultloc}) => {

    const pressHandler = (item) =>{
        setSearchLocation({"coords":{
            latitude: item.latitude,
            longitude: item.longitude,
            huntName: item.huntName
            }});
        setDefaultloc(false);
        Alert.alert("The location has been set \n Swipe over to see the map");
    }

    const refreshHandler = () =>{
        const res = axios.get('http://35.188.207.65:4000/hunts').then(function (result) {
            let rep = result.data;
            console.log("This is rep: " + rep[0].latitude);
            setHuntList(rep);

        })
    }
    const searchHandler = () =>{
        const res = axios.put('http://35.188.207.65:4000/search', {difficulty: text}).then(function(result){
            let rep = result.data;
            setHuntList(rep);
        })
    }

    const [huntList, setHuntList] = useState();
    const [text, onChangeText] = useState();


    if(gridLoading) {
        const res = axios.get('http://35.188.207.65:4000/hunts').then(function (result) {
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
            <View style={{paddingTop: 100}}>
            <FlatList
                numColumns={1}
                keyExtractor={
                    item => item.huntID
                } data={huntList}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.flatlist} onPress={()=> pressHandler(item)}>
                    <Text>{item.huntName}</Text>
                    <Text>{item.difficulty}</Text>
                </TouchableOpacity>
            )}
            />
                <SafeAreaView>
                    <TextInput
                        onChangeText = {onChangeText}
                        value = {text}
                        placeholder = "Enter preferred difficulty of hunt"/>
                    <Button
                        title = "Search"
                        onPress = {searchHandler}/>
                </SafeAreaView>

                <Button
                    title = "Refresh list"
                    onPress = {refreshHandler}/>
            </View>
                </>
    )}

}

const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
        backgroundColor: '#ff0',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        margin: 2,
    },
});
