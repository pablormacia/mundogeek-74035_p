import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Text,Image, View } from 'react-native';
import Header from './src/components/Header';
import categories from './src/data/categories.json'
import FlatCard from './src/components/FlatCard';

export default function App() {
  const renderCategoryItem = ({ item }) => (
    <FlatCard>
      <View style={styles.categoryContainer}>
        <Text>{item.title}</Text>
        <Image width={80} height={40} source={{uri:item.image}} />
      </View>
    </FlatCard>

  )
  return (
    <>
      <Header title="Mundo Geek" />
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
      />
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  categoryContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    gap:8
  }
});
