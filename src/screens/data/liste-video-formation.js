import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator, Modal, Alert,TextInput} from 'react-native';
import React, {useEffect, useState, useCallback, useMemo} from 'react';
import YoutubePlayer from "react-native-youtube-iframe";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function VideosFormation({navigation,route}) {

  const {item} = route.params;

  const { width: windowWidth } = useWindowDimensions();
  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];
  
  // liste des categories
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getListeVideos(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };

  const [playing, setPlaying] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState({});

  //
  const [selected, setSelected] = React.useState(0);
  const sheet = React.useRef();

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("La lecture de la vidéo est terminée!");
    }
  }, []);


  const toggleDescription = (videoId) => {
    setDescriptionVisible(prevState => ({
      ...prevState,
      [videoId]: !prevState[videoId],
    }));
  };




useEffect(()=>{
navigation.setOptions({title: item.titre_formation});
 // Exécuter la fonction avec cache
 const delay = 60000; // Définir le délai à 1 minute
 getListeVideos(); 
 // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
 const intervalId = setInterval(getListeVideos2, delay);
 // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
 return () => clearInterval(intervalId);
},[])


  // sans variables sessions
  const getListeVideos = async () => {
    setIsLoading(true);
   try {
    const response = await fetch(`https://adores.tech/api/data/liste-video-formation.php?code=${item.id_formation}`, {
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

  const getListeVideos2 = async () => {
   try {
    const response = await fetch(`https://adores.tech/api/data/liste-video-formation.php?code=${item.id_formation}`, {
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

// api recherche
const searchItems = useMemo(() => {
  return () => {
    const filteredData = data.filter(item =>
      item.titre_video.toLowerCase().includes(searchTerm.toLowerCase())
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
    
    <SafeAreaView style={styles.container}>


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
  //style={styles.MyContainer}
  data={searchTerm ? searchItems() : data}
  keyExtractor={item => item.id_video}
  renderItem={({ item }) => (
    <View style={styles.listItem}>
      
      
        <YoutubePlayer
        height={200}
        //play={playing}
        videoId={item.code_video}
        onChangeState={onStateChange}
      />

        <Text style={styles.NomPrenom}>{item.titre_video}</Text>

      <TouchableOpacity onPress={() => toggleDescription(item.id_video)}>
        <View style={styles.toggleButton}>
          <Ionicons
            name={descriptionVisible[item.id_video] ? "chevron-up" : "chevron-down"}
            size={20}
            color='#000'
          />
          {descriptionVisible[item.id_video] ? (
      <Text style={styles.toggleButtonText}>Masquer la description</Text>
    ) : (
      <Text style={styles.toggleButtonText}>Afficher la description</Text>
    )}
        </View>
      </TouchableOpacity>
      {descriptionVisible[item.id_video] && (

        <HTML source={{ html: item.details_video }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}/>
      )}
      
    </View>
    
  )}
/>
     
</SafeAreaView>



  )
}






// styles
const styles = StyleSheet.create({
     // search
     container: {
      flex: 1,
      backgroundColor: 'white', // Fond blanc
      padding: 16,
    },
    

    listItem: {
      marginBottom: 10,
      borderRadius: 8, // Bordures arrondies
      borderWidth: 1,
      borderColor: '#ccc',
      padding:10,
    },
    
      Card : {
       flex : 1,
       flexDirection : 'row',
       paddingHorizontal : 15,
       paddingVertical : 15,
       padding : 10,
       marginBottom : 20,
       marginRight : 15,
       width: "100%",
       
    },
    
    Info : {
      flexDirection: 'row', // Align items horizontally
      alignItems: 'center', // Center items vertically
      marginBottom : 10,
      },
    
    NomPrenom : {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    
    Categorie : {
      fontSize:14,
      fontWeight : '700',
      color : "#0099cc",
      marginRight:20,
      marginBottom:1,
      marginTop:1,
    },
    
    Photo : {
       width : 40,
       height : 40,
       borderRadius : 40/2,
       backgroundColor : '#C0C0C0',
       marginRight : 10,
      },

          centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondu sombre de l'arrière-plan
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },


          iconButton: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          },
          iconContainer: {
            width: 40,
            height: 40,
            backgroundColor: 'transparent', // Ajustez la couleur de fond selon vos besoins
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            borderWidth: 1, // Ajoutez une bordure autour de l'icône
            borderColor: 'blue', // Couleur de la bordure
            borderRadius: 20, // Pour arrondir la bordure
          },

          iconText: {
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 'bold',
          },
          overlay: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            flexDirection: 'column',
            alignItems: 'stretch',
            paddingTop: 2,
            paddingHorizontal: 16,
            paddingBottom: 28,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          },
          btnSecondary: {
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
          btnSecondaryText: {
            fontSize: 18,
            lineHeight: 26,
            fontWeight: '600',
            color: 'white',
          },
          sheetHeader: {
            paddingVertical: 24,
          },
          sheetTitle: {
            fontSize: 15,
            fontWeight: '700',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: '#bcbdd9',
            marginBottom:10
          },
          sheetText: {
            fontSize: 22,
            fontWeight: '600',
            textAlign: 'center',
            color: '#000000',
            marginTop: 12,
          },
          sheetBody: {
            padding: 24,
          },
          sheetBodyOptions: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 1,
            marginHorizontal: -16,
          },
          sheetBodyOption: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'transparent',
            borderRadius: 12,
            marginHorizontal: 16,
            paddingVertical: 28,
          },
          sheetBodyOptionText: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 12,
            color: '#bcbdd9',
            textAlign:'center'
          },
          delimiter: {
            height: '100%',
            width: 1,
            backgroundColor: '#ebebf5',
          },

          sheet: {
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
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
        });