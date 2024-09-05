import React, {useEffect, useState, useContext} from 'react';
import { TouchableOpacity , View, Image, Text,ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation, useRoute,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from './BottomTabNavigatorMobile'
import { GlobalContext } from '../global/GlobalState';
import ProfilScreen from '../screens/ProfilScreen';
import SettingScreen from '../screens/SettingScreen';
import TransactionScreen from '../screens/TransactionScreen';
import CardScreen from '../screens/CardScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BalanceScreen from '../screens/BalanceScreen';
import LogoutScreen from '../screens/LogoutScreen';
import JobScreen from '../screens/JobScreen';



const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {

  const [user, setUser] = useContext(GlobalContext);
  const [count, setCount] = useState([]);

  useEffect(()=>{
    getNombreNotification();
    const intervalId = setInterval(getNombreNotification, 1000);
    return () => clearInterval(intervalId);
},[])


  const getNombreNotification = () =>{

  fetch(`https://adores.tech/api/masters/nombre-notification.php?id=${user[0].id}`,{
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


  return (


      <Drawer.Navigator 
      useLegacyImplementation
        drawerContent={
          (props) => {
            return (
              <SafeAreaView>
                <ScrollView>
                <View
                  style={{
                    height: 200,
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomColor: "#f4f4f4",
                    borderBottomWidth: 1
                  }}
                >
                  


            {user[0].photo64 ? (
            <Image
              source={{ uri: `data:${user[0].type};base64,${user[0].photo64.toString('base64')}` }}
              style={{
                height: 130,
                width: 130,
                borderRadius: 65
              }}
              
            />
           ) : (
           <Image
                    source={require('../assets/images/user.jpg')}
                    style={{
                      height: 130,
                      width: 130,
                      borderRadius: 65
                    }}
           />
           )}
  

                  <Text
                    style={{
                      fontSize: 22,
                      marginVertical: 6,
                      fontWeight: "bold",
                      color: "#111"
                    }}
                  >{user[0].nom_prenom}</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#111"
                    }}
                  >{user[0].role}</Text>
                </View>
                <DrawerItemList {...props} />
                </ScrollView>
              </SafeAreaView>
            )
          }
        }
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250
          },
          headerStyle: {
            backgroundColor: "#1F41BB",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            //fontWeight: "bold"
          },
          drawerLabelStyle: {
            color: "#111"
          }
        }}
      >


    
    
<Drawer.Screen
  name="Tableau de bord"
  component={BottomTabs}
  options={({ route }) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'WelcomeScreen';
    return {
      headerTitle: routeName,
      drawerIcon: ({ color }) => (
        <Ionicons name="home-outline" size={22} color={color} />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <MaterialCommunityIcons
            name="bell"
            size={20}
            color="white"
            style={{ marginRight: 15 }}
          />
          {count > 0 && (
          <View
          style={{
            position: 'absolute',
            top: -5,
            right: 5,
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
      ),
    };
  }}
/>

      
      
      <Drawer.Screen
        name="Mon profil"
        component={ProfilScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color="white"
                style={{ marginRight: 15 }}
              />
              {count > 0 && (
              <View
              style={{
                position: 'absolute',
                top: -5,
                right: 5,
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
          ),
        }}
      />





<Drawer.Screen
        name="Registres"
        component={SettingScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="star-outline" size={22} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color="white"
                style={{ marginRight: 15 }}
              />
              {count > 0 && (
              <View
              style={{
                position: 'absolute',
                top: -5,
                right: 5,
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
          ),
        }}
      />



<Drawer.Screen
        name="Sociétés"
        component={TransactionScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="briefcase-outline" size={22} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color="white"
                style={{ marginRight: 15 }}
              />
              {count > 0 && (
              <View
              style={{
                position: 'absolute',
                top: -5,
                right: 5,
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
          ),
        }}
      />



<Drawer.Screen
        name="Témoignages"
        component={CardScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="walk-outline" size={22} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color="white"
                style={{ marginRight: 15 }}
              />
              {count > 0 && (
              <View
              style={{
                position: 'absolute',
                top: -5,
                right: 5,
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
          ),
        }}
      />






<Drawer.Screen
        name="Contacts"
        component={LoginScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="call-outline" size={22} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color="white"
                style={{ marginRight: 15 }}
              />
              {count > 0 && (
              <View
              style={{
                position: 'absolute',
                top: -5,
                right: 5,
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
          ),
        }}
      />


      <Drawer.Screen
        name="FAQ"
        component={RegisterScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="help-outline" size={22} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color="white"
                style={{ marginRight: 15 }}
              />
              {count > 0 && (
              <View
              style={{
                position: 'absolute',
                top: -5,
                right: 5,
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
          ),
        }}
      />



<Drawer.Screen
        name="Partager"
        component={BalanceScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="share" size={22} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color="white"
                style={{ marginRight: 15 }}
              />
              {count > 0 && (
              <View
              style={{
                position: 'absolute',
                top: -5,
                right: 5,
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
          ),
        }}
      />



      


      <Drawer.Screen
  name="Déconnexion"
  component={JobScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="lock-closed-outline" size={22} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color="white"
                style={{ marginRight: 15 }}
              />
              {count > 0 && (
              <View
              style={{
                position: 'absolute',
                top: -5,
                right: 5,
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
          ),
        }}
      />







      </Drawer.Navigator>

    
    
  );
}
export default DrawerNavigator;

