import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,TextInput,ActivityIndicator,ScrollView,Linking} from 'react-native';
import React , {useEffect, useState, useContext , useMemo} from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function Exemple ({navigation,item}) {
 
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');



const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  setRefreshing(true); // Indiquer que le rafraîchissement est en cours
  getPrestation(); // Appeler la fonction de récupération des données
  setRefreshing(false); // Indiquer que le rafraîchissement est terminé
};


useEffect(()=>{
    navigation.setOptions({title: 'Produits'});

console.log("useEffect")
console.log("useEffect page :", page)

setIsLoading(true);
     // Exécuter la fonction avec cache
     const delay = 60000; // Définir le délai à 1 minute
     getPrestation(); 
     // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
     const intervalId = setInterval(getPrestation2, delay);
     // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
     return () => clearInterval(intervalId);
},[page])


const getPrestation = async () => {
  //setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/prestation.php?_limit=10&_page=`+page, {
    headers: {
      //'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData(data.concat(newData));
  //setData([...data, ...newData]); // Ajoute les nouvelles données à celles déjà existantes
 setIsLoading(false);
} catch (error) {
  setIsLoading(false);
  setError(error);
}
}
// liste

const getPrestation2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/data/prestation.php?_limit=10&_page=`+page, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData(data.concat(newData));
  //setData([...data, ...newData]); // Ajoute les nouvelles données à celles déjà existantes
} catch (error) {
  setError(error);
}
}

// api recherche
const searchItems = useMemo(() => {
  return () => {
    const filteredData = data.filter(item =>
      item.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.statut.toLowerCase().includes(searchTerm.toLowerCase())   ||
      item.prix.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredData;
    };
  }, [data, searchTerm]);
// api recherche

// laizing loading
const loadMoreData = () => {
  setPage(page + 1);
  setIsLoading(true)
};
// fin

// Erreur et Chargement --debut--
const renderFooter = () => {
return (
isLoading ? 
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#5500dc" />
    </View> : null
  )
}


if (error) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
      <MaterialCommunityIcons color="#266EF1" name="access-point-off" size={150}/>
      <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10}}>
      Pas de connexion internet !
      </Text>
      <TouchableOpacity onPress={handleRefresh} style={{ backgroundColor: '#0099cc',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 5,}}>
        <Text style={{ color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center', }}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );
}
// Erreur et Chargement --fin--

return (
  <View style={styles.container}>


{data.length > 0 ? (
<View style={styles.searchBar}>
<FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
<TextInput
 style={styles.input}
 placeholder="Rechercher..."
 onChangeText={text => setSearchTerm(text)}
value={searchTerm}
/>
</View>
) : (
  <View style={{marginTop: 25, marginRight:15,marginLeft:15,
      elevation:5,backgroundColor:'white',borderRadius:6,marginBottom:5,
    }}>
    <Text style={{marginTop: 10, marginRight:15,marginLeft:15,
      marginBottom:15,color:'#888',textAlign:'center'
    }}>Aucune donnée disponible</Text>
    </View>
  )}

 

    <FlatList
      data={searchTerm ? searchItems() : data}
      keyExtractor={(item) => item.code}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Details prestation',{item})}>
                 
                  <MaterialCommunityIcons
                  style={styles.image}
                  name={'shopping'}
                  size={50}
                  color="#007BFF"
                />

        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.libelle}</Text>
          <View style={styles.dataContainer}>
            <FeatherIcon name="user" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{parseFloat(item.prix).toLocaleString("fr-FR")} F</Text>
          </View>
          <View style={styles.dataContainer}>
            <FeatherIcon name="info" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{item.statut}</Text>
          </View>
        </View>
      </TouchableOpacity>
      )}
      ListFooterComponent={renderFooter}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
    />
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white', // Fond blanc
  padding: 16,
},
searchBar: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  backgroundColor: 'white', // Fond blanc pour la barre de recherche
  borderRadius: 8,
  borderWidth: 1,
  borderColor: 'gray',
},
searchIcon: {
  padding: 8,
},
input: {
  flex: 1,
  height: 40,
},
listItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  borderRadius: 8, // Bordures arrondies
  backgroundColor: 'white', // Fond gris clair
  padding: 16,
  borderWidth: 1,
  borderColor: '#ccc',
},
image: {
 // width: 50,
 // height: 50,
  borderRadius: 25,
  marginRight: 16,
},
textContainer: {
  flex: 1,
},
text: {
  fontSize: 16,
},
dataText: {
  fontSize: 14,
  color: 'gray',
},
dataContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
icon: {
  marginRight: 8,
},
});