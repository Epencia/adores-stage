import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MenuDecouvrir({navigation,item}) {

    // api recherche
    const [searchTerm, setSearchTerm] = useState('');  
    const searchItems = useMemo(() => {
      return () => {
      const filteredData = data.filter(item =>
        item.titre_publicite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vues_publicite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase())  ||
        item.date_publicite.toLowerCase().includes(searchTerm.toLowerCase())        
      );
      return filteredData;
    };
  }, [data, searchTerm]);
    // api recherche
    
        // liste des categories
      const [isLoading, setIsLoading] = useState(false);
      const [data, setData] = useState([]);
      const [error, setError] = useState(null);
      const [user, setUser] = useContext(GlobalContext);
    
    
      const [refreshing, setRefreshing] = useState(false);
      const handleRefresh = () => {
        setRefreshing(true); // Indiquer que le rafraîchissement est en cours
        getListePublicite(); // Appeler la fonction de récupération des données
        setRefreshing(false); // Indiquer que le rafraîchissement est terminé
      };
    
    
    
    useEffect(()=>{
    navigation.setOptions({title: 'Découvrir'});
        // Exécuter la fonction avec cache
    const delay = 10000; // Définir le délai à 1 minute
    getListePublicite(); 
    // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
    const intervalId = setInterval(getListePublicite2, delay);
    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
    return () => clearInterval(intervalId);
    },[])
    

    // liste
    const getListePublicite = async () => {
      setIsLoading(true);
     try {
      const response = await fetch(`https://adores.tech/api/data/liste-journal.php`, {
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
    const getListePublicite2 = async () => {
     try {
      const response = await fetch(`https://adores.tech/api/data/liste-journal.php`, {
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
            keyExtractor={(item) => item.id_publicite}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.postContainer} onPress={() => navigation.navigate('Details publicite',{item})}>
                <View style={styles.userInfo}>
                {item.photo64 ? (
                <Image
    alt=""
    source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
    style={styles.userImage}
    />
    ) : (
    <Image
    alt=""
    source={require("../../assets/images/user.jpg")}
    style={styles.userImage}
    />
      )}
    
                  <Text style={styles.username} ellipsizeMode="tail">{item.nom_prenom}</Text>
                </View>
                
    
                {item.photo64_publicite ? (
                  <View>
                  <Text style={styles.postText}>{item.titre_publicite}</Text>
                <Image
    source={{ uri: `data:${item.type_photo};base64,${item.photo64_publicite.toString('base64')}` }}
    style={styles.postImage}
    />
    </View>
    
    ) : (
    <View style={styles.placeholderImage}>
        <Text style={styles.placeholderText}>{item.titre_publicite}</Text>
      </View>
      )}
    
                <View style={styles.footer}>
                  <Text style={styles.date}>{moment(item.date_publicite).format('DD-MM-YYYY')}</Text>
                  <Text style={styles.views}>{item.vues_publicite} vues</Text>
                </View>
              </TouchableOpacity>
            )}
          />

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
  },
  videoThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  videoTitle: {
    fontSize: 16,
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
  postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 16,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  views: {
    fontSize: 12,
    color: 'gray',
  },
  placeholderImage: {
  width: '100%',
  height: 200,
  borderRadius: 8,
  backgroundColor: 'lightgray',
  justifyContent: 'center',
  alignItems: 'center',
  padding:5
},
placeholderText: {
  fontSize: 18,
  fontWeight: 'bold',
  textAlign:'justify',
  color: 'black',
},
});

