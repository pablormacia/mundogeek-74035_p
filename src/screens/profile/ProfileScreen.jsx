import { StyleSheet, Text, View, Pressable, Image,useWindowDimensions } from 'react-native'
import { colors } from '../../global/colors'
import CameraIcon from '../../components/CameraIcon'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useSelector,useDispatch } from 'react-redux';
import { setProfileImage } from '../../features/user/userSlice';
import { usePutProfileImageMutation } from '../../services/userService';
import MapView, {Marker} from 'react-native-maps';



const ProfileScreen = () => {
    //const [image, setImage] = useState("")
    //const [user, setUser] = useState("Demo")
    const dispatch = useDispatch()
    const image = useSelector(state=>state.userReducer.profileImage)
    const localId = useSelector(state=>state.userReducer.localId)
    const [triggerPutProfileImage, result] = usePutProfileImageMutation()

    const user=useSelector(state=>state.userReducer.email)

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true,
        });

        //console.log(result);

        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
            //console.log(imgBase64)
            //setImage(result.assets[0].uri);
            dispatch(setProfileImage(imgBase64))
            triggerPutProfileImage({localId: localId, image: imgBase64})
        }
    };

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.profileData}>Email: {user}</Text>
            <View style={styles.titleContainer}>
                <Text>Mi última ubicación:</Text>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.82172566127487,
                        longitude:  -122.46896382718623,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ "latitude": 37.82172566127487, "longitude": -122.46896382718623 }} title={"Lugar Geek"} />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>Mapa de ejemplo</Text>
                <Text style={styles.address}>Dirección de ejemplo</Text>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        paddingTop: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.white,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    titleContainer:{
        marginVertical:16,
    },
    mapContainer: {
      width: '100%',
      height: 240,
      overflow: "hidden",
      elevation: 5,
      marginBottom:16
    },
    map: {
      height: 240,
    },
    mapTitle: {
      fontWeight: '700'
    },
    placeDescriptionContainer:{
        flexDirection:'row',
        gap:16
    }
})