import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ShopStackNavigator, CartStackNavigator, OrdersStackNavigator, ProfileStackNavigator } from "./"
import Icon from 'react-native-vector-icons/Feather'
import { colors } from '../global/colors';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,

            }}
        >
            <Tab.Screen
                name="Shop"
                component={ShopStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="shopping-bag" size={24} color={focused ? colors.darkGray : colors.mediumGray} />
                }}

            />
            <Tab.Screen
                name="Cart"
                component={CartStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="shopping-cart" size={24} color={focused ? colors.darkGray : colors.mediumGray} />
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="archive" size={24} color={focused ? colors.darkGray : colors.mediumGray} />
                }} />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="user" size={24} color={focused ? colors.darkGray : colors.mediumGray} />
                }} />
        </Tab.Navigator>

    );
}