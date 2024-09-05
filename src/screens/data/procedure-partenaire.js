import React , {useEffect, useState, useContext, useCallback, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput,RefreshControl,Dimensions} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width; // Récupérez la longueur de l'écran

const tabs = [
  { name: 'Procédures', icon: 'book' },
  { name: 'Partenaires', icon: 'users' },
];



  export default function ProcedurePartenaire({navigation }) {

  const [value, setValue] = React.useState(0);
    // botton sheet
    const sheet = React.useRef();

    // Barre de recherche
    const [searchTerm1, setSearchTerm1] = useState(''); 
    const searchItems1 = useMemo(() => {
      return () => {
      const filteredData1 = data1.filter(item =>
        item.titre_reglement.toLowerCase().includes(searchTerm1.toLowerCase()) 
      );
      return filteredData1;
  };
  }, [data1, searchTerm1]);

  
  const [searchTerm2, setSearchTerm2] = useState(''); 
  const searchItems2 = useMemo(() => {
    return () => {
    const filteredData2 = data2.filter(item =>
      item.raison_sociale.toLowerCase().includes(searchTerm2.toLowerCase()) ||
      item.ville.toLowerCase().includes(searchTerm2.toLowerCase())   ||
      item.titre.toLowerCase().includes(searchTerm2.toLowerCase()) ||
      item.adresse.toLowerCase().includes(searchTerm2.toLowerCase())
    );
    return filteredData2;
  };
  }, [data2, searchTerm2]);



  // Loading
      const [isLoading1, setIsLoading1] = useState(false);
      const [data1, setData1] = useState([]);
      const [error1, setError1] = useState(null);

      const [isLoading2, setIsLoading2] = useState(false);
      const [data2, setData2] = useState([]);
      const [error2, setError2] = useState(null);

      const [dataChanged1, setDataChanged1] = useState(false);
      const [dataChanged2, setDataChanged2] = useState(false);

    
    // const refresh
    const [refreshing1, setRefreshing1] = useState(false);
    const [refreshing2, setRefreshing2] = useState(false);
  
    // Refresh par tir
      const onRefresh1 = useCallback(() => {
        setRefreshing1(true);
        getListeProcedure();
        setRefreshing1(false);
      }, []);


      const onRefresh2 = useCallback(() => {
        setRefreshing2(true);
        getListePartenaire();
        setRefreshing2(false);
      }, []);


      // Refresh par clic
      const handleRefresh1 = () => {
        setRefreshing1(true);
        getListeProcedure();
        setRefreshing1(false);
      };

      const handleRefresh2 = () => {
        setRefreshing2(true);
        getListePartenaire();
        setRefreshing2(false);
      };



  useEffect(()=>{
    getListeProcedure();
    getListePartenaire();
    navigation.setOptions({title: 'Procédures & Partenaires'});
    
},[])

// 1ERE
const getListeProcedure = async () => {
  setIsLoading1(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-reglement-interieur.php`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData1(newData);
  setIsLoading1(false);
  setDataChanged1(!dataChanged1);
} catch (error) {
  setIsLoading1(false);
  setError1(error);
}
}
 

// 2EME
const getListePartenaire = async () => {
  setIsLoading2(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/partenaire.php`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData2(newData);
  setIsLoading2(false);
  setDataChanged2(!dataChanged2);
} catch (error) {
  setIsLoading2(false);
  setError2(error);
}
}


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
              <View style={styles.container2}>

     <View style={styles.searchBar}>
     <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
     <TextInput
       style={styles.input}
       placeholder="Rechercher..."
       onChangeText={text => setSearchTerm1(text)}
    value={searchTerm1}
     />
    </View>


      {/* Error Page */}
      <FlatList
        data={searchTerm1 ? searchItems1() : data1}
        keyExtractor={item=>item.id_reglement}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.contentDoc}>
      <View>
        <Text style={styles.contentTextDoc}
          numberOfLines={2} >
          {item.titre_reglement}
        </Text>
        <Image
          style={{ width: '100%', height: 150, marginTop: 5, marginBottom: 10 }}
          source={require("../../assets/images/adores-doc.png")}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#3498db', padding: 10, borderRadius: 5 }}
          onPress={() => navigation.navigate("Details reglement",{item})}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Visualiser</Text>
        </TouchableOpacity>
      </View>
    </View>
        )}
        ListEmptyComponent={() => (
          // Gestion de l'indicateur de chargement et des erreurs
          <View style={styles.emptyListContainer}>
            {isLoading1 ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#5500dc" />
            </View>
            ) : error1 ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
              <Text style={{ fontSize: 18,color:'red',marginRight:10,marginLeft:10}}>
              Erreur lors de la récupération des données... Vérifiez votre connexion internet !
              </Text>
              <TouchableOpacity onPress={handleRefresh1} style={{ backgroundColor: '#0099cc',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 5,}}>
                <Text style={{ color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center', }}>Réessayer</Text>
              </TouchableOpacity>
            </View>
            ) : (
              <Text style={styles.emptyText}>Aucune donnée disponible</Text>
            )}
          </View>
        )}
      />
          

        </View>
          
          )}

         {/* Section Partenaires */}
         {value === 1 && (
    <View style={styles.container3}>


<View style={styles.searchBar}>
<FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
<TextInput
 style={styles.input}
 placeholder="Rechercher..."
 onChangeText={text => setSearchTerm2(text)}
value={searchTerm2}
/>
</View>

 

    <FlatList
       data={searchTerm2 ? searchItems2() : data2}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Prestations par partenaire',{item})}>
                 {item.photo64 ? (
          <Image
alt=""
source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
style={styles.image}
/>
) : (
<Image
alt=""
source={require("../../assets/images/user.jpg")}
style={styles.image}
/>
)}

        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.raison_sociale}</Text>
          <View style={styles.dataContainer}>
            <FeatherIcon name="user" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{item.titre}</Text>
          </View>
          <View style={styles.dataContainer}>
            <FeatherIcon name="info" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{item.ville}</Text>
          </View>
          <View style={styles.dataContainer}>
            <FeatherIcon name="settings" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{item.adresse}</Text>
          </View>
        </View>
      </TouchableOpacity>
      )}
            ListEmptyComponent={() => (
              // Gestion de l'indicateur de chargement et des erreurs
              <View style={styles.emptyListContainer}>
                {isLoading2 ? (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="#5500dc" />
                </View>
                ) : error2 ? (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
                  <Text style={{ fontSize: 18,color:'red',marginRight:10,marginLeft:10}}>
                  Erreur lors de la récupération des données... Vérifiez votre connexion internet !
                  </Text>
                  <TouchableOpacity onPress={handleRefresh2} style={{ backgroundColor: '#0099cc',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 5,}}>
                    <Text style={{ color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center', }}>Réessayer</Text>
                  </TouchableOpacity>
                </View>
                ) : (
                  <Text style={styles.emptyText}>Aucune donnée disponible</Text>
                )}
              </View>
            )}
            
          />
        </View>
           )}


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    //marginBottom:100
  },
  container2: {
    flex: 1,
    backgroundColor: 'white'
  },
  container3: {
    flex: 1,
    padding: 5,
    backgroundColor: 'transparent', // Fond blanc
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white', // Fond blanc pour la barre de recherche
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  searchIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8, // Bordures arrondies
    backgroundColor: 'white', // Fond gris clair
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  dataText: {
    fontSize: 14,
    color: 'gray',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
    marginRight: 16,
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  scrollableListItem : {
    flexDirection : 'column',
    //paddingHorizontal : 15,
    paddingVertical : 15,
    backgroundColor : 'white',
    marginRight : 10,
    //marginLeft : 10,
    marginBottom: 10,
    alignItems: 'center',
    width: screenWidth / 3.7,
    borderRadius : 15,
    borderWidth:1,
    borderColor: '#ccc',
 },
 imageThumbnail: {
  width : 70,
  height : 70,
  borderRadius : 70/2,
  backgroundColor : '#C0C0C0',
},
DoctorCategorie : {
  fontSize : 12,
  paddingHorizontal : 15,
  padding : 5,
  color : '#695cd4',
  textAlign : 'center',
  width : 100,
  fontWeight : 'bold',
 },
 postContainer: {
  marginBottom: 16,
  padding: 16,
  backgroundColor: 'white',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ccc',
},
userInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
},
userImage: {
  width: 30,
  height: 30,
  borderRadius: 15,
  marginRight: 8,
},
username: {
  fontSize: 18,
  fontWeight: 'bold',
},
postText: {
  fontSize: 16,
  marginBottom: 8,
},
postImage: {
  width: '100%',
  height: 200,
  borderRadius: 8,
},
footer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 8,
},
date: {
  fontSize: 12,
  color: 'gray',
},
views: {
  fontSize: 12,
  color: 'gray',
},

placeholderImage: {
  width: '100%',
  height: 200,
  borderRadius: 8,
  backgroundColor: 'lightgray',
  justifyContent: 'center',
  alignItems: 'center',
  padding:5
},
placeholderText: {
  fontSize: 18,
  fontWeight: 'bold',
  textAlign:'justify',
  color: 'black',
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
contentDoc: {
  width: '47%', 
  marginTop: 10,
  marginBottom: 10, 
  borderRadius: 15, 
  marginRight: 5,
  marginLeft: 5, 
  padding: 10, 
  borderWidth: 1, 
  borderColor: 'gray' 
},
contentTextDoc: {
  minHeight: 45,
  fontSize: 15,
  fontWeight: 'bold',
  textAlign: 'center', 
},
});