import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import TabsNavigator from './TabsNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileImageQuery } from '../services/userService';
import { useEffect, useState } from 'react';
import { setProfileImage, setUser } from '../features/user/userSlice';
import { initSessionTable, getSession } from '../db';
import { ActivityIndicator,View } from 'react-native';

export default function MainNavigator() {
    const userEmail = useSelector(state => state.userReducer.email)
    const localId = useSelector(state => state.userReducer.localId)
    const [checkingSession, setCheckingSession] = useState(true);
    //console.log("localId desde MainNavigator: ",localId)
    const dispatch = useDispatch()

    const { data: profileImage, isLoading, error } = useGetProfileImageQuery(localId)

    //console.log(profileImage)


    useEffect(() => {
        const bootstrap = async () => {
            await initSessionTable();
            const session = await getSession();
            if (session) {
                console.log("Session:", session)
                dispatch(setUser({ email: session.email, localId: session.localId }))
            }
            setCheckingSession(false);
        };

        bootstrap();
    }, []);

    useEffect(() => {
        if (profileImage) {
            dispatch(setProfileImage(profileImage.image))
        }
    }, [profileImage])


    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userEmail ? <TabsNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );


}