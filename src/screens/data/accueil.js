import React, { useEffect,useState, useContext } from "react";
import {
  StyleSheet,View,Dimensions,SafeAreaView,TouchableOpacity,TextInput,Text,
  ScrollView,FlatList,Image,ActivityIndicator,StatusBar
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../global/GlobalState';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { BackHandler } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);
const screenHeight = Dimensions.get("window").height; // Récupérez la hauteur de l'écran



export default function AccueilMobile({navigation}) {

  const headerHeight = useHeaderHeight();
  // Calculer la hauteur restante
  const remainingHeight = screenHeight - headerHeight + StatusBar.currentHeight;

  const [user, setUser] = useContext(GlobalContext);
  
  const [DataAbonne, setDataAbonne] = useState([]);
  const [publicite, setPublicite] = useState([]);
  const [NombreAbonne, setNombreAbonne] = useState([]);
  const [NombreObjet, setNombreObjet] = useState([]);
  const [NombreStagiaire, setNombreStagiaire] = useState([]);
  const [NombreCertificat, setNombreCertificat] = useState([]);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sheet = React.useRef();
  const [value, setValue] = React.useState();



useEffect(() => {
  
  loadData();
  // Nombre
  getNombreAbonne();
  getNombreStagiaire();
  getNombreCertificat();
  getListePublicite();

// mesure de securité
if (user) {
if (user[0].role !== 'Beneficiaire') {
  setUser(null);
  navigation.navigate('Bienvenue');
} 
}
}, []);

const loadData = () => {
  setIsLoading(true); // Définir isLoading à true pendant le chargement des données
  setDataAbonne()
};

  // liste publicite
  const getListePublicite = () =>{

    fetch(`https://adores.tech/api/data/liste-publicite.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setPublicite(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
  
    }

  // nombre des abonnes
  const getNombreAbonne = () =>{

    fetch(`https://adores.tech/api/data/nombre-membre.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreAbonne(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
  
    }


    // Nombre stagiaires
    const getNombreStagiaire = () =>{

      fetch(`https://adores.tech/api/data/nombre-stagiaire.php?matricule=${user[0].matricule}`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreStagiaire(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
    
      }
  // nombre Certificat
  const getNombreCertificat = () =>{

    fetch(`https://adores.tech/api/data/nombre-certificat.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreCertificat(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
  
    }
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>



      <ScrollView style={styles.container}>
   

        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profil')}>
            {user[0].photo64 ? (
              <Image
                alt=""
                source={{ uri: `data:${user[0].type};base64,${user[0].photo64.toString('base64')}` }}
                style={styles.avatarImg}
              />
              ) : (
                <Image
                alt=""
                source={require("../../assets/images/user.jpg")}
                style={styles.avatarImg}
              />
              )}


              <View style={styles.avatarNotification} />
            </TouchableOpacity>

            <View style={styles.profileBody}>
              <Text style={styles.profileTitle} numberOfLines={2}>{user[0].nom_prenom}</Text>

              <Text style={styles.profileSubtitle}>
              {user[0].role}
                {' · '}
                <Text style={{ color: '#266EF1' }}>{user[0].matricule}</Text>
              </Text>
            </View>
          </View>

          <Text style={styles.profileDescription} numberOfLines={3}>
          {user[0].description}
          </Text>

  
        </View>

        <View style={styles.stats}>
          {[
            { label: 'Stagiaires', value: NombreStagiaire || '0', src:'Liste des stagiaires'  },
            { label: 'Certificats', value: NombreCertificat || '0', src:'Liste des souscriptions'  },
            { label: 'Membres', value: NombreAbonne || '0', src:'Mes membres' },
          ].map(({ label, value,src }, index) => (

            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(src)}
              style={[styles.statsItem, index === 0 && { borderLeftWidth: 0 }]}>
              <Text style={styles.statsItemText}>{label}</Text>

              <Text style={styles.statsItemValue}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.btnGroup}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Menu stage')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText} numberOfLines={1}>Stages</Text>
            </View>
          </TouchableOpacity>
         
          <TouchableOpacity
            //onPress={() => sheet.current.open()}
            onPress={() => navigation.navigate('Menu etudes')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btn}>
              <Text style={styles.btnText} numberOfLines={1}>Etudes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Menu services')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText} numberOfLines={1}>Services</Text>
            </View>
          </TouchableOpacity>
          
        </View>


        {publicite.length > 0 && (
        <View style={styles.list}>
      <FlatList
        data={publicite}
        keyExtractor={(item) => item.id_publicite}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details publicite',{item})}>
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardIcon}>
            
            {item.photo64_publicite ? (
            <Image
alt=""
source={{ uri: `data:${item.type_photo};base64,${item.photo64_publicite.toString('base64')}` }}
style={styles.cardIcon}
resizeMode="cover"
/>
) : (
<MaterialCommunityIcons color="#000" name='account-tie-outline' size={24} />
  )}
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.titre_publicite}</Text>
            <Text style={styles.cardSubtitle}>Cliquez-ici</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
        )}
      />
    </View>
    )}





        <View style={styles.list2}>
              <View>
                <View style={styles.card2}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <MaterialCommunityIcons color="#000" name="credit-card-outline" size={24}/>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle} numberOfLines={1}>Gestion du compte</Text>
                      <Text style={styles.cardSubtitle} numberOfLines={1}>Suivez l'activité de votre compte</Text>
                    </View>
                  </View>


                  <View style={styles.btnGroup2}>

                  <TouchableOpacity
            onPress={() => navigation.navigate('Menu compte')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Solde</Text>
            </View>
          </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('Moyens de rechargement')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Dépot</Text>
            </View>
          </TouchableOpacity>
         
          <TouchableOpacity
            //onPress={() => sheet.current.open()}
            onPress={() => navigation.navigate('Retrait')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Retrait</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Transfert')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Transfert</Text>
            </View>
          </TouchableOpacity>
          
        </View>
                </View>
              </View>
        </View>


       

        <View style={styles.list2}>
              <View>
                <View style={styles.card2}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <MaterialCommunityIcons color="#000" name="laptop" size={24}/>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle} numberOfLines={1}>Vie professionnelle</Text>
                      <Text style={styles.cardSubtitle} numberOfLines={1}>Explorez votre parcours professionnel</Text>
                    </View>
                  </View>


                  <View style={styles.btnGroup2}>

                  <TouchableOpacity
            onPress={() => navigation.navigate('Fiche Professionnelle')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Fiche</Text>
            </View>
          </TouchableOpacity>

         
          <TouchableOpacity
            //onPress={() => sheet.current.open()}
            onPress={() => navigation.navigate('Themes choisis')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Thèmes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Liste des stagiaires taches')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Tâches</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Liste stagiaire notation')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Notes</Text>
            </View>
          </TouchableOpacity>
          
        </View>
                </View>
              </View>
        </View>



        <View style={styles.list2}>
              <View>
                <View style={styles.card2}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <MaterialCommunityIcons color="#000" name="arrow-expand-all" size={24}/>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle} numberOfLines={1}>Raccourcis</Text>
                      <Text style={styles.cardSubtitle} numberOfLines={1}>Accédez rapidement aux fonctionnalités</Text>
                    </View>
                  </View>


                  <View style={styles.btnGroup2}>

                  <TouchableOpacity
            onPress={() => navigation.navigate('Tutoriels')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Tutoriels</Text>
            </View>
          </TouchableOpacity>

         
          <TouchableOpacity
            onPress={() => navigation.navigate('Liste Plateforme')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Agences</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Liste publicite')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Journal</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Profil')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Profil</Text>
            </View>
          </TouchableOpacity>
          
        </View>
                </View>
              </View>
        </View>





        <View style={{marginBottom:20}}></View>





       

      </ScrollView>

      

      <RBSheet
        customStyles={{ container: styles.sheet }}
        height={290}
        openDuration={250}
        ref={sheet}>
        <View style={styles.sheetHeader}>
          <View />
          <Text style={styles.sheetHeaderTitle}>Services</Text>
        </View>
        <View style={styles.sheetBody}>
         
              <TouchableOpacity onPress={() => {  navigation.navigate('Menu compte')}}>
                <View style={styles.radio}>
                <MaterialCommunityIcons color="#000" name="folder-edit-outline" size={24} />
                  <Text style={styles.radioLabel}>Mon compte</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {  navigation.navigate('Formations')}}>
              <View style={styles.radio}>
                  <MaterialCommunityIcons color="#000" name="book-open-page-variant-outline" size={24} />
                  <Text style={styles.radioLabel}>Formations</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {  navigation.navigate('Catalogue')}}>
              <View style={styles.radio}>
                  <MaterialCommunityIcons color="#000" name="clipboard-list-outline" size={24} />
                  <Text style={styles.radioLabel}>Catalogue</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {  navigation.navigate('Nouvelle publicite')}}>
              <View style={styles.radio}>
                  <MaterialCommunityIcons color="#000" name="folder-edit-outline" size={24} />
                  <Text style={styles.radioLabel}>Publications</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {  navigation.navigate('Liste des themes')}}>
              <View style={styles.radio}>
                  <MaterialCommunityIcons color="#000" name="file-document-edit-outline" size={24} />
                  <Text style={styles.radioLabel}>Rapports de stage</Text>
                </View>
              </TouchableOpacity>


        </View>
      </RBSheet>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    paddingVertical: 18,
    paddingHorizontal : 16,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
    paddingHorizontal : 16,
  },
  btnGroup2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -10,
    marginTop: 18,
    paddingHorizontal : 2,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: '#266EF1',
  },
  btn2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'gray',
  },
  list: {
    marginTop: 18,
    marginHorizontal: 6,
  },
  list2: {
    marginTop: 18,
    paddingHorizontal : 12,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    //borderWidth : 1,
    //borderColor : 'gray',
    backgroundColor: '#fff',
    marginHorizontal: 6,
    //shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    //shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
    width: CARD_WIDTH,
  },
  container: {
    //paddingVertical: 12,
    //paddingHorizontal: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 40,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#778599',
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#778599',
    textAlign: 'justify'
  },
  profileTags: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
  },
  stats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: 'rgba(189, 189, 189, 0.32)',
  },
  statsItemText: {
    fontSize: 14,
    //fontWeight: '500',
    lineHeight: 18,
    color: 'gray',
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#121a26',
  },
  btnText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#266EF1',
  },
  btnText2: {
    fontSize: 12,
    lineHeight: 20,
    //fontWeight: 'bold',
    color: 'black',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
  },
  btnPrimaryText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnPrimaryText2: {
    fontSize: 10,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#778599',
  },
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#121a26',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    //fontWeight: 'bold',
    lineHeight: 18,
    color: 'gray',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardFooter2: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'right',
    justifyContent: 'right',
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#778599',
  },
  userContainer: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    marginTop: 8,
    fontSize: 13,
    color: '#778599',
    //fontWeight: 'bold',
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
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
  done: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6a55',
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
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 12,
    marginRight: 'auto',
  },
  card2: {
    paddingVertical: 16,
    paddingHorizontal : 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    //marginHorizontal: 6,
    //shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    //shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
    width: '100%',
  },
});