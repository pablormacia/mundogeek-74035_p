import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../global/colors'
import { useEffect, useState } from 'react';
import { useSignupMutation } from '../../services/authService';
import { signupSchema } from '../../validations/yupSchema';


const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [triggerSignUp, result] = useSignupMutation()

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

    useEffect(() => {
        if (result.status === "fulfilled") {
            console.log("Usuario creado exitosamente")
            navigation.navigate("Login", { message: "Usuario creado con éxito" })
        } else if(result.status === "rejected") {
            console.log("Hubo un error al crear el usuario")
        }
        //console.log(result)
    }, [result])

    const onsubmit = () => {
        //console.log(email, password, confirmPassword)
        try {
            signupSchema.validateSync({ email, password, confirmPassword })
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            triggerSignUp({ email, password })
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
                case "confirmPassword":
                    //console.log(error.message)
                    setErrorConfirmPassword(error.message)
                    break
                default:
                    break
            }
        }

        triggerSignUp({ email, password })
        //console.log(result)
    }

    return (
        <View style={styles.gradient}>
            <Text style={styles.title}>Mundo Geek</Text>
            <Text style={styles.subTitle}>Registrate</Text>
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
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor={colors.white}
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>

        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    gradient: {
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