import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button, Dimensions} from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [permission, setPermission] = useState(null)
  const [camType, setCameraType] = useState(Camera.Constants.Type.back)

  const getPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    setPermission(status == 'granted')
    console.log(status)
  }
  useEffect(() => {
     getPermissions()
  })

  if(permission === null){
    return <View><Text>Waiting permissions...</Text></View>
  }
  else if(permission === false){
    return <View><Text>We dont have permission, sorry :(</Text></View>
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.Cam} type={camType}>
        <Button
          title="Turn"
          onPress={() => {
              const { front, back } = Camera.Constants.Type
              const newType = camType === back ? front : back
              setCameraType(newType)
          }}
          style={ styles.cameraButton}
        />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  Cam: {
    flex:2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
  }
});
