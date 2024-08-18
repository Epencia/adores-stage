import React , {useEffect, useState, useContext, useMemo } from 'react';
import {StyleSheet,SafeAreaView,View,Text,TouchableOpacity,ActivityIndicator,ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function ChoixFormule({navigation,item}) {

  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [user, setUser] = useContext(GlobalContext);
  //const {item} = route.params;

  useEffect(() => {
    navigation.setOptions({ title: "Formules d'abonnement" });
    getListeFormule(); 
  }, []);


  // liste
  const getListeFormule = async () => {
    setIsLoading(true);
   try {
    const response = await fetch(`https://adores.tech/api/data/liste-formule.php`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    const newData = await response.json();
    setItems(newData);
   setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    setError(error);
  }
  }
  // 2

        // validation
        const ValidationCertification = (formule) =>{
      
            fetch(`https://adores.tech/api/data/certification-compte.php?expediteur=${user[0].matricule}&formule=${formule}`,{
              method:'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
            .then((response) => response.json())
             .then((responseJson)=>{
                  alert(responseJson);
                  }
             )
             .catch((error)=>{
              alert(error);
             });
            }
            // fin validation

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

  const handleCardPress = (index) => {
    setSelectedProfileIndex(index);
    setValue(index);
  };

  return (
    <View  style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
    <ScrollView>
      <View style={styles.container}>


        {items.map(({ profil, cout, taux, details }, index) => {
          const isActive = value === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(index)}>
              <View style={[styles.radio, isActive && styles.radioActive]}>
                <Text style={styles.radioLabel}>{profil}</Text>

                <Text style={styles.radioPrice}>
                  {parseFloat(cout).toLocaleString("fr-FR")} F
                </Text>

                <View style={styles.radioBadge}>
                  <Text style={styles.radioBadgeText}>Réduction de {taux} % sur les prestations</Text>

                </View>

                <Text style={styles.radioDescription}>{details}</Text>

                <View
                  style={[
                    styles.radioInput,
                    isActive && styles.radioInputActive,
                  ]}
                />
              </View>
            </TouchableOpacity>
          );
        })}




      </View>




    </ScrollView>


    <View style={styles.overlay}>
    <TouchableOpacity
    onPress={() => {
      if (selectedProfileIndex !== null && items[selectedProfileIndex]) {
        ValidationCertification(items[selectedProfileIndex].code);
      } else {
        alert("Vous devez d'abord sélectionner une formule.");
      }
    }}
      style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Valider la formule {selectedProfileIndex !== null ? items[selectedProfileIndex].profil : ''}</Text>


      </View>
    </TouchableOpacity>
  </View>

  </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginBottom:60
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  radio: {
    position: 'relative',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  radioActive: {
    borderColor: '#0069fe',
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: '#b3b3b3',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  radioPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f2f2f',
    marginBottom: 12,
  },
  radioBadge: {
    backgroundColor: '#dce9fe',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 12,
    width:'100%'
  },
  radioBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0069fe',
  },
  radioDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: '#848a96',
    textAlign: 'justify'
  },
  radioInput: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#b0b0b0',
  },
  radioInputActive: {
    borderWidth: 7,
    borderColor: '#0069fe',
  },
  button: {
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom:20
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
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
    paddingTop: 10,
    paddingHorizontal: 10,
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
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.45,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
  },
});