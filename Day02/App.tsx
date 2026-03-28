import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/navigator/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}