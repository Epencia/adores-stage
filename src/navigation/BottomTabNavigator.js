import React, { useEffect,useState, useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, } from 'react-native';
import { GlobalContext } from '../global/GlobalState';
import AccueilMobile from '../screens/data/accueil';
import MenuDecouvrir from "../screens/data/menu-decouvrir";
import MenuOffices from "../screens/data/menu-offices";
import MenuRegistres from "../screens/data/menu-registres";
import MenuEtudes from "../screens/data/menu-etudes";

const Tab = createBottomTabNavigator();


const CustomHeader = ({navigation}) => {
  const [user, setUser] = useContext(GlobalContext);
  const [count, setCount] = useState([]);
  const [nombre, setNombre] = useState([]);



  useEffect(() => {
    const updateData = () => {
      getNombreNotification();
      getNombreMessage();
    };
  
    updateData(); // Appeler la fonction immédiatement au montage
  
    const intervalId = setInterval(updateData, 1000);
  
    return () => clearInterval(intervalId);
  }, []);
  

// notfications
  const getNombreNotification = () =>{

  fetch(`https://adores.tech/api/data/nombre-notification.php?id=${user[0].id}`,{
    method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
      
  })
  .then((response) => response.json())
   .then(
       (result)=>{
        setCount(result);
        }
   )
   .catch((error)=>{
    alert(error);
   });
  }

  // messages
  const getNombreMessage = () =>{

    fetch(`https://adores.tech/api/data/nombre-message.php?id=${user[0].id}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombre(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
    }

  return (
 

    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end',marginLeft:10}}>
    <Image
alt=""
source={require('../assets/logo2.png')}
style={styles.avatarImg}
/>
    <Text style={{color: '#414d63',fontSize: 20,fontWeight: 'bold',marginRight:80,marginLeft:5}}>Adorès</Text>



    <TouchableOpacity onPress={() => navigation.navigate('Menu compte')}>
    <Icon name="credit-card" size={24} color="#414d63" style={{marginRight: 15,}} />
    </TouchableOpacity>

    
    <TouchableOpacity onPress={() => navigation.navigate('Liste des messages')}>
    <Icon name="comment" size={24} color="#414d63" style={{marginRight: 15,}} />
    {nombre > 0 && (
          <View
          style={{
            position: 'absolute',
            top: -5,
            right: 7,
            backgroundColor: 'red',
            borderRadius: 50,
            width: 15,
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 8 }}>{nombre}</Text>
        </View>
        )}
    </TouchableOpacity>
    

    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
    <Icon name="notifications" size={24} color="#414d63" style={{marginRight: 1,}} />
    {count > 0 && (
          <View
          style={{
            position: 'absolute',
            top: -5,
            right: 8,
            backgroundColor: 'red',
            borderRadius: 50,
            width: 15,
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 8 }}>{count}</Text>
        </View>
        )}
    </TouchableOpacity>
    


    <TouchableOpacity onPress={() => navigation.navigate('Parametres Mobiles')}>
<View style={styles.avatar}>
{user[0].photo64 ? (
<Image
alt=""
source={{ uri: `data:${user[0].type};base64,${user[0].photo64.toString('base64')}` }}
style={styles.avatarImg}
/>
) : (
<Image
alt=""
source={require("../assets/images/user.jpg")}
style={styles.avatarImg}
/>
  )}
</View>
</TouchableOpacity>
  </View>

  );
};




export default function BottomTabsMobile(){



  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={{
        tabBarActiveTintColor: '#1F41BB',
        tabBarInactiveTintColor: '#414d63',
      }}
    >
      
  

      <Tab.Screen
        name="Accueil"
        component={AccueilMobile}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={28} />
          ),
          headerTitle: () => (
            <CustomHeader navigation={navigation} />

          ),
          headerShown: true,
        })}
      />

      <Tab.Screen
        name="Découvrir"
        component={MenuDecouvrir}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="explore" color={color} size={28} />
          ),
          headerTitle: () => (
            <CustomHeader navigation={navigation} />

          ),
          headerShown: true,
        })}
      />


      <Tab.Screen
        name="Offices"
        component={MenuOffices}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="apps" color={color} size={28} />
          ),
          headerTitle: () => (
            <CustomHeader navigation={navigation} />

          ),
          headerShown: true,
        })}
      />


      <Tab.Screen
        name="Registres"
        component={MenuRegistres}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-add" color={color} size={28} />
          ),
          headerTitle: () => (
            <CustomHeader navigation={navigation} />

          ),
          headerShown: true,
        })}
      />
      <Tab.Screen
        name="Etudes"
        component={MenuEtudes}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="school" color={color} size={28} />
          ),
          headerTitle: () => (
            <CustomHeader navigation={navigation} />

          ),
          headerShown: true,
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  balance: {
    backgroundColor: '#f99027',
    borderRadius: 24,
    marginTop: 32,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  send: {
    marginVertical: 32,
  },
  sendTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  sendScroll: {
    marginHorizontal: -8,
  },
  sendUser: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendUserAvatar: {
    width: 54,
    height: 54,
    borderRadius: 9999,
    marginBottom: 6,
  },
  sendUserName: {
    fontSize: 15,
    color: '#1e1e1e',
    fontWeight: '500',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBadge: {
    fontSize: 15,
    fontWeight: '400',
    color: '#a3a3a3',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#121212',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
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
  avatar: {
    position: 'relative',
    marginLeft:15
  },
  avatarImg: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    borderWidth:1,
    borderColor:'gray'
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    top: 0,
    right: -2,
    width: 14,
    height: 14,
    backgroundColor: '#d1d5db',
  },
});


