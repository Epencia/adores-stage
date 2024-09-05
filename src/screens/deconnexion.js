import React, { useEffect,useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../global/GlobalState';

export default function LogoutScreen({navigation})  {

    // variables
    const [user, setUser] = useContext(GlobalContext);

    const getLogoutScreen = () => {
        setUser(null);
        navigation.navigate('Bienvenue');

      };

      useEffect(()=>{
        navigation.setOptions({ title: 'Déconnexion' });
      },[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor : 'white' }}>
      <ScrollView>
      <View style={styles.empty}>
 

        <Image
          alt=""
          source={require("../assets/images/EmptyState.png")}
          style={styles.emptyImg} />

        
        {user[0].nom_prenom ? (
              <Text style={styles.emptyTitle}>{user[0].nom_prenom}</Text>
              ) : (
                <Text style={styles.emptyTitle}>Déconnexion</Text>
              )}

        <Text style={styles.emptyDescription}>
        Vous serez déconnecté si vous cliquez sur le bouton 'Se déconnecter' !
        </Text>

        <View style={styles.emptyFooter}>
          <TouchableOpacity onPress={getLogoutScreen}>
            <View style={styles.btn}>
              <View style={{ width: 29 }} />

              <Text style={styles.btnText}>Se déconnecter</Text>

              <MaterialCommunityIcons
                color="#fff"
                name="arrow-right"
                size={17}
                style={{ marginLeft: 12 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Menu Mobile')}>
            <View style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>Annuler</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Empty */
  empty: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyImg: {
    width: 300,
    height: 300,
    marginBottom: 24,
  },
  emptyBadge: {
    fontSize: 14,
    fontWeight: '700',
    color: '#54d378',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 14,
    textAlign : 'center'
  },
  emptyDescription: {
    marginBottom: 24,
    paddingHorizontal: 48,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: '#8c9197',
    textAlign: 'center',
  },
  emptyFooter: {
    marginTop: 'auto',
    alignSelf: 'stretch',
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
    backgroundColor: '#000',
    borderColor: '#000',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#000',
    marginTop: 8,
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#000',
  },
});