import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen,SignUpScreen } from '../screens';

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Login'
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
    );
}