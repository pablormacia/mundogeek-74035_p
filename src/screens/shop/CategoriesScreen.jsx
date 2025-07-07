import { StyleSheet, FlatList, Text,Image, View,Pressable } from 'react-native';
//import categories from '../../data/categories.json'
import FlatCard from '../../components/FlatCard'
import { useSelector,useDispatch } from 'react-redux';
import { setCategorySelected,filterProducts } from '../../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../../services/shopService';

const CategoriesScreen = ({navigation}) => {

  //const categories = useSelector(state=>state.shopReducer.categories)
  const dispatch = useDispatch()

  const {data:categories,siLoading,error} = useGetCategoriesQuery()

  //console.log(data)

  const renderCategoryItem = ({ item }) => (
    <Pressable
      onPress={()=>{
        dispatch(setCategorySelected(item.title))
        dispatch(filterProducts(item.title))
        navigation.navigate("Productos",{category:item.title})
        }}
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