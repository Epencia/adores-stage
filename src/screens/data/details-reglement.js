import React , {useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';



export default function DetailsReglement ({ route, navigation }) {

  const { width: windowWidth } = useWindowDimensions();

  const { item } = route.params;
  const [error, setError] = useState(null);

  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];
  


  useEffect(()=>{
    navigation.setOptions({title: item.titre_reglement});

},[])



  return (
    <ScrollView style={styles.container}>


      <View style={styles.post}>

        <Text style={styles.username}>{item.titre_reglement}</Text>

      </View>

      <View style={styles.postInfo}>

        <HTML source={{ html: item.details_reglement }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}/>
        
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
    width: '100%', 
    marginTop: 5,
    marginBottom:20,
    borderRadius: 15, 
    padding: 10, 
    borderWidth: 1, 
    borderColor: 'gray' 
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign:'center'
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
