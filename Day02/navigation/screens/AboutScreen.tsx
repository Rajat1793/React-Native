import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements'

const AboutScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>AboutScreen</Text>
        <Button onPressIn={()=>navigation.push("About")}>
              Go to About
            </Button>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({})