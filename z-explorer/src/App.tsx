import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Home from './screens/Home';
import CharacterDetail from './screens/CharacterDetail';
import Planets from './screens/Planets';
import Transformations from './screens/Transformations';

export type RootStackParamList = {
  MainTabs: undefined;
  CharacterDetail: { id: string };
  Transformations: { id: string };
};

export type MainTabParamList = {
  Characters: undefined;
  Planet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: {
          paddingTop: insets.top,
          backgroundColor: '#080E1A',
        },
        tabBarStyle: [
          styles.tabBar,
          {
            height: 58 + insets.bottom,
            paddingBottom: Math.max(8, insets.bottom),
          },
        ],
        tabBarActiveTintColor: '#FF9F4A',
        tabBarInactiveTintColor: '#93A0B8',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'Characters'
              ? 'home'
              : 'planet';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Characters" component={Home} />
      <Tab.Screen name="Planet" component={Planets} />
    </Tab.Navigator>
  );
}

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#080E1A',
    card: '#0D1320',
    text: '#E5EBFC',
    border: '#232C3E',
    primary: '#FF9F4A',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" translucent={false} backgroundColor="#080E1A" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#0D1320' },
            headerTintColor: '#E5EBFC',
            headerTitleStyle: { fontWeight: '800' },
            contentStyle: { backgroundColor: '#080E1A' },
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CharacterDetail"
            component={CharacterDetail}
            options={{ title: 'Warrior Profile' }}
          />
          <Stack.Screen
            name="Transformations"
            component={Transformations}
            options={{ title: 'Transformations' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0D1320',
    borderTopColor: '#232C3E',
    height: 78,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
});
