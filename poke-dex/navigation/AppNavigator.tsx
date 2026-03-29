import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screen/HomeScreen";
import PokemonDetailScreen from "./screen/PokemonDetailScreen";
import PokemonListScreen from "./screen/PokemonListScreen";
import { Ionicons } from "@expo/vector-icons";


const Stack = createNativeStackNavigator();

const HomeStackDisplay = ()=>{
    return(
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#18181b" } }}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen}/>
        </Stack.Navigator>
    )
}

const ListStackDisplay = ()=>{
    return(
        <Stack.Navigator  screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#18181b" } }}>
                <Stack.Screen name="PokemonList" component={PokemonListScreen}/>
                <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen}/>
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();


const AppNavigator = ()=>{
   return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#27272a",
          borderTopColor: "#3f3f46",
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: "#34d399",
        tabBarInactiveTintColor: "#a1a1aa",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Explore') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Pokedex') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
        <Tab.Screen name="Explore" component={HomeStackDisplay}/>
        <Tab.Screen name="Pokedex" component={ListStackDisplay}/>
    </Tab.Navigator>
   )
}

export default AppNavigator;