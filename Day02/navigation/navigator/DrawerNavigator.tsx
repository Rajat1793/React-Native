import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
        drawerActiveTintColor:"tomato"
    }}>
      <Drawer.Screen name="Home" component={StackNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
export default MyDrawer

// drawerType
// drawerPosition
// Drawer functions (navigation.openDrawer())