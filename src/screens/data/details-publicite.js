import React , {useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import moment from 'moment';



export default function DetailsPublicite ({ route, navigation }) {

  const { width: windowWidth } = useWindowDimensions();

  const { item } = route.params;
  const [error, setError] = useState(null);

  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];

  const [NombreVue, setNombreVue] = useState(0);


  useEffect(()=>{
    navigation.setOptions({title: item.titre_publicite});
    getAjoutVues();
    getNombreVues();

},[])


// ajout de vue
const getAjoutVues = () =>{
fetch(`https://adores.tech/api/data/ajout-vue-publicite.php?id=${item.id_publicite}`,{
  
method:'post',
  header:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
  },
  
})
.then((response) => response.json())
.then(
   (result)=>{
    
    }
)
.catch((error)=>{
setError(error);
});

}

// nombre de vues
const getNombreVues = () =>{
  fetch(`https://adores.tech/api/data/nombre-vue-publicite.php?id=${item.id_publicite}`,{
    
  method:'post',
    header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    
  })
  .then((response) => response.json())
  .then(
     (result)=>{
      setNombreVue(result);
      }
  )
  .catch((error)=>{
  setError(error);
  });
  
  }

// In des mobile money

  return (
    <ScrollView style={styles.container}>


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


        <Text style={styles.username}  ellipsizeMode="tail">{item.nom_prenom}</Text>
      </View>

      <View style={styles.post}>

      {item.photo64_publicite ? (
            <Image
alt=""
source={{ uri: `data:${item.type_photo};base64,${item.photo64_publicite.toString('base64')}` }}
style={styles.postImage}
/>

) : (

<View style={styles.placeholderImage}>
    <Text style={styles.placeholderText}>{item.titre_publicite}</Text>
  </View>
  )}

<View style={styles.footer}>
              <Text style={styles.date}>{moment(item.date_publicite).format('DD-MM-YYYY')}</Text>
              <Text style={styles.date}>{item.heure_publicite}</Text>

{NombreVue ? (
    <Text style={styles.views}>{NombreVue[0].vues_publicite} vues</Text>
  ) : (
    <Text style={styles.views}>0 vue</Text>
  )}

            </View>
        

            {item.photo64_publicite ? (
        <Text style={styles.username}>{item.titre_publicite}</Text>
        ) : (
          <Text style={styles.username}></Text> 
          )}



      </View>

      <View style={styles.postInfo}>

        <HTML source={{ html: item.details_publicite }} contentWidth={windowWidth} 
              ignoredDomTags={ignoredDomTags} tagsStyles={{
                p: { textAlign: "justify" } 
              }}
              />
        
      </View>
   
    </ScrollView > 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
  post: {
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  postText: {
    fontSize: 16,
    color: '#333',
    textAlign:'justify'
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom:10
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
