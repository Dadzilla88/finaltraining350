import { StyleSheet, Text, View } from 'react-native';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import {AddLocation} from './screens/AddLocation';
import {SearchLocation} from './screens/SearchLocation';
import {DisplayLocation} from './screens/DisplayLocation';
import * as Location from "expo-location";
import {useEffect, useState} from "react";


export default function App() {

  const [location, setLocation] = useState({
        latitude: 47.1944,
        longitude: 95.1653,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      }
  );
  const [errorMsg, setErrorMsg] = useState(null);
  const [defaultloc, setDefaultloc] = useState(true);

  useEffect(()=>{
    (async () =>{
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setDefaultloc(false);
    })();
  },[]);
  if (errorMsg){
    return(
        <Text>An error has occurred {errorMsg}</Text>)}

  return (
    <View style={styles.father} >
      <CubeNavigationHorizontal ref={view => { this.cube = view; }}>
        <View style={[styles.container, { backgroundColor: '#5CDB8B' }]}>
          <AddLocation
           location={location} defaultloc={defaultloc}/>
        </View>
        <View style={[styles.container, { backgroundColor: '#A3F989' }]}>
          <SearchLocation
            setLocation={setLocation} />
        </View>
        <View style={[styles.container, { backgroundColor: '#CBF941' }]}>
          <DisplayLocation location={location} defaultloc={defaultloc}/>
        </View>
      </CubeNavigationHorizontal>
    </View >



);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
