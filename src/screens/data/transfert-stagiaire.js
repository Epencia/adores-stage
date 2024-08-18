import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,ScrollView,
  TouchableOpacity,Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { GlobalContext } from '../../global/GlobalState';


export default function TransfertStagiaire({navigation})  {
       

    const [DataStagiaire,setDataStagiaire] = useState('');
    const [DataMatricule,setDataMatricule] = useState('');

    const [user, setUser] = useContext(GlobalContext);
   

    const [formattedData, setFormattedData] = useState([]);

  
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission
  const [errors, setErrors] = useState({}); // Add a state to hold the error messages


  useEffect(()=>{
    getListeInscritsStage();
    navigation.setOptions({title: 'Transfert de stagiaire'});
    
    },[])


  // PHP MYSQL


  // sans variables sessions
const getListeInscritsStage = () => {
  
  fetch(`https://adores.tech/api/data/liste-demande-stage-matricule.php?matricule=${user[0].matricule}`,{
    method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
      
  })
  .then((response) => response.json())
   .then(
       (result)=>{
        if (result !== null) {
        
       
          // Format the data into the required format for the SelectList component
                  const formattedResult = result.map((item) => ({
                    
                    key: item.code_stagiaire, // Replace 'id' with the unique key property from the data
                    value: item.nom_prenom, // Replace 'name' with the property you want to display in the SelectList
                  }));
                  setFormattedData(formattedResult);
                } else {
                  setFormattedData([]);
        }
        }
   )
   .catch((error)=>{
alert(error);
   });
  
  }
  
  // In des mobile money
  const ValidationTransfert = () =>{


    if (!DataMatricule || !DataStagiaire) {
      setErrors({
        // Update error state with appropriate error messages
        DataMatricule: !DataMatricule ? 'Le champ Matricule est requis' : '',
        DataStagiaire: !DataStagiaire ? 'Le champ Stagiaire est requis' : '',
      });
      return;
    }

    setIsSubmitting(true); // Set submitting state to true while sending the data
    
		
		fetch('https://adores.tech/api/data/transfert-stagiaire.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				matricule: DataMatricule,
				code: DataStagiaire,
        
			})
			
			
		})
		.then((response) => response.json())
		 .then((responseJson)=>{
      alert(responseJson);
      setIsSubmitting(false);
      setDataMatricule('');
      setDataStagiaire('');
		 })
		 .catch((error)=>{
      alert(error);
      setIsSubmitting(false);
		 });
		
		
		
	
	}

  // in


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.form}>



<Text style={styles.label}>Stagiaire * :</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => {
            setDataStagiaire(value);
            //console.log(value);
          }}
          items={
            formattedData.map((item) => ({
            label: item.value,
            value: item.key,
          }))}
          placeholder={{ label: '===  Faites votre choix  ===', value: '' }}
          useNativeAndroidPickerStyle={false}
          style={{
            inputIOS: [
              styles.inputIOS,
              errors.DataStagiaire && styles.inputError,
            ],
            inputAndroid: [
              styles.inputAndroid,
              errors.DataStagiaire && styles.inputError,
            ],
            placeholder: styles.placeholder,
          }}
        />
      </View>
      {errors.DataStagiaire && (
        <Text style={styles.errorText}>{errors.DataStagiaire}</Text>
      )}


<Text style={styles.label}>Matricule * :</Text>
    <TextInput 
       label="Matricule *" 
       variant="standard" 
       keyboardType="numeric"
       placeholder="Saisir le matricule"
       minLength={5}
       onChangeText={(val) => setDataMatricule(val)}
       style={[
        styles.input,
        errors.DataMatricule && styles.inputError,
      ]}
       value={DataMatricule}
    />
    {errors.DataMatricule && (
          <Text style={styles.errorText}>{errors.DataMatricule}</Text>
        )}
    
    


  <TouchableOpacity style={styles.button} onPress={ValidationTransfert}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red', // Couleur de bordure rouge en cas d'erreur
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginTop:-10,
  },
  button: {
    marginTop:20,
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  picker: {
    //height: 40, // Ajoutez ou ajustez la hauteur comme nécessaire
    alignItems: 'center', // Ajoutez cette ligne pour centrer verticalement le texte
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginTop: 1,
    borderWidth: 1,
    borderColor: 'gray', // Couleur du cercle
},
image: {
  flex: 1,
  height: undefined,
  width: undefined,
},
profileImageContainer: {
  flex: 1, // Utilisez flex pour aligner au centre
      justifyContent: 'center', // Alignez verticalement au centre
      alignItems: 'center', // Alignez horizontalement au centre
      backgroundColor: '#fff',
    },
    inputIOS: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 4,
      color: 'black',
      width: '100%',
      height: 40,
    },
    inputAndroid: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 4,
      color: 'black',
      width: '100%',
      height: 40,
    },
    placeholder: {
      color: 'gray',
    },
});




