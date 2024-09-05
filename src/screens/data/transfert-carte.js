import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,ScrollView,
  TouchableOpacity,Image,Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { GlobalContext } from '../../global/GlobalState';


export default function Transfert({navigation})  {
        // variables
    
    const [montant,setMontant] = useState('');
    const [destinataire,setDestinataire] = useState('');

    const [user, setUser] = useContext(GlobalContext);

    const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission
    const [errors, setErrors] = useState({}); // Add a state to hold the error messages
    

  // PHP MYSQL

	
	const ValidationTransfert = () =>{

    if (!montant || !destinataire) {
      setErrors({
        // Update error state with appropriate error messages
        montant: !montant ? 'Le champ Montant est requis' : '',
        destinataire: !destinataire ? 'Le champ Destinataire est requis' : '',
      });
      return;
    }

    setIsSubmitting(true); // Set submitting state to true while sending the data
    
		
		fetch('https://adores.tech/api/data/transfert-carte.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				matricule: user[0].matricule,
				montant: montant,
        destinataire : destinataire,
        
			})
			
			
		})
		.then((response) => response.json())
		 .then((responseJson)=>{
      Alert.alert("Message",responseJson);
      setIsSubmitting(false);
      setMontant('');
      setDestinataire('');
		 })
		 .catch((error)=>{
      Alert.alert("Message",error);
      setIsSubmitting(false);
		 });
		
		
		
	
	}

  // in

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>

      <Text style={styles.label}>Montant * :</Text>
    <TextInput 
    style={[
      styles.input,
      errors.montant && styles.inputError, // Ajoutez des styles d'erreur conditionnels
    ]}
    label="Montant *" 
    variant="standard"
    keyboardType="numeric"
    placeholder="Saisir le montant à transférer"
    onChangeText={(val) => setMontant(val)}
    errorText={errors.montant}
    value={montant}
     />
     {errors.montant && (
          <Text style={styles.errorText}>{errors.montant}</Text>
        )}


<Text style={styles.label}>Destinataire * :</Text>
    <TextInput 
    style={[
      styles.input,
      errors.destinataire && styles.inputError, // Ajoutez des styles d'erreur conditionnels
    ]}
       label="Destinataire *" 
       variant="standard" 
       keyboardType="numeric"
       placeholder="Saisir le matricule"
       onChangeText={(val) => setDestinataire(val)}
       errorText={errors.destinataire}
       value={destinataire}
    />
    {errors.destinataire && (
          <Text style={styles.errorText}>{errors.destinataire}</Text>
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
    marginTop:-10
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  picker: {
    height: 40,
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
});

