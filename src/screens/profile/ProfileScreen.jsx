import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator } from 'react-native'
import { colors } from '../../global/colors'
import CameraIcon from '../../components/CameraIcon'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileImage } from '../../features/user/userSlice';
import { usePutProfileImageMutation } from '../../services/userService';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const ProfileScreen = () => {
    //const [image, setImage] = useState("")
    //const [user, setUser] = useState("Demo")
    const [location, setLocation] = useState(null);
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [address, setAddress] = useState("")
    const dispatch = useDispatch()
    const image = useSelector(state => state.userReducer.profileImage)
    const localId = useSelector(state => state.userReducer.localId)
    const [triggerPutProfileImage, result] = usePutProfileImageMutation()

    const user = useSelector(state => state.userReducer.email)

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
            triggerPutProfileImage({ localId: localId, image: imgBase64 })
        }
    };

    useEffect(() => {
        async function getCurrentLocation() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log("Error al obtener los permisos")
                    setLocationLoaded(true);
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                if (location) {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_API_MAPS}`
                    );
                    const data = await response.json()
                    //console.log(data)
                    setAddress(data.results[0].formatted_address)
                    setLocation(location);
                }
            } catch (error) {
                console.log("Error al obtener la ubicación:", error);
            } finally {
                setLocationLoaded(true);
            }


        }

        getCurrentLocation();
    }, []);

    //console.log(location)

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
                <Text>Mi ubicación:</Text>
            </View>
            <View style={styles.mapContainer}>
                {
                    location
                        ?
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ "latitude": location.coords.latitude, "longitude": location.coords.longitude }} title={"Lugar Geek"} />
                        </MapView>
                        :
                        (
                            locationLoaded
                            ?
                            <Text>Hubo un problema al obtener la ubicación</Text>
                            :
                            <ActivityIndicator />
                        )
                        
                }

            </View>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{address || ""}</Text>
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
    titleContainer: {
        marginVertical: 16,
    },
    mapContainer: {
        width: '100%',
        height: 240,
        overflow: "hidden",
        elevation: 5,
        marginBottom: 16
    },
    map: {
        height: 240,
    },
    mapTitle: {
        fontWeight: '700'
    },
    addressContainer: {
        alignItems: 'center',
    },
    address: {
        textAlign: 'center',
    }
})