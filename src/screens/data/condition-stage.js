import React , {useEffect, useState, useContext } from 'react';
import {
  StyleSheet,TextInput,View,ScrollView,SafeAreaView,
  Text,
  Image,
  TouchableOpacity,ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { GlobalContext } from '../../global/GlobalState';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';



export default function ConditionStage({navigation,item}) {
    
  const { width: windowWidth } = useWindowDimensions();

  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];


// variables;
const [data, setData] = useState([]);
const [error, setError] = useState(null);
const [user, setuser] = useContext(GlobalContext);
const [isLoading, setIsLoading] = useState(false);


const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  setRefreshing(true); // Indiquer que le rafraîchissement est en cours
  getConditionStage(); // Appeler la fonction de récupération des données
  setRefreshing(false); // Indiquer que le rafraîchissement est terminé
};

// scroll
const [scrollAtBottom, setScrollAtBottom] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height;
    setScrollAtBottom(isAtBottom);
  };

// scroll

useEffect(()=>{
  navigation.setOptions({ title: "Conditions de stage" });
  getConditionStage();
},[])


const getConditionStage = () =>{
  setIsLoading(true);
  fetch(`https://adores.tech/api/data/condition-stage.php`,{
    method:'post',
    header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
})
.then((response) => response.json())
  .then((result) => {
    setData(result);
    setIsLoading(false);
      }
 )
 .catch((error)=>{
  setError(error);
  setIsLoading(false);
 });

}


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


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
     

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} onScroll={handleScroll} scrollEventThrottle={16}>
        

        <View style={styles.picker}>
            <MaterialCommunityIcons color="#242329" name="information" size={16} />
            <Text style={styles.pickerDatesText}>Lire jusqu'en bas avant de valider</Text>
        </View>
  
        <View style={styles.about}>
          <HTML source={{ html: data && data.length > 0 ? data[0].details : "" }} 
                contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}
                tagsStyles={{
                    p: { textAlign: "justify" } // Appliquer le style de justification aux balises de paragraphe
                  }}
          />
        </View>
      </ScrollView>

   
      <TouchableOpacity
  onPress={() => {
    if (data && data.length > 0 && scrollAtBottom) {
      navigation.navigate('Liste des cycles');
    }else{
      alert("Veuillez tout lire avant de valider");
    }
  }}
  disabled={!data || data.length === 0} // Désactive le bouton si data est vide ou non défini
  style={[styles.btn, { opacity: (data && data.length > 0 && scrollAtBottom) ? 1 : 0.5 }]}
>
  <Text style={styles.btnText}>J'accepte les conditions et je m'engage</Text>
</TouchableOpacity>



        
     


    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  actions: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -8,
    marginBottom: 12,
  },
  photos: {
    paddingTop: 6,
    paddingHorizontal: 20,
    marginTop: 12,
    position: 'relative',
    height: 240,
    overflow: 'hidden',
    borderRadius: 12,
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    height: 240,
    borderRadius: 12,
  },
  photosPagination: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#242329',
    borderRadius: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  photosPaginationText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#ffffff',
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#242329',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  headerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLocationText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
    marginLeft: 4,
  },
  headerPrice: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    textAlign: 'right',
    color: '#5484F5',
  },
  headerStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerStarsText: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  headerDistance: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  picker: {
    marginTop: 6,
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderStyle: 'solid',
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerDates: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerDatesText: {
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#5484F5',
  },
  pickerFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerFilterWrapper: {
    borderLeftWidth: 1,
    borderColor: '#e5e5e5',
    paddingLeft: 12,
  },
  pickerFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  pickerFilterItemText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: '#242329',
    marginLeft: 4,
  },
  stats: {
    marginVertical: 16,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsItemText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#242329',
    marginLeft: 7,
  },
  about: {
    marginHorizontal: 20,
    marginTop:10,
    textAlign : 'justify'
  },
  aboutTitle: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#242329',
    marginBottom: -5,
    textDecorationLine:'underline'
  },
  aboutDescription: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
    textAlign:'justify'
  },
  footer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderWidth: 1,
    backgroundColor: '#5484F5',
    borderColor: '#5484F5',
    height: 52,
  },
  btnSecondary2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#5484F5',
    borderColor: '#5484F5',
    height: 52,
  },
  btnSecondaryText: {
    fontSize: 14,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
  btnText: {
    fontSize: 10,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },

  
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#5484F5',
    borderColor: '#5484F5',
    marginTop: 24,
    marginHorizontal: 24,
  },
  btnText: {
    fontSize: 13,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.15,
  },

  
});