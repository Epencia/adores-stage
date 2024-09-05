import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { StagiaireContext } from '../../global/StagiaireState';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ListeTaches ({navigation,route}) {

  const { width: windowWidth } = useWindowDimensions();
  // liste des categories
const {item} = route.params;
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);


const [stagiaire, setStagiaire] = useContext(StagiaireContext);

const [searchTerm, setSearchTerm] = useState('');

const [inputValues, setInputValues] = useState({});

const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];


const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  setRefreshing(true); // Indiquer que le rafraîchissement est en cours
  getListeTaches(); // Appeler la fonction de récupération des données
  setRefreshing(false); // Indiquer que le rafraîchissement est terminé
};


const [isRefreshing, setIsRefreshing] = useState(false);
const handleRefresh2 = () => {
  setIsRefreshing(true); // Indiquer que le rafraîchissement est en cours
  getListeTaches(); // Appeler la fonction de récupération des données
  setIsRefreshing(false);
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
    navigation.setOptions({title: item.nom_prenom});
    setStagiaire(item.code_stagiaire);
      // Exécuter la fonction avec cache
  const delay = 60000; // Définir le délai à 1 minute
  getListeTaches(); 
  // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
  const intervalId = setInterval(getListeTaches2, delay);
  // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
  return () => clearInterval(intervalId);
},[])


const getListeTaches = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-taches-stagiaire.php?code=${item.code_stagiaire}`, {
    headers: {
      //'Cache-Control': 'no-cache',
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
//Liste
const getListeTaches2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-taches-stagiaire.php?code=${item.code_stagiaire}`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData(newData);
} catch (error) {
  setError(error);
}
}
// In des mobile money




const handleInputChange = (taskId, text) => {
  setInputValues((prev) => ({ ...prev, [taskId]: text }));
};
// api recherche
  
const searchItems = useMemo(() => {
  return () => {
  const filteredData = data.filter(item =>
    item.titre_tache.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.etat.toLowerCase().includes(searchTerm.toLowerCase())||
    item.description_tache.toLowerCase().includes(searchTerm.toLowerCase())

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
      keyExtractor={(item) => item.code_tache}
      renderItem={({item}) => (
        <View style={styles.experienceItem}>
        <TouchableOpacity  onPress={() => toggleItem(item.code_tache)}> 
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.titre_tache}</Text>
          <Text style={styles.userCode}>{item.etat}</Text>
        </View>
        
        {expandedItems.includes(item.code_tache) && (
          <View>
             


        <HTML source={{ html: item.travail_tache ? item.travail_tache : "Aucun travail à faire" }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}/>
       

        <View style={{marginBottom:20}}></View>
 
    <TouchableOpacity
      style={styles.followButton}
      onPress={() => navigation.navigate('Details des taches',{item})}
    >
      <Text style={styles.followButtonText}>Exécuter la tâche</Text>
    </TouchableOpacity>

            
        </View>
      )}
        </TouchableOpacity>
      </View>

      )}

      onRefresh={handleRefresh2}
  refreshing={isRefreshing}
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
    //fontWeight: 'bold',
  },
  userCode: {
    fontSize: 14,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
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
  description2: {
    fontSize: 16,
    textAlign: 'justify',
    //fontWeight:'bold',
    textDecorationLine: 'underline',
  },
  experienceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12
  },
});

