import React , {useEffect, useState, useContext, useMemo } from 'react';
import { View,StyleSheet,Text, TouchableOpacity, Linking } from 'react-native';
import PDFReader from '@valli_/rn-pdf-reader-js';

export default function PDF({ navigation,route }) {


  const [pdfUri, setPdfUri] = React.useState(null);
  const {item} = route.params;


  const handleDownloadPdf = () => {
      Linking.openURL(`data:${item.type};base64,${item.photo64.toString('base64')}`);
  };

    
  
  // In transactions entrees


  useEffect(()=>{
    navigation.setOptions({ title: "Format PDF" });
 

  },[])

  return (
    <View style={{ flex: 1 }}>
      <PDFReader
        source={{ uri: `data:application/pdf;base64,${item.photo64.toString('base64')}` }}
       // onLoad={handleLoad}
      />
      <TouchableOpacity onPress={handleDownloadPdf} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Télécharger</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
