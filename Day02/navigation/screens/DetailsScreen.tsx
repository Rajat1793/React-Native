import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";

const DetailsScreen = ({ route, navigation }: any) => {
  return (
    <View>
      <Text>Id: {route.params.id}</Text>
      <Button onPressIn={() => navigation.goBack()}>Go Back</Button>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});