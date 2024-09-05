import React , {useEffect, useState, useContext } from 'react';
import {
  StyleSheet,TextInput,View,ScrollView,SafeAreaView,
  Text,
  Image,
  TouchableOpacity,FlatList,Alert
} from 'react-native';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import { GlobalContext } from '../../global/GlobalState';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';



export default function DetailsFormation({navigation,route}) {
    
  const { width: windowWidth } = useWindowDimensions();

  const {item} = route.params;

  const [value, setValue] = React.useState(0);

  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];

  const sheet = React.useRef();
  const [value2, setValue2] = React.useState();

// variables;
const [data, setData] = useState([]);
const [error, setError] = useState(null);
const [user, setuser] = useContext(GlobalContext);



useEffect(()=>{
  navigation.setOptions({ title: item.titre_formation });
},[])


const getValidationFormation = () =>{

  fetch(`https://adores.tech/api/data/validation-formation.php?id=${item.id_formation}&matricule=${user[0].matricule}&prix=${item.prix_formation}`,{
    method:'post',
    header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    
})
.then((response) => response.json())
  .then((result) => {
    Alert.alert("Message",result);
      }
 )
 .catch((error)=>{
  setError(error);
 });

}


  return (
    <View style={{ flex: 1, backgroundColor: 'white',marginBottom:10 }}>
     

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.photos}>
          
            
              <View  style={{ flex: 1 }}>
               
                {item.photo64 ? (
            <Image
source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
style={styles.photosImg}
resizeMode="cover"
/>
) : (
<Image
source={require("../../assets/images/user.jpg")}
style={styles.photosImg}
resizeMode="cover"
/>
  )}
              </View>
           
          
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{item.titre_formation}</Text>

          <View style={styles.headerRow}>
            <View style={styles.headerLocation}>

              <MaterialCommunityIcons color="#7B7C7E" name="card-account-details-star-outline" size={14} />

              <Text style={styles.headerLocationText}>
              Coût du diplôme :
              </Text>
            </View>
            <Text style={styles.headerPrice}> {parseFloat(item.prix_formation).toLocaleString("fr-FR")} F</Text>
          </View>

     
        </View>
        <View style={styles.picker}>
            <MaterialCommunityIcons color="#242329" name="certificate" size={16} />
            <Text style={styles.pickerDatesText}>{item.diplome}</Text>
        </View>
  
        <View style={styles.about}>
          <Text style={styles.headerTitle}>Description</Text>
          <HTML source={{ html: item.details_formation }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}/>
        </View>
      </ScrollView>

   
          <TouchableOpacity
            onPress={getValidationFormation}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Demander un diplôme</Text>
          </View>
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
    color: '#242329',
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
    fontSize: 14,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
  action: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderStyle: 'solid',
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  tabsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  tabsItemLine: {
    width: 20,
    height: 3,
    backgroundColor: '#f26463',
    borderRadius: 24,
  },
  tabsItemWrapper: {
    marginRight: 28,
  },
  tabsItemText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderColor: '#efefef',
  },
  sheetHeaderTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
  sheetHeaderAction: {
    width: 60,
  },
  sheetHeaderActionText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ff6a55',
  },
  sheetContent: {
    paddingHorizontal: 12,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetRowItem: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetLabel: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    fontSize: 15,
    fontWeight: '500',
    color: '#acacac',
  },
  sheetValue: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sheetValueText: {
    fontSize: 21,
    fontWeight: '700',
    color: '#26242e',
    marginRight: 8,
  },
  radioName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1d1d1d',
    marginTop: 5, // Réduisez la valeur du marginTop à 2 pour obtenir un espacement de 2 pixels
    lineHeight: 12, // Définissez la hauteur de ligne à 15 pixels pour un espacement de 2 pixels
  },
  radioName2: {
    fontSize: 10,
    fontWeight: '600',
    color: 'gray',
    marginTop: 2, // Réduisez la valeur du marginTop à 2 pour obtenir un espacement de 2 pixels
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
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.15,
  },
  radio: {
    position: 'relative',
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  radioOverflow: {
    display: 'none',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 123, 255, 0.66)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    zIndex: 9999,
  },
  radioImg: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  radioImgWrapper: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  sheetBody: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    height: 400,
  },
  done: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6a55',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 30,
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  }
  
});