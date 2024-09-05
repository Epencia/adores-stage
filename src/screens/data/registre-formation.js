import React, { useState } from 'react';
import {
  StyleSheet,SafeAreaView,View,Image,Text,TextInput,TouchableOpacity, ScrollView ,Button, ActivityIndicator 
} from 'react-native';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegistreFormations({navigation}) {

  const [searchText, setSearchText] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const { width: windowWidth } = useWindowDimensions();

  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];

  const handleSearch = (param) => {

    if (!searchText) {
        setErrors({
          // Update error state with appropriate error messages
          searchText: !searchText ? 'Veuillez renseigner obligatoirement ce champ' : '',
        });
        return;
      }

    setIsSubmitting(true);

    fetch(`https://adores.tech/api/data/registre-formation.php?matricule=${param}`,{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
  })
  .then((response) => response.json())
    .then((result) => {
      setMessage(result);
      setIsSubmitting(false);
        }
   )
   .catch((error)=>{
    setError(error);
    setIsSubmitting(false);
   });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.container}>
      <ScrollView>

      <View style={styles.logoImg}>
      <MaterialCommunityIcons color="#3367D6" name="school-outline" size={175} />
      </View>



      <Text style={styles.title}>Registre de formations</Text>
      <TextInput
        placeholder="Saisir le matricule du diplôme"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        style={[styles.input, { borderColor: errors.searchText ? 'red' : '#EFF1F5' }]} />
{errors.searchText ? (
            <Text style={{ color: 'red', marginTop:-10,marginBottom:15}}>{errors.searchText}</Text>
        ) : null}



<TouchableOpacity onPress={() => handleSearch(searchText)}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Rechercher</Text>
              </View>
      </TouchableOpacity>

      {isSubmitting && (
  <ActivityIndicator size="large" color="blue" />
)}

      <View style={{marginTop:20}}></View>
      <HTML source={{ html: message }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}/>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding : 16
  },
  title: {
    fontSize: 29,
    fontWeight: '600',
    color: '#242424',
    textAlign: 'center',
    marginBottom: 22,
  },
  logoImg: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 44,
    backgroundColor: '#EFF1F5',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginBottom: 12,
    borderWidth : 1,
    borderColor : '#EFF1F5',
    width : '100%'
  },
  /** Form */
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderWidth: 1,
    backgroundColor: '#3367D6',
    borderColor: '#3367D6',
    marginTop: 14,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
