import React , {useEffect, useState, useContext , useMemo} from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { StagiaireContext } from '../../global/StagiaireState';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ListeThemeStage ({navigation,item}) {

  // liste des categories
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);
const [user, setUser] = useContext(GlobalContext);



const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getListeThemeStage(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };
  const [expandedItems, setExpandedItems] = useState([]);
  


  const toggleItem = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  useEffect(()=>{
    navigation.setOptions({title: "Rédacteur de mémoire"});
    // Exécuter la fonction avec cache
    const delay = 60000; // Définir le délai à 1 minute
    getListeThemeStage(); 
    // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
    const intervalId = setInterval(getListeThemeStage2, delay);
    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
    return () => clearInterval(intervalId);
    
},[])

  // sans variables sessions
const getListeThemeStage = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-theme-stage.php`, {
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
// liste
const getListeThemeStage2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-theme-stage.php`, {
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
  // validation
  const ValidationRapportStage = (param1) =>{
		fetch(`https://adores.tech/api/data/demande-rapport-stage.php?matricule=${user[0].matricule}&code=${param1} `,{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
		})
		.then((response) => response.json())
		 .then((responseJson)=>{
      alert(responseJson);
		 })
		 .catch((error)=>{
		 alert(error);
		 });
	}

  // in
  
  // api recherche
  const [searchTerm, setSearchTerm] = useState('');
  const searchItems = useMemo(() => {
    return () => {
    const filteredData = data.filter(item =>
    item.titre_theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.intitule_cycle.toLowerCase().includes(searchTerm.toLowerCase())||
    item.intitule_filiere.toLowerCase().includes(searchTerm.toLowerCase())
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
        keyExtractor={item => item.code_theme}
        renderItem={({item}) => (
          <View style={styles.experienceItem}>
          <TouchableOpacity onPress={() => toggleItem(item.code_theme)}>
            <Text style={styles.jobTitle}>{item.titre_theme ? item.titre_theme : "Aucun thème de stage"}</Text>
          </TouchableOpacity>
          {expandedItems.includes(item.code_theme) && (
            <View>
             <View>
                <Text style={styles.description2}>Cycle</Text>
                <Text style={styles.description}>{item.intitule_cycle ? item.intitule_cycle : "Aucun cycle"}</Text>
             </View>
             <View>
                <Text style={styles.description2}>Filière</Text>
                <Text style={styles.description}>{item.intitule_filiere ? item.intitule_filiere : "Aucune filière"}</Text>
             </View>
             <View>
                <Text style={styles.description2}>Description</Text>
                <Text style={styles.description}>{item.description_tache ? item.description_tache : "Aucune description"}</Text>
             </View>
             <View style={{marginBottom:20}}></View>
            <TouchableOpacity
            style={styles.followButton} onPress={() => {
              // Appel à ValidationThemeStage au clic sur le bouton
              ValidationRapportStage(item.code_theme);
            }}>
            <Text style={styles.followButtonText}>
              Faire une demande
            </Text>
          </TouchableOpacity>
          </View>
          )}
        </View>
      )}/>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  experienceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12
  },
  jobTitle: {
    fontSize: 18,
    //fontWeight: 600,
    //textAlign:'justify'
  },
  company: {
    fontSize: 16,
    color: 'gray',
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop:8
  },
  description2: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop:8,
    fontWeight:'bold',
    textDecorationLine: 'underline',
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
});


