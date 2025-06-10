import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default FlatCard

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        backgroundColor:colors.lightGray,
        alignItems:"center",
        paddingVertical:24,
        margin:16,
        shadowColor:colors.black,
        elevation: 4,
    }
})