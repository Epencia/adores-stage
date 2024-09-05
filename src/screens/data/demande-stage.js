import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';


export default function DemandeStage({ navigation, item }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [NomPrenom, setNomPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [TypeStage, setTypeStage] = useState('');
  const [statut, setStatut] = useState('');
  const [AnneeDiplome, setAnneeDiplome] = useState('');
  const [Cycle, setCycle] = useState('');
  const [Filiere, setFiliere] = useState('');
  const [cycles, setCycles] = useState([]);
  const [filieres, setFilieres] = useState([]);

  // Images
  const [photo, setPhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageExtension, setSelectedImageExtension] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: 'Demande de stage' });
    fetchCycles();
  }, []);

  useEffect(() => {
    if (Cycle) {
      fetchFilieres(Cycle);
    }
  }, [Cycle]);

  // Upload image
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

  // Validation
  const ValidationStage = () => {
    // Variable image
    const photo = selectedImage ? selectedImage.assets[0].base64 : null;

    const newErrors = {};

    if (!NomPrenom) {
      newErrors.NomPrenom = 'Le champ Nom et prénoms est requis';
    }

    if (!telephone) {
      newErrors.telephone = 'Le champ Téléphone est requis';
    }

    if (!TypeStage) {
      newErrors.TypeStage = 'Veuillez sélectionner un type de stage';
    }

    if (!statut) {
      newErrors.statut = 'Veuillez sélectionner un statut';
    }

    if (!AnneeDiplome) {
      newErrors.AnneeDiplome = 'Le champ Année du diplôme est requis';
    }

    if (!Cycle) {
      newErrors.Cycle = 'Veuillez sélectionner un cycle';
    }

    if (!Filiere) {
      newErrors.Filiere = 'Veuillez sélectionner une filière';
    }


    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aucune erreur, soumettez le formulaire ici
      fetch('https://adores.tech/api/data/demande-stage.php', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          matricule: '',
          nom_prenom: NomPrenom,
          telephone: telephone,
          type_stage: TypeStage,
          statut: statut,
          annee_diplome: AnneeDiplome,
          diplome: Cycle,
          filiere: Filiere,
          photo: photo,
          TypePhoto: selectedImageExtension,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert("Message",responseJson);
          setIsSubmitting(false); // Reset submitting state after data is sent
          setNomPrenom('');
          setTypeStage('');
          setStatut('');
          setAnneeDiplome('');
          setTelephone('');
          setCycle('');
          setFiliere('');
          setSelectedImage(null);
        })
        .catch((error) => {
            Alert.alert("Message",error);
          setIsSubmitting(false); // Reset submitting state after data is sent
        });

      setIsSubmitting(true);
    }
  };

  // Fetch filieres
  const fetchFilieres = async (cycle) => {
    try {
      const response = await fetch(`https://adores.tech/api/data/liste-filiere-cycle.php?cycle=${cycle}`);
      const data = await response.json();
      setFilieres(data);
    } catch (error) {
        Alert.alert("Message",error);
    }
  };

  // Fetch cycles
  const fetchCycles = async () => {
    try {
      const response = await fetch(`https://adores.tech/api/data/liste-cycle.php`);
      const data = await response.json();
      setCycles(data);
    } catch (error) {
        Alert.alert("Message",error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <ScrollView style={styles.form}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.label}>Ajouter votre photo :</Text>
            <TouchableOpacity
              style={[
                styles.profileImage,
                errors.Photo && styles.inputError, // Ajoutez des styles d'erreur conditionnels
              ]}
              onPress={selectImage}
            >
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage.assets[0].uri }}
                  style={styles.image}
                  resizeMode="center"
                />
              ) : (
                <View />
              )}
            </TouchableOpacity>
            {errors.Photo && (
              <Text style={styles.errorText}>{errors.Photo}</Text>
            )}
          </View>

          <Text style={styles.label}>Cycle * :</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={Cycle}
              style={[
                styles.picker,
                errors.Cycle && styles.pickerError,
              ]}
              onValueChange={(val) => setCycle(val)}
            >
              <Picker.Item label="===== Faites votre choix ======" value="" />
              {cycles.map((cycle) => (
                <Picker.Item key={cycle.code_cycle} label={cycle.intitule_cycle} value={cycle.code_cycle} />
              ))}
            </Picker>
          </View>
          {errors.Cycle && (
            <Text style={styles.errorText}>{errors.Cycle}</Text>
          )}

          <Text style={styles.label}>Filière * :</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={Filiere}
              style={[
                styles.picker,
                errors.Filiere && styles.pickerError,
              ]}
              onValueChange={(val) => setFiliere(val)}
              enabled={!!Cycle}
            >
              <Picker.Item label="===== Faites votre choix ======" value="" />
              {filieres.map((filiere) => (
                <Picker.Item key={filiere.code_filiere} label={filiere.intitule_filiere} value={filiere.code_filiere} />
              ))}
            </Picker>
          </View>
          {errors.Filiere && (
            <Text style={styles.errorText}>{errors.Filiere}</Text>
          )}

          <Text style={styles.label}>Nom et prénoms * :</Text>
          <TextInput
            style={[
              styles.input,
              errors.NomPrenom && styles.inputError,
            ]}
            placeholder="Entrez votre nom et prénoms"
            onChangeText={(val) => setNomPrenom(val)}
            value={NomPrenom}
          />
          {errors.NomPrenom && (
            <Text style={styles.errorText}>{errors.NomPrenom}</Text>
          )}

          <Text style={styles.label}>Téléphone * :</Text>
          <TextInput
            style={[
              styles.input,
              errors.telephone && styles.inputError,
            ]}
            keyboardType="numeric"
            minLength={10}
            maxLength={10}
            placeholder="Entrez votre numéro de téléphone"
            onChangeText={(val) => setTelephone(val)}
            value={telephone}
          />
          {errors.telephone && (
            <Text style={styles.errorText}>{errors.telephone}</Text>
          )}

          <Text style={styles.label}>Année du diplôme * :</Text>
          <TextInput
            style={[
              styles.input,
              errors.AnneeDiplome && styles.inputError,
            ]}
            keyboardType="numeric"
            minLength={4}
            maxLength={4}
            placeholder="Entrez l'année d'obtention du diplôme"
            onChangeText={(val) => setAnneeDiplome(val)}
            value={AnneeDiplome}
          />
          {errors.AnneeDiplome && (
            <Text style={styles.errorText}>{errors.AnneeDiplome}</Text>
          )}

          <Text style={styles.label}>Type de stage * :</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={TypeStage}
              style={[
                styles.picker,
                errors.TypeStage && styles.pickerError,
              ]}
              onValueChange={(val) => setTypeStage(val)}
            >
              <Picker.Item label="===== Faites votre choix ======" value="" />
              <Picker.Item label="Immersion" value="Immersion" />
              <Picker.Item label="Ecole" value="Ecole" />
              <Picker.Item label="Perfectionnement" value="Perfectionnement" />
            </Picker>
          </View>
          {errors.TypeStage && (
            <Text style={styles.errorText}>{errors.TypeStage}</Text>
          )}

          <Text style={styles.label}>Statut * :</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={statut}
              style={[
                styles.picker,
                errors.statut && styles.pickerError,
              ]}
              onValueChange={(val) => setStatut(val)}
            >
              <Picker.Item label="===== Faites votre choix ======" value="" />
              <Picker.Item label="Presentiel" value="Presentiel" />
              <Picker.Item label="En ligne" value="En ligne" />
            </Picker>
          </View>
          {errors.statut && (
            <Text style={styles.errorText}>{errors.statut}</Text>
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={ValidationStage}
            disabled={isSubmitting} // Disable the button while submitting
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Envoi en cours...' : 'Valider'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
  },
  pickerError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    marginTop:-10
  },
  profileImageContainer: {
    marginBottom: 15,
    justifyContent: 'center', // Alignez verticalement au centre
      alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth:1,
    borderColor:'gray'
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
