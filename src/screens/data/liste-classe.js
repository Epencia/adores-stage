import React , {useEffect, useState, useContext , useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput,ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function ListeClasse({navigation,item}) {

 
    // liste des categories
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [user, setUser] = useContext(GlobalContext);
  
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = () => {
      setRefreshing(true); // Indiquer que le rafraîchissement est en cours
      getListePlateforme(); // Appeler la fonction de récupération des données
      setRefreshing(false); // Indiquer que le rafraîchissement est terminé
    };

  
  
  
  useEffect(()=>{
    navigation.setOptions({ title: "Classes" });
    // Exécuter la fonction avec cache
    const delay = 10000; // Définir le délai à 1 minute
    getListePlateforme(); 
    // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
    const intervalId = setInterval(getListePlateforme2, delay);
    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
    return () => clearInterval(intervalId);
  },[])
  
  

  const getListePlateforme = async () => {
    setIsLoading(true);
   try {
    const response = await fetch(`https://adores.tech/api/data/liste-classe.php`, {
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
  
  // liste 2
  const getListePlateforme2 = async () => {
   try {
    const response = await fetch(`https://adores.tech/api/data/liste-classe.php`, {
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
        item.intitule_classe.toLowerCase().includes(searchTerm.toLowerCase())||
        item.categorie_classe.toLowerCase().includes(searchTerm.toLowerCase())
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
        keyExtractor={(item) => item.code_classe}
        renderItem={({item}) => (

        <TouchableOpacity style={styles.videoContainer} onPress={() => navigation.navigate('Matiere par classe',{item})}>
                       {item.photo64 ? (
            <Image
alt=""
resizeMode="cover"
source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
style={styles.videoThumbnail}
/>
) : (
    
    <View style={[styles.cardIcon, { backgroundColor: "#007BFF" }]}>
                <MaterialCommunityIcons color="white" name='bag-checked' size={20} />
              </View>

  )}
      

      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.intitule_classe}</Text>
        <Text style={styles.videoChannel}>{item.categorie_classe}</Text>
      </View>
    </TouchableOpacity>

      )}/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8, // Bordures arrondies
    borderWidth: 1,
    borderColor: '#ccc',
    padding:10,
  },
  videoThumbnail: {
    width: 46,
    height: 46,
    borderRadius: 12,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoChannel: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  videoViews: {
    fontSize: 14,
    color: 'gray',
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

