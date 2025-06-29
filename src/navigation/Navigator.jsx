import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* import CategoriesScreen from '../screens/CategoriesScreen';
import ProductsScreen from '../screens/ProductsScreen'; */
import {CategoriesScreen,ProductsScreen,ProductScreen} from '../screens/shop'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../global/colors';
import Header from '../components/Header';


const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
        /*<Stack.Navigator
            initialRouteName='Categorías'
            screenOptions={({route})=>({
                headerTitle:`Mundo Geek - ${route.name}` ,
                headerStyle: {
                    backgroundColor: colors.darkGray,
                },
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerTintColor: colors.white,
                headerTitleStyle: {
                    fontFamily: 'PressStart-Regular',
                    fontSize:14
                }
            })}
        >*/
        <Stack.Navigator
            initialRouteName='Categorías'
            screenOptions={{
                header: ({route})=><Header title="Mundo Geek" subtitle={route.name}  />
            }}
        >
            <Stack.Screen name="Categorías" component={CategoriesScreen} />
            <Stack.Screen name="Productos" component={ProductsScreen} />
            <Stack.Screen name="Producto" component={ProductScreen} />
        </Stack.Navigator>
    );
}
