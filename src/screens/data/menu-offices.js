import React , {useEffect, useState, useContext } from 'react';
import {StyleSheet,SafeAreaView,View,TouchableOpacity,Text,TextInput,FlatList,Image} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const tabs = [
  { name: 'Stages', icon: 'star' },
  { name: 'Etudes', icon: 'book' },
  { name: 'Services', icon: 'book-open' },
];

const data1 = [
  {
    id: '1',
    image: 'account-tie-outline',
    titre: 'DEMANDE DE STAGE',
    libelle: 'Faire une demande de stage',
    src : 'Inscription de stage'
  },
  {
    id: '2',
    image: 'book-plus-outline',
    titre: 'CHOIX DU THÈME DE STAGE',
    libelle: 'Choisir un thème de stage',
    src : 'Liste des stagiaires theme'
  },
  {
    id: '3',
    image: 'book-multiple-outline',
    titre: 'THÈMES DE STAGE CHOISIS',
    libelle: 'Voir les thèmes de stage choisis',
    src : 'Themes choisis'
  },
  {
    id: '4',
    image: 'clipboard-list-outline',
    titre: 'EXÉCUTION DES TÂCHES',
    libelle: 'Voir et exécuter les tâches',
    src : 'Liste des stagiaires taches'
  },
  {
    id: '5',
    image: 'folder-outline',
    titre: 'CRITÈRES DE NOTATION',
    libelle: 'Voir le contenu des critères',
    src : 'Critères de notation'
  },
  {
    id: '6',
    image: 'folder-edit-outline',
    titre: 'FICHES DE NOTATION',
    libelle: 'Voir les fiches de notation',
    src : 'Liste stagiaire notation'
  },
  {
    id: '7',
    image: 'notebook-outline',
    titre: 'RÈGLEMENT INTÉRIEUR',
    libelle: 'Voir le règlement intérieur',
    src : 'Règlement interieur'
  },
  {
    id: '8',
    image: 'book-open-page-variant-outline',
    titre: 'ATTESTATION DE STAGE',
    libelle: 'Voir les attestations de stage',
    src : 'Attestation de stage'
  },
  {
    id: '9',
    image: 'account-multiple-check-outline',
    titre: 'MES STAGIAIRES',
    libelle: 'Voir les demandes de stage',
    src : 'Liste des stagiaires'
  },
  {
    id: '10',
    image: 'account-arrow-right-outline',
    titre: 'TRANSFERT DE STAGIAIRE',
    libelle: 'Transférer vers un autre compte',
    src : 'Transfert de stagiaires'
  },
  {
    id: '11',
    image: 'file-search-outline',
    titre: 'FOIRE AUX QUESTIONS',
    libelle: 'Voir les réponses à vos questions',
    src : 'Foires aux questions'
  },
  {
    id: '12',
    image: 'comment-outline',
    titre: 'MAÎTRES DE STAGE',
    libelle: 'Echanger avec les maîtres de stage',
    src : 'Mes maitres stage'
  },
  {
    id: '13',
    image: 'file-document-edit-outline',
    titre: 'RÉDACTEUR DE MÉMOIRE',
    libelle: 'Soumettre sa rédaction à des experts',
    src : 'Liste des themes'
  },
  {
    id: '14',
    image: 'file-document-outline',
    titre: 'MÉMOIRES RÉDIGÉS',
    libelle: 'Voir la liste des mémoires rédigés',
    src : 'Liste des rapports'
  },
  {
    id: '15',
    image: 'book-check-outline',
    titre: 'FICHE PROFESSIONNELLE',
    libelle: 'Voir le parcours professionnel',
    src : 'Fiche Professionnelle'
  },
  {
    id: '16',
    image: 'account-check-outline',
    titre: 'SOUTENANCE EN ATTENTE',
    libelle: 'Voir la liste des stagiaires autorisés',
    src : 'Soutenance Encours'
  },
  {
    id: '17',
    image: 'book-education-outline',
    titre: 'REGISTRE DES STAGIAIRES',
    libelle: 'Vérifier une attestation de stage',
    src : 'Registre des stagiaires'
  },

  ];


  const data2 = [
    {
      id: '1',
      image: 'book-outline',
      titre: 'LICENCE PROFESSIONNELLE',
      libelle: 'Voir les cours et les évaluations',
      src : 'Matiere licence'
    },
    {
      id: '2',
      image: 'account-check-outline',
      titre: 'MASTER 1 PROFESSIONNEL',
      libelle: 'Voir les cours et les évaluations',
      src : 'Matiere master 1'
    },
    {
      id: '3',
      image: 'home-outline',
      titre: 'MASTER 2 PROFESSIONNEL',
      libelle: 'Voir les cours et les évaluations',
      src : 'Matiere master 2'
    },
    {
      id: '4',
      image: 'play-box-multiple-outline',
      titre: 'FORMATIONS GRATUITES',
      libelle: 'Voir toutes les formations',
      src : 'Categorie Formations'
    },
    {
      id: '5',
      image: 'certificate-outline',
      titre: 'MES CERTIFICATIONS',
      libelle: 'Voir les certificats obtenus',
      src : 'Liste des souscriptions'
    },
    {
      id: '6',
      image: 'video-outline',
      titre: 'TUTORIELS',
      libelle: 'Apprendre à utiliser nos plateformes',
      src : 'Tutoriels'
    },
    {
      id: '7',
      image: 'school-outline',
      titre: 'ÉCOLES & CABINETS',
      libelle: 'Voir les écoles & cabinets partenaires',
      src : 'Ecoles & cabinets'
    }, 
    {
      id: '8',
      image: 'book-education-outline',
      titre: 'REGISTRE DE FORMATIONS',
      libelle: 'Vérifier un certificat professionnel',
      src : 'Registre de formations'
    }, 
  ];


  const data3 = [
    {
      id: '1',
      image: 'credit-card-outline',
      titre: 'GESTION DU COMPTE',
      libelle: "Suivre l'activité de son compte",
      src : 'Menu compte'
    },
    {
      id: '2',
      image: 'account-outline',
      titre: 'GESTION DU PROFIL',
      libelle: 'Voir votre profil utilisateur',
      src : 'Profil'
    },
    {
      id: '3',
      image: 'book-multiple-outline',
      titre: 'JOURNAL OFFICIEL',
      libelle: 'Voir les publications',
      src : 'Liste publicite'
    },
    {
      id: '4',
      image: 'account-cash-outline',
      titre: 'RECHARGEMENT',
      libelle: 'Déposer des fonds',
      src : 'Moyens de rechargement'
    },
    {
      id: '5',
      image: 'cash',
      titre: 'RETRAIT DE FONDS',
      libelle: 'Rétirer des fonds',
      src : 'Retrait'
    },
    {
      id: '6',
      image: 'bank-outline',
      titre: 'TRANSFERT DE FONDS',
      libelle: 'Envoyer des fonds',
      src : 'Transfert'
    },
    {
      id: '7',
      image: 'card-account-details-outline',
      titre: 'TRANSACTIONS',
      libelle: 'Voir toutes vos transactions',
      src : 'Transactions'
    },
    {
      id: '8',
      image: 'handshake-outline',
      titre: "AGENCES D'EMPLOI",
      libelle: "Découvrir les plateformes de l'emploi",
      src : 'Liste Plateforme'
    },
    {
      id: '9',
      image: 'bullhorn-outline',
      titre: 'TÉMOIGNAGES',
      libelle: 'Voir les témoignages',
      src : 'Temoignages'
    },
    {
      id: '10',
      image: 'cog-outline',
      titre: 'PARAMÈTRES',
      libelle: 'Voir les paramètres',
      src : 'Parametres Mobiles'
    },

  ];



