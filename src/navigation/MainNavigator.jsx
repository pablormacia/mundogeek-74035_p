import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import TabsNavigator from './TabsNavigator';


export default function MainNavigator() {
    const [user, setUser] = useState("")
    return (
        <NavigationContainer>
            {
                user ? <TabsNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}