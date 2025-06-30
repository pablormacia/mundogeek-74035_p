import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ShopStackNavigator, CartStackNavigator, OrdersStackNavigator } from "./"
import Icon from 'react-native-vector-icons/Feather'
import { colors } from '../global/colors';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,

                }}
            >
                <Tab.Screen
                    name="Tienda"
                    component={ShopStackNavigator}
                    options={{
                        tabBarIcon: ({focused}) => <Icon name="shopping-bag" size={24} color={focused?colors.darkGray:colors.lightGray} />
                    }}

                />
                <Tab.Screen 
                    name="Carrito" 
                    component={CartStackNavigator}  
                    options={{
                        tabBarIcon: ({focused}) => <Icon name="shopping-cart" size={24} color={focused?colors.darkGray:colors.lightGray} />
                    }}
                    />
                <Tab.Screen 
                    name="Órdenes" 
                    component={OrdersStackNavigator} 
                    options={{
                        tabBarIcon: ({focused}) => <Icon name="archive" size={24} color={focused?colors.darkGray:colors.lightGray} />
                    }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}