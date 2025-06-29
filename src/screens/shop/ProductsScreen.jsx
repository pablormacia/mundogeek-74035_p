import { StyleSheet, Text, View, FlatList } from 'react-native'
import products from '../../data/products.json'
import FlatCard from '../../components/FlatCard'
import { useEffect, useState } from 'react'
import SearchBox from '../../components/SearchBox'

const ProductsScreen = ({ route }) => {
    [productsFiltered, setProductsFiltered] = useState([])
    const [keywordInput, setKeywordInput] = useState("")
    const { category } = route.params

    //console.log(keywordInput)

    useEffect(() => {
        const productsFilteredByCategory = products.filter(product => product.category.toLowerCase() === category.toLowerCase())

        if (keywordInput !== "") {
            const productsFilteredBySearch = productsFilteredByCategory.filter(product => product.title.includes(keywordInput))
            setProductsFiltered(productsFilteredBySearch)
        } else {
            setProductsFiltered(productsFilteredByCategory)
        }
    }, [category, keywordInput])

    const renderProductItem = ({ item }) => (
        <FlatCard style={styles.productContainer}>
            <Text>{item.title}</Text>
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