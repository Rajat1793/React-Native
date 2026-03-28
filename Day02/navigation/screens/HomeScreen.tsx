import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { Button } from '@react-navigation/elements';

const HomeScreen = () => {
    const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      {/* <Link screen="About" params={
        
      }>Go to About</Link> */}
      <Button onPressIn={()=>navigation.navigate("About")}>
        Go to About
      </Button>

        <Button onPressIn={()=>navigation.navigate("Details" , {
          id:101
        })}>
        Go to Details
      </Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        gap:10
    }
})