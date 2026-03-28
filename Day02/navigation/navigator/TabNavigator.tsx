import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator 
    screenOptions={{
        headerStyle:{backgroundColor:"#222"},
        headerTintColor:"#fff",
        headerTitleAlign:"center"
    }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
      options={{
        tabBarLabel:"Overview",
        tabBarIcon:({color , size , focused})=>(
            <Ionicons
            name={focused ? "home" : "home-outline"}
            size={size}
            color={color}
            />
        )
      }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs