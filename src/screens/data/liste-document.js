import React , {useEffect, useState, useContext , useMemo} from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';





export default function ListeDocument({navigation,item}) {



  // liste des categories
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);

const [searchTerm, setSearchTerm] = useState('');


const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getListeDocument(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };

      // toogle
      const [expandedItems, setExpandedItems] = useState([]);
      const toggleItem = (itemId) => {
        if (expandedItems.includes(itemId)) {
          setExpandedItems(expandedItems.filter(id => id !== itemId));
        } else {
          setExpandedItems([...expandedItems, itemId]);
        }
      };

      

useEffect(()=>{
    navigation.setOptions({title: 'Téléchargements'});
    getListeDocument();
},[])


// liste
const getListeDocument = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-document.php`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData(newData);
 setIsLoading(false);
} catch (error) {
  setIsLoading(false);
  setError(error);
}
}
// In des mobile money

// api recherche
  const searchItems = useMemo(() => {
  return () => {
  const filteredData = data.filter(item =>
    item.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredData;
};
}, [data, searchTerm]);
// api recherche

  // Erreur et Chargement --debut--
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
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
      keyExtractor={item=>item.code}
        numColumns={2}
        renderItem={({item}) => (
        <View style={styles.contentDoc}>
        <View>
          <Text style={styles.contentTextDoc}
            numberOfLines={2} >
            {item.titre}
          </Text>

          <View style={{ width: '100%', height: 150, marginTop: 5, marginBottom: 10 }}>
                <MaterialCommunityIcons color="#007BFF" name='file-document-outline' size={140} />
              </View>
          <TouchableOpacity
            style={{ backgroundColor: '#3498db', padding: 10, borderRadius: 5 }}
            onPress={() => navigation.navigate("PDF",{item})}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Télécharger</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}/>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Fond blanc
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 5,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userCode: {
    fontSize: 14,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingButton: {
    backgroundColor: '#ccc',
  },
  followButtonText: {
    color: 'white',
  },
  followingButtonText: {
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop:5
  },
  experienceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12
  },
  contentDoc: {
    width: '47%', 
    marginTop: 10,
    marginBottom: 10, 
    borderRadius: 15, 
    marginRight: 5,
    marginLeft: 5, 
    padding: 10, 
    borderWidth: 1, 
    borderColor: 'gray' 
  },
  contentTextDoc: {
    minHeight: 45,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
});

