import React, { useEffect,useState, useContext } from "react";
import {
  StyleSheet,SafeAreaView,View,Image,Text,TextInput,TouchableOpacity, ScrollView ,Linking, ActivityIndicator 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../global/GlobalState';
import { MaterialIcons } from '@expo/vector-icons';

export default function Inscription({navigation})  {
    // variables
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [NomPrenom, setNomPrenom] = useState('');
    const [user, setUser] = useContext(GlobalContext);
    
    const [visible, setVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const hideDialog = () => setVisible(false);

    const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission
    const [errors, setErrors] = useState({}); // Add a state to hold the error messages
  
  // PHP MYSQL
  useEffect(()=>{
    navigation.setOptions({title: 'Bienvenue à Adorès'});
  },[])


  const ValidationInscription = () => {

    if (!username || !telephone || !password || !NomPrenom) {
      setErrors({
        // Update error state with appropriate error messages
        username: !username ? 'Le champ Nom utilisateur est obligatoire' : '',
        password: !password ? 'Le champ Mot de passe est obligatoire' : '',
        NomPrenom: !NomPrenom ? 'Le champ Nom et Prénoms est obligatoire' : '',
        telephone: !telephone ? 'Le champ Téléphone est obligatoire' : '',
      });
      return;
    }

    setIsSubmitting(true); // Set submitting state to true while sending the data
   
    fetch('https://adores.tech/api/data/abonnement.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				telephone: telephone,
        nom_prenom : NomPrenom,
        login : username,
        mdp : password,
        
			})
			
			
		})
		.then((response) => response.json())
		 .then((responseJson)=>{
      alert(responseJson);
      setUsername('');
      setPassword('');
      setTelephone('');
      setNomPrenom('');
    // Stop the ActivityIndicator
    setIsSubmitting(false);
		 })
		 .catch((error)=>{
		 alert(error);
		 });
  };

  // in

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <ScrollView>
          <Image
            alt="Adorès"
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={styles.logoImg} />

          <View style={styles.form}>
            <Text style={styles.title}>Ouvrir un compte</Text>

            <Text style={styles.subtitle}>
            Veuillez fournir toutes vos informations ci-dessous pour créer un nouveau compte.
            </Text>

            <TextInput
            label="Nom & prénoms"
              placeholder="Nom & Prénoms"
              placeholderTextColor="#A5A5AE"
              onChangeText={(val) => setNomPrenom(val)}
              errorText={errors.NomPrenom}
              value={NomPrenom}
              style={[styles.input, { borderColor: errors.NomPrenom ? 'red' : '#EFF1F5' }]} />
            {errors.NomPrenom ? (
            <Text style={{ color: 'red', marginTop:-10,marginBottom:15}}>{errors.NomPrenom}</Text>
            ) : null}

            <TextInput
              label="Téléphone"
              placeholder="Téléphone (10 chiffres)"
              placeholderTextColor="#A5A5AE"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(val) => setTelephone(val)}
               errorText={errors.telephone}
              value={telephone}
              style={[styles.input, { borderColor: errors.telephone ? 'red' : '#EFF1F5' }]} />
{errors.telephone ? (
            <Text style={{ color: 'red', marginTop:-10,marginBottom:15}}>{errors.telephone}</Text>
            ) : null}

           <TextInput
           label="Nom utilisateur"
              placeholder="Nom utilisateur"
              placeholderTextColor="#A5A5AE"
              onChangeText={(val) => setUsername(val)}
              errorText={errors.username}
              value={username}
              style={[styles.input, { borderColor: errors.username ? 'red' : '#EFF1F5' }]} />
{errors.username ? (
            <Text style={{ color: 'red', marginTop:-10,marginBottom:15}}>{errors.username}</Text>
            ) : null}

         <View>
            <TextInput
            label="Mot de passe"
              placeholder="Mot de passe"
              placeholderTextColor="#A5A5AE"
              onChangeText={(val) => setPassword(val)}
             secureTextEntry={!showPassword}
             errorText={errors.password}
             value={password}
             style={[styles.input, { borderColor: errors.password ? 'red' : '#EFF1F5' }]} />
             <TouchableOpacity
            style={styles.passwordIconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color="#A5A5AE"
            />
          </TouchableOpacity>
          </View>
  {errors.password ? (
            <Text style={{ color: 'red', marginTop:-10,marginBottom:15}}>{errors.password}</Text>
            ) : null}


{isSubmitting && (
  <ActivityIndicator size="large" color="blue" />
)}

            <TouchableOpacity
              onPress={ValidationInscription}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Valider</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
            <Text style={styles.formFooter}>
            Vous avez déjà un compte ?
            
              <Text style={{ color: '#3367D6' }}> Se connecter</Text>
              
            </Text>
            </TouchableOpacity>

            <View style={styles.formSpacer}>
              <Text style={styles.formSpacerText}>Ou accéder à notre espace</Text>

              <View style={styles.formSpacerDivider} />
            </View>

            <View style={styles.btnGroup}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Foires aux questions')}
                style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={styles.btnFacebook}>
                  <MaterialCommunityIcons
                    color="#fff"
                    name="help-circle-outline"
                    size={16}
                    style={{ marginRight: 5 }} />

                  <Text style={styles.btnFacebookText}>Aide</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Tutoriels')}
                style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={styles.btnGoogle}>
                  <MaterialCommunityIcons
                    color="#fff"
                    name="video"
                    size={16}
                    style={{ marginRight: 5 }} />

                  <Text style={styles.btnGoogleText}>Tutoriels</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  logoImg: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 29,
    fontWeight: '700',
    color: '#242424',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#989898',
    marginBottom: 16,
    textAlign : 'center'
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
  },
  /** Form */
  form: {
    paddingHorizontal: 16,
  },
  formFooter: {
    marginTop: 16,
    fontSize: 13,
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
  },
  formSpacer: {
    marginTop: 32,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSpacerText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#454545',
    lineHeight: 20,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    zIndex: 9,
  },
  formSpacerDivider: {
    borderBottomWidth: 2,
    borderColor: '#eff1f5',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#3367D6',
    borderColor: '#3367D6',
    marginTop: 24,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginHorizontal: -6,
    marginBottom:20
  },
  btnFacebook: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#355288',
    borderColor: '#355288',
  },
  btnFacebookText: {
    fontSize: 14,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  btnGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#3367D6',
    borderColor: '#3367D6',
  },
  btnGoogleText: {
    fontSize: 14,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  passwordContainer: {
    width: '100%',
    marginBottom: 24,
  },
  passwordIconContainer: {
    position: 'absolute',
    top: 10,
    right: -12,
    zIndex: 1,
    height:50,
    width : 48,
  },
});