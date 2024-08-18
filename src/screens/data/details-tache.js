import React , {useEffect, useState, useContext } from 'react';
import {SafeAreaView,ScrollView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,Linking} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../global/GlobalState';
import { StagiaireContext } from '../../global/StagiaireState';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';



export default function DetailsTaches ({navigation,route}) {

  const { width: windowWidth } = useWindowDimensions();
  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];

  // liste des categories
const {item} = route.params;
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);


const [stagiaire, setStagiaire] = useContext(StagiaireContext);


const [inputValues, setInputValues] = useState({});

const [reponse, setReponse] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});



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
  ListeContactFiliere();
    navigation.setOptions({title: item.titre_tache});
    setStagiaire(item.code_stagiaire);
    
},[])


 // validation
 const ListeContactFiliere = () =>{

  fetch(`https://adores.tech/api/data/liste-contact-filiere.php?filiere=${item.filiere}`,{
    method:'post',
    header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    
})
.then((response) => response.json())
  .then((result) => {
    setData(result);
      }
 )
 .catch((error)=>{
  setError(error);
 });

}

// in


const handleInputChange = (taskId, text) => {
  setInputValues((prev) => ({ ...prev, [taskId]: text }));
};


  return (

    <View style={{ flex: 1, backgroundColor: '#fff' }}>

    <View style={styles.container}>

    <ScrollView> 
   
    <View style={styles.experienceItem}>
        <TouchableOpacity  onPress={() => toggleItem("1")}> 
        <View style={styles.userInfo}>
          <Text style={styles.userName}>TÂCHE</Text>
        </View>
        {expandedItems.includes("1") && (
          <View>
             <View>
        <Text style={styles.description}>{item.titre_tache ? item.titre_tache : "Aucune tache"}</Text>
        </View>
 
  
        </View>
      )}
        </TouchableOpacity>
      </View>



      
      <View style={styles.experienceItem}>
        <TouchableOpacity  onPress={() => toggleItem("2")}> 
        <View style={styles.userInfo}>
          <Text style={styles.userName}>STAGIAIRE</Text>
        </View>
        {expandedItems.includes("2") && (
          <View>
             <View>
        <Text style={styles.description}>{item.nom_prenom ? item.nom_prenom : "Aucun stagiaire"}</Text>
        </View>
 
  
        </View>
      )}
        </TouchableOpacity>
      </View>


      
      <View style={styles.experienceItem}>
        <TouchableOpacity  onPress={() => toggleItem("3")}> 
        <View style={styles.userInfo}>
          <Text style={styles.userName}>COURS</Text>
        </View>
        {expandedItems.includes("3") && (
          <View>
             <View>
        <HTML source={{ html: item.cours_tache ? item.cours_tache : "Aucun cours" }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags} />
        </View>
 
  
        </View>
      )}
        </TouchableOpacity>
      </View>


      
      <View style={styles.experienceItem}>
        <TouchableOpacity  onPress={() => toggleItem("4")}> 
        <View style={styles.userInfo}>
          <Text style={styles.userName}>EXEMPLE</Text>
        </View>
        {expandedItems.includes("4") && (
          <View>
             <View>
        <HTML source={{ html: item.exemple_tache ? item.exemple_tache : "Aucun exemple" }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags} />
        </View>
 
  
        </View>
      )}
        </TouchableOpacity>
      </View>


      
      <View style={styles.experienceItem}>
        <TouchableOpacity  onPress={() => toggleItem("5")}> 
        <View style={styles.userInfo}>
          <Text style={styles.userName}>TRAVAIL À FAIRE</Text>
        </View>
        {expandedItems.includes("5") && (
          <View>
             <View>
        <HTML source={{ html: item.travail_tache ? item.travail_tache : "Aucun travail à faire" }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags} />
        </View>
 
  
        </View>
      )}
        </TouchableOpacity>
      </View>
      
      </ScrollView>
      </View>
      

<View style={styles.overlay}>
<TouchableOpacity
    onPress={() => {
      let whatsappURL;
      if (data && data.length > 0 && data[0] && data[0].libelle) {
        whatsappURL = data[0].libelle;
        Linking.openURL(whatsappURL);
      } else {
        navigation.navigate("Maitre de stage");
      }
    }}
  style={{ flex: 1 }}>
  <View style={styles.btn}>
    <Text style={styles.btnText}>Réaliser la tâche</Text>
    <MaterialCommunityIcons
      color="#fff"
      name="arrow-right-circle"
      size={18}
      style={{ marginLeft: 12 }}
    />
  </View>
</TouchableOpacity>
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
  input2: {
    color:"#777777", 
    marginLeft: 15,
    marginRight: 15
  },
  inputError: {
    borderColor: 'red', // Couleur de bordure rouge en cas d'erreur
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
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
    //flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    width:'100%'
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});

