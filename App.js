import { StyleSheet, Text, View } from 'react-native';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import {AddLocation} from './screens/AddLocation';
import {SearchLocation} from './screens/SearchLocation';
import {DisplayLocation} from './screens/DisplayLocation';


export default function App() {

  const []

  return (
    <View style={styles.father} >
      <CubeNavigationHorizontal ref={view => { this.cube = view; }}>
        <View style={[styles.container, { backgroundColor: '#5CDB8B' }]}>
          <AddLocation/>
        </View>
        <View style={[styles.container, { backgroundColor: '#A3F989' }]}>
          <SearchLocation/>
        </View>
        <View style={[styles.container, { backgroundColor: '#CBF941' }]}>
          <DisplayLocation latitude={null} longitude={null} huntName={null} />
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
