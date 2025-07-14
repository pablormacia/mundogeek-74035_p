import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/authService';
import { setUser } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { loginSchema } from '../../validations/yupSchema';

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [triggerLogin, result] = useLoginMutation()
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const { message } = route.params || ""

    const dispatch = useDispatch()

    useEffect(() => {
        if (result.status === "fulfilled") {
            console.log("Sesión iniciada exitosamente")
            dispatch(setUser(result.data.email))
        } else {
            console.log("Hubo un error al iniciar sesión")
        }
    }, [result])


    const onsubmit = () => {
        try {
            loginSchema.validateSync({ email, password })
            setErrorEmail("")
            setErrorPassword("")
            triggerLogin({ email, password })
        } catch (error) {
            switch (error.path) {
                case "email":
                    //console.log(error.message)
                    setErrorEmail(error.message)
                    break
                case "password":
                    //console.log(error.message)
                    setErrorPassword(error.message)
                    break
                default:
                    break
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mundo Geek</Text>
            {
                message && <Text style={styles.whiteText}>{message}</Text>
            }
            <Text style={styles.subTitle}>Inicia sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.white}
                    placeholder="Email"
                    style={styles.textInput}
                />
                {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.white}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.purple
    },
    title: {
        color: colors.neonGreen,
        fontFamily: "PressStart2P",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.yellow,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.darkGray,
        width: textInputWidth,
        color: colors.white,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.white
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.black,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700'
    },
    error: {
        padding:16,
        backgroundColor:colors.red,
        borderRadius:8,
        color: colors.white
    }
})