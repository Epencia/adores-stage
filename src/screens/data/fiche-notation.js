import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function FicheNotation({navigation,route}) {

  // liste des categories
const {item} = route.params;
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [moyenne, setMoyenne] = useState([]);
const [error, setError] = useState(null);


const [searchTerm, setSearchTerm] = useState('');


const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getListeNotationStagiaire(); // Appeler la fonction de récupération des données
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
    getMoyenne();
    navigation.setOptions({title: 'Fiche de notation '});
     // Exécuter la fonction avec cache
   const delay = 10000; // Définir le délai à 1 minute
   getListeNotationStagiaire(); 
   // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
   const intervalId = setInterval(getListeNotationStagiaire2, delay);
   // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
   return () => clearInterval(intervalId);
},[])



const getListeNotationStagiaire = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/fiche-notation.php?code=${item.code_stagiaire}`, {
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
const getListeNotationStagiaire2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/data/fiche-notation.php?code=${item.code_stagiaire}`, {
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
const getMoyenne = () =>{
fetch(`https://adores.tech/api/data/fiche-notation-moyenne.php?code=${item.code_stagiaire}`,{
  method:'post',
    header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
})
.then((response) => response.json())
 .then(
     (result)=>{
      setMoyenne(result);
      }
 )
 .catch((error)=>{
  setError(error);
 });
}
// api recherche
  
const searchItems = useMemo(() => {
  return () => {
  const filteredData = data.filter(item =>
    item.libelle_notation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.note_notation.toLowerCase().includes(searchTerm.toLowerCase()||
    item.bareme_notation.toLowerCase().includes(searchTerm.toLowerCase()))
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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

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
      keyExtractor={(item) => item.code_notation}
      renderItem={({item}) => (
        <View style={styles.experienceItem}>
        <View>     
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.libelle_notation}</Text>
          <Text style={styles.userCode}>{item.note_notation} / {item.bareme_notation}</Text>
        </View>
      
      </View>
      </View>


      )}/>

</View>

<View style={styles.overlay}>
        <View
          style={{ flex: 1, paddingHorizontal: 4 }}>
          <View style={styles.btn}>
          <Text style={styles.btnText}>
        Moyenne : {moyenne && moyenne !== undefined && moyenne !== null ? moyenne : '0'}
      </Text>
          </View>
        </View>
      </View>



      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fond blanc
    padding: 16,
    marginBottom:60
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
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.45,
  },
});

