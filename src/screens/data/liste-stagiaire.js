import React , {useEffect, useState, useContext , useMemo} from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { StagiaireContext } from '../../global/StagiaireState';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function   ListeStagiaire({navigation,item}) {

  const [searchTerm, setSearchTerm] = useState('');

  // liste des inscrits pour le stage
const [user, setUser] = useContext(GlobalContext);
const [stagiaire, setStagiaire] = useContext(StagiaireContext);
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [themeData, setThemeData] = useState(null);



const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  setRefreshing(true); // Indiquer que le rafraîchissement est en cours
  getListeInscritsStage(); // Appeler la fonction de récupération des données
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
    navigation.setOptions({title: 'Stagiaires'});
    // Exécuter la fonction avec cache
    const delay = 10000; // Définir le délai à 1 minute
    getListeInscritsStage(); 
    // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
    const intervalId = setInterval(getListeInscritsStage2, delay);
    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
    return () => clearInterval(intervalId);
    },[])
    
    
    // sans variables sessions
    const getListeInscritsStage = async () => {
      setIsLoading(true);
     try {
      const response = await fetch(`https://adores.tech/api/data/liste-demande-stage-matricule.php?matricule=${user[0].matricule}`, {
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
    const getListeInscritsStage2 = async () => {
     try {
      const response = await fetch(`https://adores.tech/api/data/liste-demande-stage-matricule.php?matricule=${user[0].matricule}`, {
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
// api recherche
  
const searchItems = useMemo(() => {
  return () => {
  const filteredData = data.filter(item =>
    item.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.intitule_filiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.intitule_cycle.toLowerCase().includes(searchTerm.toLowerCase())||
    item.type_stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.telephone.toLowerCase().includes(searchTerm.toLowerCase())||
    item.etat.toLowerCase().includes(searchTerm.toLowerCase())
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
      keyExtractor={(item) => item.code_stagiaire}
      renderItem={({item}) => (
        <View style={styles.experienceItem}>

<TouchableOpacity  onPress={() => toggleItem(item.code_stagiaire)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
           {item.photo64 ? (
            <Image
alt=""
source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
style={styles.userPhoto}
/>
) : (
<Image
alt=""
source={require("../../assets/images/user.jpg")}
style={styles.userPhoto}
/>
  )}

     
<View style={styles.userInfo}>
          <Text style={styles.userName}>{item.nom_prenom}</Text>
          <Text style={styles.userCode}>* {item.intitule_cycle}</Text>
          <Text style={styles.userCode}>* {item.intitule_filiere}</Text>
          <Text style={styles.userCode}>* {item.type_stage} ({item.etat})</Text>
          <Text style={styles.userCode}>* {item.telephone}</Text>
        </View>

        </View>

        {expandedItems.includes(item.code_stagiaire) && (
          
          <View>
            <View style={{marginBottom:20}}></View>
            <TouchableOpacity
              style={styles.followButton} onPress={() => navigation.navigate('Details stagiaires',{item})}>
              <Text style={styles.followButtonText}>Informations</Text>
            </TouchableOpacity>
            <View style={{marginBottom:10}}></View>
            <TouchableOpacity
              style={styles.followButton2} onPress={() => navigation.navigate('Liste des taches',{item})}>
              <Text style={styles.followButtonText2}>Tâches</Text>
            </TouchableOpacity>
            <View style={{marginBottom:10}}></View>
            <TouchableOpacity
              style={styles.followButton} onPress={() => navigation.navigate('Fiches de notation',{item})}>
              <Text style={styles.followButtonText}>Fiche de notation</Text>
            </TouchableOpacity>
            <View style={{marginBottom:10}}></View>
            <TouchableOpacity style={styles.followButton2} onPress={() => navigation.navigate('Choix du theme',{item})}>
               <Text style={styles.followButtonText2}>Thème de stage</Text>
            </TouchableOpacity>

          </View>
          )}
     
     </TouchableOpacity>
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
    padding: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 10,
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
    fontSize: 12,
    color: '#888',
    //fontWeight: 'bold',
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
  experienceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12,
  },
  followButton2: {
    backgroundColor: 'white',
    borderColor:'#007BFF',
    borderWidth:1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButtonText2: {
    color: '#007BFF',
  },
});

