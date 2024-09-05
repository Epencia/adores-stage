import React, { useEffect,useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../global/GlobalState';

const SECTIONS = [
  {
    header: 'Preferences',
    icon: 'settings',
    items: [
      { icon: 'account-multiple-check-outline', color: '#fe9400', label: 'Stagiaires', src: 'Liste des stagiaires' },
      {icon: 'account-plus',color: '#fe9400',label: 'Membres',src: 'Mes membres',},
      { icon: 'school-outline', color: '#fe9400', label: 'Certificats', src: 'Liste des souscriptions' },
      {icon: 'account',color: '#fe9400',label: 'Mon profil',src: 'Profil',},
      {icon: 'book-check-outline',color: '#fe9400',label: 'Fiche professionnelle',src: 'Fiche Professionnelle',},
      
    ],
  },
  {
    header: 'Finances',
    icon: 'settings',
    items: [
      {icon: 'credit-card',color: '#007afe',label: 'Mon compte',src: 'Menu compte',},
      { icon: 'account-cash-outline', color: '#007afe', label: 'Rechargement', src: 'Moyens de rechargement' },
      {icon: 'cash-fast',color: '#007afe',label: 'Retrait',src: 'Retrait',},
      {icon: 'bank-transfer',color: '#007afe',label: 'Transfert',src: 'Transfert',},
      { icon: 'card-account-details', color: '#007afe', label: 'Transactions', src: 'Transactions' },
    ],
  },
  {
    header: 'Menu',
    icon: 'help-circle',
    items: [
      { icon: 'home', color: '#fd2d54', label: 'Accueil', src: 'Menu Mobile' },
      { icon: 'compass', color: '#fd2d54', label: 'Découvrir', src: 'Menu Decouvrir' },
      {icon: 'apps',color: '#fd2d54',label: 'Offices',src: 'Menu Offices',},
      {icon: 'account-plus',color: '#fd2d54',label: 'Registres',src: 'Menu registres',},
      {icon: 'book',color: '#fd2d54',label: 'Etudes',src: 'Menu etudes',},
      {icon: 'briefcase',color: '#fd2d54',label: 'Services',src: 'Menu services',},
    ],
  },
  {
    header: 'Aide',
    icon: 'align-center',
    items: [
      {icon: 'comment',color: '#32c759',label: 'Maîtres de stage',src: 'Mes maitres stage',},
      { icon: 'bell', color: '#32c759', label: 'Notifications', src: 'Notifications' },
      { icon: 'help', color: '#32c759', label: 'FAQ', src: 'Foires aux questions' },
      { icon: 'share-variant', color: '#32c759', label: 'Partager', src: 'Partage' },
      { icon: 'card-account-details', color: '#32c759', label: 'Contacts', src: 'Contacts' },
      {icon: 'bullhorn-outline',color: '#32c759',label: 'Témoignages',src: 'Temoignages',},
    ],
  },
];



export default function ParametreMobile({navigation}) {

  const [user, setUser] = useContext(GlobalContext);


  useEffect(()=>{
    navigation.setOptions({ title: 'Paramètres' });
    //alert(user[0].nom_prenom)
  },[])

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>

<View style={{ marginBottom:60 }}>


      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profile}>
        <TouchableOpacity
                  onPress={() => navigation.navigate('Profil')}>

            <View style={styles.profileAvatarWrapper}>
            {user[0].photo64 ? (
              <Image
                alt=""
                source={{ uri: `data:${user[0].type};base64,${user[0].photo64.toString('base64')}` }}
                style={styles.profileAvatar}
              />
              ) : (
                <Image
                alt=""
                source={require("../../assets/images/user.jpg")}
                style={styles.profileAvatar}
              />
              )}

<TouchableOpacity
                  onPress={() => navigation.navigate('Profil')}>
                <View style={styles.profileAction}>
                  <FeatherIcon color="#fff" name="edit-3" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{user[0].nom_prenom}</Text>
            <TouchableOpacity onPress={() => alert(user[0].description)}>
            <Text style={styles.profileAddress} numberOfLines={3}>
            {user[0].description}
            </Text>
            </TouchableOpacity>
          </View>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <Text style={styles.sectionHeader}>{header}</Text>
            {items.map(({ label, icon, src, color }, index) => {
              return (
                <TouchableOpacity
                  key={label}
                  onPress={() => navigation.navigate(src)}>
                  <View style={styles.row}>
                    <View style={[styles.rowIcon, { backgroundColor: color }]}>
                      <MaterialCommunityIcons color="#fff" name={icon} size={18} />
                    </View>

                    <Text style={styles.rowLabel}>{label}</Text>

                    <View style={styles.rowSpacer} />

                      <MaterialCommunityIcons
                        color="#0c0c0c"
                        name="chevron-right"
                        size={22}
                      />
                    
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      </View>

      <View style={styles.overlay}>
<TouchableOpacity onPress={() => navigation.navigate("Deconnexion")}
  style={{ flex: 1 }}>
  <View style={styles.btn}>
    
    <MaterialCommunityIcons
      color="#fff"
      name="lock"
      size={18}
      style={{ marginRight: 12 }}
    />
    <Text style={styles.btnText}>Déconnexion</Text>
  </View>
</TouchableOpacity>
</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  profile: {
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom : 10
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
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
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    width:'100%',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});