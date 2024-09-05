import React , {useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { GlobalContext } from '../../global/GlobalState';

export default function DetailsAttestationStage({navigation,route}) {

  const { item } = route.params;
  const [user, setUser] = useContext(GlobalContext);

  const url = `https://adores.tech/api/data/details-attestation-stage.php?matricule=${user[0].matricule}`;

  useEffect(()=>{
    navigation.setOptions({title: item.nom_prenom});
    },[])

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: url }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  webview: {
    flex: 1,
    margin: 20,
  },
});
