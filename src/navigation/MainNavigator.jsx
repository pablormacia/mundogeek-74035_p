import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import TabsNavigator from './TabsNavigator';
import { useSelector,useDispatch } from 'react-redux';
import { useGetProfileImageQuery } from '../services/userService';
import { useEffect } from 'react';
import { setProfileImage } from '../features/user/userSlice';

export default function MainNavigator() {
    const userEmail= useSelector(state=>state.userReducer.email)
    const localId = useSelector(state=>state.userReducer.localId)
    //console.log("localId desde MainNavigator: ",localId)
    const dispatch = useDispatch()

    const {data:profileImage,isLoading,error} = useGetProfileImageQuery(localId)
    //console.log(profileImage)
    useEffect(()=>{
        if(profileImage){
            dispatch(setProfileImage(profileImage.image))
        }
    },[profileImage])

    return (
        <NavigationContainer>
            {
                userEmail ? <TabsNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}