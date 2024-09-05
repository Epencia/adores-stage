import React , {useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,Image,
  TextInput,ScrollView
} from 'react-native';
import moment from 'moment';


export default function DetailsStagiaires({navigation,route}) {

    const {item} = route.params;

    const [CodeStagiaire, setCodeStagiaire] = useState(item.code_stagiaire || '');
    const [MatriculeCarte, setMatriculeCarte] = useState(item.matricule || '');
    const [NomPrenom, setNomPrenom] = useState(item.nom_prenom || '');
    const [DateNaissance, setDateNaissance] = useState(moment(item.date_naissance).format('DD-MM-YYYY') || '');
    const [LieuNaissance, setLieuNaissance] = useState(item.lieu_naissance || '');
    const [nationalite, setNationalite] = useState(item.nationalite || '');
    const [sexe, setSexe] = useState(item.sexe || '');
    const [email, setEmail] = useState(item.email || '');
    const [telephone, setTelephone] = useState(item.telephone || '');
    const [diplome, setDiplome] = useState(item.diplome || '');
    const [filiere, setFiliere] = useState(item.filiere || '');
    const [AnneeDiplome, setAnneeDiplome] = useState(item.annee_diplome || '');
    const [TypeStage, setTypeStage] = useState(item.type_stage || '');
    const [StatutStage, setStatutStage] = useState(item.statut || '');
    const [DateDebut, setDateDebut] = useState(moment(item.date_debut).format('DD-MM-YYYY') || '');
    const [DateFin, setDateFin] = useState(moment(item.date_fin).format('DD-MM-YYYY') || '');
    const [duree, setDuree] = useState(item.duree || '');
    const [soutenance, setSoutenance] = useState(item.soutenance || '');
    const [NoteStage, setNoteStage] = useState(item.note_stage || '');
    const [AppreciationNote, setAppreciationNote] = useState(item.appreciation_note || '');
    const [ecole, setEcole] = useState(item.ecole || '');
    const [etat, setEtat] = useState(item.etat || '');

    
    useEffect(()=>{
        navigation.setOptions({title: item.nom_prenom});
        
    },[])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        

        <ScrollView>


        <View style={styles.profile}>
          <View style={styles.profileHeader}>
          {item.photo64 ? (
            <Image
              alt=""
              source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
              style={styles.profileAvatar}
            />
            ) : (
                <Image
                source={require("../../assets/images/user.jpg")}
                         style={styles.profileAvatar}
                />
                )}

          </View>

      
        </View>

          <View style={styles.form}>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Code professionnel</Text>
              <TextInput
              label="Code professionnel"
              defaultValue={CodeStagiaire}
               onChangeText={(val) => setCodeStagiaire(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>
            

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Matricule</Text>
              <TextInput
              label="Matricule"
              defaultValue={MatriculeCarte}
               onChangeText={(val) => setMatriculeCarte(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Nom et prénoms</Text>
              <TextInput
              label="Nom et prénoms"
              defaultValue={NomPrenom}
               onChangeText={(val) => setNomPrenom(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Date de naissance</Text>

              <TextInput
                label="Date de naisssance"
                defaultValue={DateNaissance}
               onChangeText={(val) => setDateNaissance(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Lieu de naissance</Text>

              <TextInput
                label="Lieu de naisssance"
                defaultValue={LieuNaissance}
               onChangeText={(val) => setLieuNaissance(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Nationalité</Text>

              <TextInput
                label="Nationalité"
                defaultValue={nationalite}
               onChangeText={(val) => setNationalite(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Sexe</Text>

              <TextInput
                label="Sexe"
                defaultValue={sexe}
               onChangeText={(val) => setSexe(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Téléphone</Text>

              <TextInput
                label="Téléphone"
                defaultValue={telephone}
               onChangeText={(val) => setTelephone(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email</Text>

              <TextInput
                label="Email"
                defaultValue={email}
               onChangeText={(val) => setEmail(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Cycle</Text>

              <TextInput
                label="Cycle"
                defaultValue={diplome}
               onChangeText={(val) => setDiplome(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Filière</Text>

              <TextInput
                label="Filière"
                defaultValue={filiere}
               onChangeText={(val) => setFiliere(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Année du diplome</Text>

              <TextInput
                label="Année du diplome"
                defaultValue={AnneeDiplome}
               onChangeText={(val) => setAnneeDiplome(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Etablissement fréquenté</Text>

              <TextInput
               label="Ecole"
               defaultValue={ecole}
              onChangeText={(val) => setEcole(val)}
               placeholderTextColor="#6b7280"
               style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Type de stage</Text>

              <TextInput
                label="Type de stage"
                defaultValue={TypeStage}
               onChangeText={(val) => setTypeStage(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Statut du stage</Text>

              <TextInput
                label="Statut du stage"
                defaultValue={StatutStage}
               onChangeText={(val) => setStatutStage(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Date début stage</Text>

              <TextInput
                label="Date de debut"
                defaultValue={DateDebut}
               onChangeText={(val) => setDateDebut(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Date fin stage</Text>

              <TextInput
                label="Date de fin"
                defaultValue={DateFin}
               onChangeText={(val) => setDateFin(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Durée</Text>

              <TextInput
                label="Durée"
                defaultValue={duree}
               onChangeText={(val) => setDuree(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Soutenance</Text>

              <TextInput
                label="Soutenance"
                defaultValue={soutenance}
               onChangeText={(val) => setSoutenance(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Note de stage</Text>

              <TextInput
                label="Note de stage"
                defaultValue={NoteStage}
               onChangeText={(val) => setNoteStage(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Appréciation</Text>

              <TextInput
                label="Appreciation"
                defaultValue={AppreciationNote}
               onChangeText={(val) => setAppreciationNote(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            <View style={styles.input}>
              <Text style={styles.inputLabel}>Etat</Text>

              <TextInput
                label="Etat"
                defaultValue={etat}
               onChangeText={(val) => setEtat(val)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>


            
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  form: {
    paddingHorizontal: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#929292',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    //fontWeight: '500',
    color: 'black',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  profile: {
    //paddingTop: 5,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderColor: '#e3e3e3',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centrer horizontalement et verticalement
  },
  profileAvatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginTop: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});