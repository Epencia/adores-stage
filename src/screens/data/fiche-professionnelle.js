import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View,StyleSheet,Text, TouchableOpacity, Linking,Alert } from 'react-native';
import { GlobalContext } from '../../global/GlobalState';
import * as WebBrowser from 'expo-web-browser';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FicheProfessionnelle({ navigation }) {

  const [user, setUser] = useContext(GlobalContext);

  const pdfUrl = `https://www.adores.tech/api/data/fiche-professionnelle.php?matricule=${user[0].matricule}`;


  useEffect(() => {
    navigation.setOptions({ title: 'Fiche professionnelle' });
  },[]);


  const handleDownloadPdf = async () => {

   try {
    const response = await fetch(`https://adores.tech/api/data/verification-fiche-professionnelle.php?matricule=${user[0].matricule}`, {
      headers: {
        //'Cache-Control': 'no-cache',
      },
    });
    const newData = await response.json();
    Linking.openURL(pdfUrl);
  } catch (error) {
    Alert.alert("Message","Votre fiche professionnelle n'est pas encore disponible !");
  }
  }

  return (
    <View style={styles.container}>
      
       <MaterialCommunityIcons color="#266EF1" name="download-box-outline" size={150}/>
       <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10,textAlign:'center'}}>
      Télécharger ou visualiser votre fiche professionnelle via un navigateur ou une lecteur de fichier
          </Text>
      <TouchableOpacity onPress={handleDownloadPdf} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Télécharger</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:16,
    backgroundColor:'white'
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    left: '30%', // Au centre horizontalement
    right: '30%',
    width: 150,
    backgroundColor: '#0099cc',
    padding: 10,
    borderRadius: 5,
  },
  
downloadButtonText: {
color: 'white',
fontSize: 16,
textAlign: "center"
},
});
