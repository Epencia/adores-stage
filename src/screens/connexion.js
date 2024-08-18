import React, { useEffect,useState, useContext } from "react";
import {
  StyleSheet,SafeAreaView,View,Image,Text,TextInput,TouchableOpacity, ScrollView ,Linking, ActivityIndicator 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../global/GlobalState';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen({navigation})  {
      
    // variables
      const [username,setUsername] = useState('');
      const [password,setPassword] = useState('');
      const [user, setUser] = useContext(GlobalContext);
      //const [user, setUser] = useState('');
  
      
      const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission
      const [errors, setErrors] = useState({}); // Add a state to hold the error messages
      
  
    const [visible, setVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const hideDialog = () => setVisible(false);
  
    
    useEffect(() => {
      navigation.setOptions({title: 'Bienvenue à Adorès'});
      // Vérifier si l'utilisateur est connecté
      if (user) {
        if (user[0].role === 'Beneficiaire') {
          navigation.navigate('Menu Mobile');
        } 
        if (user[0].role === 'Superviseur' || user[0].role === 'Administrateur' || user[0].role === 'Assistant' || user[0].role === 'Gestionnaire' || user[0].role === 'Comptable') {
          navigation.navigate('Dashboard Masters');
        }
      }
    }, [user]);
  
  
    const login = async () => {
  
      if (!username || !password) {
        setErrors({
          // Update error state with appropriate error messages
          username: !username ? 'Le champ Utilisateur est obligatoire' : '',
          password: !password ? 'Le champ Mot de passe est obligatoire' : '',
        });
        return;
      }
    
      setIsSubmitting(true); // Set submitting state to true while sending the data
     
        try{
      // Effectuer une validation du login et mot de passe ici
      const response = await fetch(`https://adores.tech/api/data/connexion.php?login=${username}&mdp=${password}`);
      const data = await response.json();
      
      if (data=='') {
        alert('Vos identifiants sont incorrects. Veuillez saisir les véritables accès');
        setUsername('');
        setPassword('');
        // Stop the ActivityIndicator
      setIsSubmitting(false);
      } else {
          // Stockez les données de l'utilisateur connecté dans le state global
          setUser(data);

          // BENEFICIAIRE
          if (data[0].role === 'Beneficiaire') {
            navigation.navigate('Menu Mobile');
          }else{
            alert('Accès non autorisé');
          } 

        
      }
    } catch(error){
      alert(error);
      };
      

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
            <Text style={styles.title}>Connexion</Text>

            <Text style={styles.subtitle}>
            Connectez-vous en toute simplicité en saisissant vos informations d'identification ci-dessous.
            </Text>



           <TextInput
             label="Utilisateur"
              placeholder="Utilisateur"
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
              onPress={login}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Valider</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
            <Text style={styles.formFooter}>
            Vous n'avez pas de compte ?
              <Text style={{ color: '#3367D6' }}> Créer un compte </Text>
            </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {Linking.openURL('https://wa.me/2250709107849') }}>
            <Text style={styles.formFooter}>
              <Text style={{ color: '#3367D6' }}> Mot de passe oublié ? </Text>
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