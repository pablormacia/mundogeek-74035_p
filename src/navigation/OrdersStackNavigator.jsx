import { OrdersScreen } from '../screens';
import Header from '../components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName='Órdenes'
            screenOptions={{
                header: ({route})=><Header title="Mundo Geek" subtitle={route.name}  />
            }}
        >
            <Stack.Screen name="Órdenes" component={OrdersScreen} />
        </Stack.Navigator>
    );
}