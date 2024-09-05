import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
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

export default function MenuStage({navigation}) {

  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.titre.toLowerCase().includes(searchText.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText.toLowerCase())   
  );

  useEffect(()=>{
    navigation.setOptions({ title: 'Stages' });
},[])

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredData}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fond blanc
    padding: 16,
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



