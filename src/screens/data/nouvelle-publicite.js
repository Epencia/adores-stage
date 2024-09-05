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
import { GlobalContext } from '../../global/GlobalState';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HTML from 'react-native-render-html';

export default function NouvellePublicite({ navigation }) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [user, setUser] = useContext(GlobalContext);
  const [titre, setTitre] = useState('');
  const [lien, setLien] = useState('');
  const [description, setDescription] = useState('');

  // images
  const [photo, setPhoto] = useState(null);
  const [TypePhoto, setTypePhoto] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageExtension, setSelectedImageExtension] = useState('');
  const [selectedImageBlob, setSelectedImageBlob] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: 'Nouvelle publication'});
  }, []);


   // upload image

   const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    allowsEditing: false,
     aspect: [4, 3],
    });

    if (!result.canceled) {
      setSelectedImage(result);
      const uriParts = result.assets[0].uri.split('.');
        const extension = uriParts[uriParts.length - 1];
        setSelectedImageExtension(`image/${extension}`);
    }
  };

  // validation
  const ValidationStage = () => {
     
    // variable image
    const photo = selectedImage ? selectedImage.assets[0].base64 : null;

    const newErrors = {};

    if (!titre) {
      newErrors.titre = 'Le champ Titre est requis';
    }


    if (!description) {
      newErrors.description = 'Le champ Description est requis';
    }

    if (!photo) {
      newErrors.Photo = 'Veuillez choisir une photo';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aucune erreur, soumettez le formulaire ici
      fetch('https://adores.tech/api/data/nouvelle-publicite.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
                  proprietaire : user[0].matricule,
                  titre_publicite: titre,
                  lien_publicite: lien,
                  details_publicite : description,
                  photo : photo,
                  TypePhoto : selectedImageExtension,
          
        })
        
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
        alert(responseJson);
        setIsSubmitting(false); // Reset submitting state after data is sent
        setTitre('');
        setLien('');
        setDescription('');
        setSelectedImage(null);
       })
       .catch((error)=>{
       alert(error);
       setIsSubmitting(false); // Reset submitting state after data is sent
       });

      setIsSubmitting(true);
      // ...
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

<View style={styles.container}>
      <ScrollView style={styles.form}>

      {selectedImage ? (
      
      <View style={styles.profileImageContainer}>
      
      <TouchableOpacity style={[
            styles.postImage,
            errors.Photo && styles.inputError, // Ajoutez des styles d'erreur conditionnels
           ]} onPress={selectImage}>
          

        
            <Image
                source={{ uri: selectedImage.assets[0].uri }}
                style={styles.image}
                resizeMode="center"
            />
        
    </TouchableOpacity>
    {errors.Photo && (
          <Text style={styles.errorText}>{errors.Photo}</Text>
        )}
    </View>
    ) : (
      <TouchableOpacity style={styles.button2} onPress={selectImage}>
            <Text style={styles.buttonText2}>Ajouter une image</Text>
            </TouchableOpacity>
      )

  }

        <Text style={styles.label}>Titre * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.titre && styles.inputError, // Ajoutez des styles d'erreur conditionnels
          ]}
          placeholder="Entrez le titre de votre publication"
          onChangeText={(val) => setTitre(val)}
          value={titre}
        />
        {errors.titre ? (
          <Text style={styles.errorText}>{errors.titre}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
        )}



<Text style={styles.label}>Lien ou URL :</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez un URL pour votre publication"
          onChangeText={(val) => setLien(val)}
          value={lien}
        />
        <Text style={styles.errorText}></Text>


        <Text style={styles.label}>Description * :</Text>
        <TextInput
          style={[
            styles.textarea,
            errors.description && styles.inputError,
          ]}
          multiline={true}
          numberOfLines={4} // Nombre de lignes visibles à l'écran
          placeholder="Entrez la description de votre publication"
          onChangeText={(val) => setDescription(val)}
          value={description}
        />
        {errors.description ? (
          <Text style={styles.errorText}>{errors.description}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
        )}

        

        
      </ScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          backgroundColor: 'blue',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Liste publicite')} 
      >
        <FeatherIcon name="plus" size={30} color="white" />
      </TouchableOpacity>
      </View>

      <View style={styles.overlay}>
        <View
          style={{ flex: 1, paddingHorizontal: 4 }}>
          <TouchableOpacity style={styles.button} onPress={ValidationStage}>
          <Text style={styles.buttonText}>
          Publier
      </Text>
          </TouchableOpacity>
        </View>
      </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fond blanc
    padding: 16,
    marginBottom:60
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
    //marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red', // Couleur de bordure rouge en cas d'erreur
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
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
  button2: {
    backgroundColor: 'white',
    borderColor: '#266EF1',
    borderWidth:1,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom:16
  },
  buttonText2: {
    color: '#266EF1',
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
  width: '100%',
  height: '100%', // L'image occupe tout l'espace du conteneur
  resizeMode: 'cover',
  borderRadius: 8,
},
profileImageContainer: {
  flex: 1, // Utilisez flex pour aligner au centre
      justifyContent: 'center', // Alignez verticalement au centre
      alignItems: 'center', // Alignez horizontalement au centre
      backgroundColor: '#fff',
    },
    postImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
      },
    textarea: {
        height: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        //marginBottom: 16,
        paddingHorizontal: 8,
        textAlignVertical: 'top', // Alignez le texte en haut du champ
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
        paddingTop: 12,
        paddingHorizontal: 16,
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
});
