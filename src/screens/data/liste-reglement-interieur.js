import React , {useEffect, useState, useContext , useMemo} from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';





export default function ReglementInterieur ({navigation,item}) {


  const { width: windowWidth } = useWindowDimensions();


  // liste des categories
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);

const [searchTerm, setSearchTerm] = useState('');


const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getListeReglementInterieur(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };


useEffect(()=>{
    navigation.setOptions({title: 'Règlement intérieur'});
    getListeReglementInterieur();
},[])


// liste
const getListeReglementInterieur = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-reglement-interieur.php`, {
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
    item.titre_reglement.toLowerCase().includes(searchTerm.toLowerCase())||
    item.details_reglement.toLowerCase().includes(searchTerm.toLowerCase())
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
    <View style={styles.searchBar}>
      <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
      <TextInput
   style={styles.input}
   placeholder="Rechercher..."
   onChangeText={text => setSearchTerm(text)}
value={searchTerm}
 />
    </View>
    <FlatList
      data={searchTerm ? searchItems() : data}
      keyExtractor={(item) => item.id_reglement}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("Details reglement",{item})}>
        <View style={styles.cardIcon}>
                  <MaterialCommunityIcons color="#000" name='notebook-outline' size={24}/>
                  </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.titre_reglement}</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Cliquez ici</Text>
          </View>

        </View>
      </TouchableOpacity>
      )}
    />
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
    width: 50,
    height: 50,
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
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
    marginRight: 16,
  },
});

