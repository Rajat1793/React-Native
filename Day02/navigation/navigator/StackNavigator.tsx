import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();


export default function StackNavigator(){
    return(
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen 
            name='Home' 
            component={HomeScreen}
            options={{
                presentation:"modal",
                title:"My Home🏠",
               headerTitleStyle:{
                fontWeight:"900",
                fontSize:24
               },
            //    headerRight:()=>(),
               headerLeft:()=>(
                <Button title='Info'/>
               )
            }} 
            
            />
            <Stack.Screen name='About' component={AboutScreen}/>
            <Stack.Screen name='Details' component={DetailsScreen}/>
        </Stack.Navigator>
    )
}