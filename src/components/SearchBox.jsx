import { StyleSheet, Text, TextInput, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../global/colors'


const SearchBox = ({setKeywordInput,keywordInput}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        onChangeText={(text)=>setKeywordInput(text)}
        value={keywordInput}
        placeholder='Buscar productos'
      />
      <Ionicons name="search" color={colors.darkGray} size={32} />
    </View>
  )
}

export default SearchBox

const styles = StyleSheet.create({
  searchContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    margin:16, 
  },
  searchInput:{
    borderWidth:1,
    borderRadius:16,
    borderColor:colors.darkGray,
    width:'90%',
    padding:8,
    paddingHorizontal:16
  }
})