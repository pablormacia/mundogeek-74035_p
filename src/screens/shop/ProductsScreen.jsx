import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
//import products from '../../data/products.json'
import FlatCard from '../../components/FlatCard'
import { useEffect, useState } from 'react'
import SearchBox from '../../components/SearchBox'
import { useSelector,useDispatch } from 'react-redux'
import { setProductSelected } from '../../features/shop/shopSlice'

const ProductsScreen = ({ navigation,route }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [keywordInput, setKeywordInput] = useState("")

    //const products = useSelector(state=>state.shopReducer.products)
    //const { category } = route.params
    
    const productsFilteredByCategory = useSelector(state=>state.shopReducer.productsFilteredByCategory)
    //console.log(keywordInput)

    const dispatch = useDispatch()

    useEffect(() => {
        //const productsFilteredByCategory = products.filter(product => product.category.toLowerCase() === category.toLowerCase())

        if (keywordInput !== "") {
            const productsFilteredBySearch = productsFilteredByCategory.filter(product => product.title.includes(keywordInput))
            setProductsFiltered(productsFilteredBySearch)
        } else {
            setProductsFiltered(productsFilteredByCategory)
        }
    }, [ keywordInput])

    const renderProductItem = ({ item }) => (
        <FlatCard style={styles.productContainer}>
            <Pressable 
                onPress={()=>{
                    dispatch(setProductSelected(item))
                    navigation.navigate("Producto",{product:item})}}
            >
            <Text>{item.title}</Text>
            </Pressable>
        </FlatCard>
    )

    return (
        <>
            <SearchBox setKeywordInput={setKeywordInput} keywordInput={keywordInput} />
            <FlatList
                renderItem={renderProductItem}
                keyExtractor={item => item.id}
                data={productsFiltered}
            />
        </>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productContainer: {
        //backgroundColor:"#000"
    }
})