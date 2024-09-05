import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Linking,TouchableOpacity,Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PDFURL({ navigation,route }) {
  const { item } = route.params;
  const pdfUrl = item.url_cours || 'https://adores.tech/upload/erreur.pdf'; // URL du PDF

  useEffect(() => {
    navigation.setOptions({ title: item.titre_cours });
  }, []);

  const handleDownloadPdf = () => {
    Linking.openURL(item.url_cours);
};

  return (
    <View style={styles.container}>
      
       <MaterialCommunityIcons color="#266EF1" name="download-box-outline" size={150}/>
       <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10,textAlign:'center'}}>
      Télécharger ou visualiser le document via un navigateur ou une lecteur de fichier
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
    backgroundColor: "#1F41BB",
    padding: 10,
    borderRadius: 5,
  },
  
downloadButtonText: {
color: 'white',
fontSize: 16,
textAlign: "center"
},
});
