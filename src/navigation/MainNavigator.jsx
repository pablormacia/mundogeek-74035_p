import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import TabsNavigator from './TabsNavigator';
import { useSelector } from 'react-redux';


export default function MainNavigator() {
    const userEmail= useSelector(state=>state.userReducer.email)
    return (
        <NavigationContainer>
            {
                userEmail ? <TabsNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}