import {
  Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar, Animated
} from "react-native";
import React, { useEffect, useContext, useRef,useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { GlobalContext } from '../global/GlobalState';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Dimensions.get("window").height; // Récupérez la hauteur de l'écran
const { height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {

  const headerHeight = useHeaderHeight();
  const remainingHeight = screenHeight - headerHeight;
  const [user] = useContext(GlobalContext);
  const [count, setCount] = useState([]);

  //MODAL
  const sheet = useRef(null);

  const pulseAnim = useRef(new Animated.Value(1)).current; // Initial value for scale: 1

  useEffect(()=>{
},[])

  useEffect(() => {
    navigation.setOptions({ title: 'Bienvenue à Adorès' });
    if (user) {
      navigation.navigate('Menu Mobile');
    } else {
      navigation.navigate('Bienvenue');
    }


    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [user]);


  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollView}>
    
        <View style={{ backgroundColor: 'white' }}>

          <ImageBackground
            style={styles.imageBackground}
            resizeMode="contain"
            source={require("../assets/images/welcome-img.png")}
          />
          <View style={styles.contentContainer}>

            <TouchableOpacity
              onPress={() => navigation.navigate('Demande de stage')}
              //onPress={() => sheet.current.open()}
              style={styles.roundButton}
            >
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <MaterialCommunityIcons color="white" name="gesture-double-tap" size={60} />
                <Text style={styles.roundButtonText}>Cliquez-ici</Text>
              </Animated.View>
            </TouchableOpacity>

            <Text style={styles.descriptionText}>
              Découvrez notre réseau social professionnel de stage en ligne
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                if (user) {
                  navigation.navigate('Menu Mobile');
                } else {
                  navigation.navigate('Connexion');
                }
              }}
              style={styles.primaryButton}
            >
              <Text style={styles.buttonText} numberOfLines={1}>
                {user ? 'Accéder au menu' : 'Se connecter'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Inscription')}
              style={styles.primaryButton}
            >
              <Text style={styles.buttonText} numberOfLines={1}>
                Ouvrir un compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>





      <RBSheet
        customStyles={{ container: styles.sheet }}
        height={200}
        openDuration={250}
        ref={sheet}>
        <View style={styles.sheetHeader}>
          <View />
          <Text style={styles.sheetHeaderTitle}>Services</Text>
        </View>
        <View style={styles.sheetBody}>
         
              <TouchableOpacity onPress={() => {  navigation.navigate('Registre de controle')}}>
                <View style={styles.radio}>
                <MaterialCommunityIcons color="#000" name="magnify-plus-outline" size={24} />
                  <Text style={styles.radioLabel}>Recherche d'objets disparus</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {  navigation.navigate('Scanner QRCode')}}>
              <View style={styles.radio}>
                  <MaterialCommunityIcons color="#000" name="qrcode" size={24} />
                  <Text style={styles.radioLabel}>Scanner QR Code</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {  navigation.navigate('Menu general')}}>
              <View style={styles.radio}>
                  <MaterialCommunityIcons color="#000" name="apps" size={24} />
                  <Text style={styles.radioLabel}>Menu des visiteurs</Text>
                </View>
              </TouchableOpacity>
        </View>
      </RBSheet>

      </ScrollView>




    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //minHeight: screenHeight,
    backgroundColor: 'white'
  },
  imageBackground: {
    height: height / 2.5,
  },
  contentContainer: {
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  roundButton: {
    backgroundColor: '#1F41BB',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //marginBottom: 20,
  },
  roundButtonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: "#1F41BB",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "48%",
    borderRadius: 10,
    shadowColor: "#1F41BB",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginRight: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
  },
  radio: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 0,
    height: 44,
  },
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  radioLabel: {
    fontSize: 17,
    //fontWeight: 'bold',
    color: '#000',
    marginLeft: 12,
    marginRight: 'auto',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  sheetHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sheetBody: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    //paddingHorizontal:10,
    marginTop:-50,
    marginRight:30
  },
});
