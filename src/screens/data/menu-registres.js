import React , {useEffect, useState, useContext, useCallback, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,ScrollView,Text,TouchableOpacity,ActivityIndicator,TextInput,RefreshControl,Dimensions} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width; // Récupérez la longueur de l'écran

const tabs = [
  { name: 'Stagiaires', icon: 'user' },
  { name: 'Formations', icon: 'book' },
];



  export default function MenuRegistres({navigation }) {

  const [value, setValue] = React.useState(0);
    // botton sheet
    const sheet = React.useRef();

  // Registre des stagiaires
  const [searchText1, setSearchText1] = useState('');
  const [message1, setMessage1] = useState('');
  const [isSubmitting1, setIsSubmitting1] = useState(false);
  const [errors1, setErrors1] = useState({});
  const [error1, setError1] = useState(null);

  const { width: windowWidth } = useWindowDimensions();

  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];

  const handleSearch1 = (param) => {

    if (!searchText1) {
        setErrors1({
          // Update error state with appropriate error messages
          searchText: !searchText1 ? 'Veuillez renseigner obligatoirement ce champ' : '',
        });
        return;
      }

    setIsSubmitting1(true);

    fetch(`https://adores.tech/api/data/registre-stagiaire.php?matricule=${param}`,{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
  })
  .then((response) => response.json())
    .then((result) => {
      setMessage1(result);
      setIsSubmitting1(false);
        }
   )
   .catch((error)=>{
    setError1(error);
    setIsSubmitting1(false);
   });
  };

  // Registre de formations
  const [searchText2, setSearchText2] = useState('');
  const [message2, setMessage2] = useState('');
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const [errors2, setErrors2] = useState({});
  const [error2, setError2] = useState(null);


  const handleSearch2 = (param) => {

    if (!searchText2) {
        setErrors2({
          // Update error state with appropriate error messages
          searchText: !searchText2 ? 'Veuillez renseigner obligatoirement ce champ' : '',
        });
        return;
      }

    setIsSubmitting2(true);

    fetch(`https://adores.tech/api/data/registre-formation.php?matricule=${param}`,{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
  })
  .then((response) => response.json())
    .then((result) => {
      setMessage2(result);
      setIsSubmitting2(false);
        }
   )
   .catch((error)=>{
    setError2(error);
    setIsSubmitting2(false);
   });
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.tabs}>
          {tabs.map(({ name, icon }, index) => {
            const isActive = index === value;

            return (
              <View
                key={name}
                style={[
                  styles.tabWrapper,
                  isActive && { borderBottomColor: '#6366f1' },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    setValue(index);
                  }}>
                  <View style={styles.tab}>
                    <FeatherIcon
                      color={isActive ? '#6366f1' : '#6b7280'}
                      name={icon}
                      size={16}
                    />

                    <Text
                      style={[
                        styles.tabText,
                        isActive && { color: '#6366f1' },
                      ]}>
                      {name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

         {/* Section Procedures */}
         {value === 0 && (
               <View style={styles.container}>
                 <ScrollView>
           
                 <View style={styles.logoImg}>
                 <MaterialCommunityIcons color="#3367D6" name="school-outline" size={175} />
                 </View>
           
           
           
                 <Text style={styles.title}>Registre des stagiaires</Text>
                 <TextInput
                   placeholder="Saisir le matricule du stagiaire"
                   value={searchText1}
                   onChangeText={text => setSearchText1(text)}
                   style={[styles.input, { borderColor: errors1.searchText ? 'red' : '#EFF1F5' }]} />
           {errors1.searchText ? (
                       <Text style={{ color: 'red', marginTop:-10,marginBottom:15}}>{errors1.searchText}</Text>
                   ) : null}
           
           <TouchableOpacity onPress={() => handleSearch1(searchText1)}>
                         <View style={styles.btn}>
                           <Text style={styles.btnText}>Rechercher</Text>
                         </View>
                 </TouchableOpacity>
           
                 {isSubmitting1 && (
             <ActivityIndicator size="large" color="blue" />
           )}
           
                 <View style={{marginTop:20}}></View>
                 <HTML source={{ html: message1 }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}/>
                 </ScrollView>
                 </View>
          
          )}

         {/* Section Partenaires */}
         {value === 1 && (
    <View style={styles.container}>
    <ScrollView>

    <View style={styles.logoImg}>
    <MaterialCommunityIcons color="#3367D6" name="school-outline" size={175} />
    </View>



    <Text style={styles.title}>Registre de formations</Text>
    <TextInput
      placeholder="Saisir le matricule du diplôme"
      value={searchText2}
      onChangeText={text => setSearchText2(text)}
      style={[styles.input, { borderColor: errors2.searchText ? 'red' : '#EFF1F5' }]} />
{errors2.searchText ? (
          <Text style={{ color: 'red', marginTop:-10,marginBottom:15}}>{errors2.searchText}</Text>
      ) : null}



<TouchableOpacity onPress={() => handleSearch2(searchText2)}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Rechercher</Text>
            </View>
    </TouchableOpacity>

    {isSubmitting2 && (
<ActivityIndicator size="large" color="blue" />
)}

    <View style={{marginTop:20}}></View>
    <HTML source={{ html: message2 }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}/>
    </ScrollView>
    </View>
           )}


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
    padding : 10
  },
  tabs: {
    flexDirection: 'row',
    marginBottom:12
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  tabWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 5,
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