export default function MenuOffices({navigation,item}) {

  const [value, setValue] = React.useState(0);

  const [searchText1, setSearchText1] = useState('');
  const filteredData1 = data1.filter((item) =>
    item.titre.toLowerCase().includes(searchText1.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText1.toLowerCase())   
  );

  const [searchText2, setSearchText2] = useState('');
  const filteredData2 = data2.filter((item) =>
    item.titre.toLowerCase().includes(searchText2.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText2.toLowerCase())   
  );

  const [searchText3, setSearchText3] = useState('');
  const filteredData3 = data3.filter((item) =>
    item.titre.toLowerCase().includes(searchText3.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText3.toLowerCase())   
  );

  
  useEffect(()=>{
    navigation.setOptions({title: 'Offices'});
  },[])
  


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

         {/* Section stages */}
         {value === 0 && (
         <View>
             <View style={styles.searchBar}>
        <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          onChangeText={(text) => setSearchText1(text)}
          value={searchText1}
        />
      </View>
      <FlatList
        data={filteredData1}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(item.src)}>
          <View style={styles.cardIcon}>
                    <MaterialCommunityIcons color="#000" name={item.image} size={24}/>
                    </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.titre}</Text>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>{item.libelle}</Text>
            </View>

          </View>
        </TouchableOpacity>
        )}
      />

          </View>
          
          )}

           {/* Section etudes */}
         {value === 1 && (
         <View>
             <View style={styles.searchBar}>
        <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          onChangeText={(text) => setSearchText2(text)}
          value={searchText2}
        />
      </View>
      <FlatList
        data={filteredData2}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(item.src)}>
          <View style={styles.cardIcon}>
                    <MaterialCommunityIcons color="#000" name={item.image} size={24}/>
                    </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.titre}</Text>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>{item.libelle}</Text>
            </View>

          </View>
        </TouchableOpacity>
        )}
      />

          </View>
          
          )}

         {/* Section services */}
         {value === 2 && (
          <View>
              <View style={styles.searchBar}>
        <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          onChangeText={(text) => setSearchText3(text)}
          value={searchText3}
        />
      </View>
      <FlatList
        data={filteredData3}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(item.src)}>
          <View style={styles.cardIcon}>
                    <MaterialCommunityIcons color="#000" name={item.image} size={24}/>
                    </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.titre}</Text>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>{item.libelle}</Text>
            </View>

          </View>
        </TouchableOpacity>
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
    marginBottom:100
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
    width: 50,
    height: 50,
    borderRadius: 25,
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
});