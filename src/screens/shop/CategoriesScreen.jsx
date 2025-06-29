import { StyleSheet, FlatList, Text,Image, View,Pressable } from 'react-native';
import categories from '../../data/categories.json'
import FlatCard from '../../components/FlatCard'

const CategoriesScreen = ({navigation}) => {
  const renderCategoryItem = ({ item }) => (
    <Pressable
      onPress={()=>navigation.navigate("Productos",{category:item.title})}
    >
    <FlatCard>
      <View style={styles.categoryContainer}>
        <Text style={{fontFamily:'Karla-Bold'}}>{item.title}</Text>
        <Image width={80} height={40} source={{uri:item.image}} />
      </View>
    </FlatCard>
    </Pressable>
  )
  return (
    <>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
      />
    </>
  );
}

export default CategoriesScreen

const styles = StyleSheet.create({
  categoryContainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    gap:8
  }
});