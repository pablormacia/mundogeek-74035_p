import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useNavigation } from '@react-navigation/native'
import { useSelector,useDispatch } from 'react-redux'
import { clearUser } from '../features/user/userSlice'
import { clearSession } from '../db'

const Header = ({title,subtitle}) => {
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack();
  const user = useSelector(state=>state.userReducer.email)
  const dispatch = useDispatch()

  const handleClearSession = async ()=>{
    try{
      const result = await clearSession()
      dispatch(clearUser())
    }catch{
      console.log("Hubo un error al limpiar la sesión")
    }
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {
        canGoBack
        &&
        <Pressable 
        onPress={()=>navigation.goBack()}
        style={styles.gobackIcon}>
        <Ionicons name="arrow-back-circle-outline" color={colors.white} size={24} />
      </Pressable>
      }
      {
        user
        &&
        <Pressable onPress={handleClearSession}>
          <Text>Salir</Text>
        </Pressable>
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        height:150,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.darkGray
    },
    title:{
        fontSize:16,
        fontFamily: 'PressStart-Regular',
        color:colors.white
    },
    subtitle:{
      fontSize:14,
        fontFamily: 'PressStart-Regular',
        color:colors.white
    },
    gobackIcon:{
      position:"absolute",
      bottom:8,
      left:8
    }
})