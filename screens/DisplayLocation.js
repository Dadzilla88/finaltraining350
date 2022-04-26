import * as React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';








export const DisplayLocation = ({searchLocation}) => {
    if (!searchLocation){
        return(

            <View style={styles.container}>
                <MapView style={styles.map}>
                </MapView>
            </View>
        )}
    else{
        return(
            <View style={styles.container}>
                <MapView style={styles.map}
                         initialRegion={{
                             latitude: searchLocation.coords.latitude,
                             longitude: searchLocation.coords.longitude,
                             latitudeDelta: 0.04,
                             longitudeDelta:0.04
                         }}
                >
                    <Marker coordinate={{
                        latitude: searchLocation.coords.latitude,
                        longitude: searchLocation.coords.longitude,
                    }}>
                        <Callout style={{flex: -1, position: 'absolute',width: 250}}>
                            <Text>{searchLocation.coords.huntName}</Text>
                        </Callout>
                    </Marker>
                </MapView>
            </View>
        )
        }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
})
