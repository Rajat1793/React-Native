import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context"
import AppNavigator from "./navigation/AppNavigator";

export default function App(){
  return (
     <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <AppNavigator />
          <StatusBar style="light" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
  },
});