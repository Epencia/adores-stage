import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/connexion';
import LogoutScreen from '../screens/deconnexion';
import WelcomeScreen from '../screens/bienvenue';
import Categorie from '../screens/data/liste-categorie';
import BottomTabsMobile from '../navigation/BottomTabNavigator';
import Reseau from '../screens/data/liste-mobile-money';
import Retrait from '../screens/data/retrait-carte';
import Transfert from '../screens/data/transfert-carte';
import Transactions from '../screens/data/liste-transaction';
import DetailsTransaction from '../screens/data/details-transaction';
import Stages from '../screens/data/menu-stage';
import ChoixThemeStage from '../screens/data/choix-theme-stage';
import AttestationStage from '../screens/data/liste-attestation';
import ListeCycle from '../screens/data/liste-cycle';
import FiliereParCycle from '../screens/data/liste-filiere';
import InscriptionStage from '../screens/data/inscription-stage';
import ListeStagiaireTaches from '../screens/data/liste-stagiaire-taches';
import ListeTaches from '../screens/data/liste-taches';
import MenuStage from '../screens/data/menu-stage';
import CycleCritereNotation from '../screens/data/cycle-critere-notation';
import ListeCritereNotation from '../screens/data/liste-critere-notation';
import ReglementInterieur from '../screens/data/liste-reglement-interieur';
import ListeStagiaireThemeStage from '../screens/data/liste-stagiaire-theme';
import FoireAuxQuestions from '../screens/data/foire-question';
import MaitreStage from '../screens/data/liste-maitre-stage';
import Messages from '../screens/data/messages';
import ProfilScreen from '../screens/data/profil-utilisateur';
import TransfertStagiaire from '../screens/data/transfert-stagiaire';
import ListeNotification from '../screens/data/notification';
import Contacts from '../screens/data/contact';
import Partage from '../screens/data/partage';
import AccueilMobile from '../screens/data/accueil';
import ListeUtilisateur from '../screens/data/liste-utilisateur';
import ParametreMobile from '../screens/data/parametres';
import Exemple from '../screens/exemple';
import DetailsPublicite from '../screens/data/details-publicite';
import MenuCompte from '../screens/data/menu-compte';
import NouvellePublicite from '../screens/data/nouvelle-publicite';
import ListePublicite from '../screens/data/liste-publicite';
import Formations from '../screens/data/liste-formation';
import VideosFormation from '../screens/data/liste-video-formation';
import ComptesCertifies from '../screens/data/liste-compte-certifie';
import DetailsFormation from '../screens/data/details-formation';
import ListeSouscription from '../screens/data/liste-souscription';
import MenuServices from '../screens/data/menu-services';
import MenuOffices from '../screens/data/menu-offices';
import ListeMessage from '../screens/data/liste-message';
import MenuDecouvrir from '../screens/data/menu-decouvrir';
import RechargementDirect from '../screens/data/validation-rechargement-direct';
import RechargementIndirect from '../screens/data/validation-rechargement-indirect';
import ListeThemeStage from '../screens/data/liste-theme-stage';
import ListeRapportStage from '../screens/data/liste-rapport-stage';
import DetailsTaches from '../screens/data/details-tache';
import ListeThemeChoisi from '../screens/data/liste-theme-choisi';
import ListeAmbassadeurs from '../screens/data/liste-ambassadeur';
import MenuRegistres from '../screens/data/menu-registres';
import MesMembres from '../screens/data/mes-membres';
import ChoixFormule from '../screens/data/choix-formule';
import FicheNotation from '../screens/data/fiche-notation';
import ListeStagiaireNotation from '../screens/data/liste-stagiaire-notation';
import ProcedurePartenaire from '../screens/data/procedure-partenaire';
import DetailsReglement from '../screens/data/details-reglement';
import Inscription from '../screens/inscription';
import ListeStagiaire from '../screens/data/liste-stagiaire';
import FormationsCategorie from '../screens/data/liste-formation-categorie';
import ListePlateforme from '../screens/data/liste-plateforme';
import DetailsPlateforme from '../screens/data/details-plateforme';
import MenuEtudes from '../screens/data/menu-etudes';
import FicheProfessionnelle from '../screens/data/fiche-professionnelle';
import Tutoriels from '../screens/data/tutoriel';
import EcoleCabinet from '../screens/data/ecole-cabinet';
import FiliereBTS from '../screens/data/filiere-bts';
import MatiereParFiliere from '../screens/data/liste-matiere-filiere';
import EpreuveParMatiere from '../screens/data/liste-epreuve-matiere';
import PDF from '../screens/data/pdf';
import ListeDocument from '../screens/data/liste-document';
import PDFURL from '../screens/data/pdf-url';
import ListeClasse from '../screens/data/liste-classe';
import MatiereParClasse from '../screens/data/liste-matiere-classe';
import CoursParMatiere from '../screens/data/liste-cours-matiere';
import ConditionStage from '../screens/data/condition-stage';
import RegistreFormations from '../screens/data/registre-formation';
import RegistreStagiaires from '../screens/data/registre-stagiaire';
import PresentationGenerale from '../screens/data/presentation-generale';
import SoutenanceEncours from '../screens/data/liste-soutenance-encours';
import ListeTemoignage from '../screens/data/temoignage';
import MesMaitreStage from '../screens/data/mes-maitres-stage';
import BadgeProfessionnel from '../screens/data/badge-professionnel';
import MatiereLicence from '../screens/data/liste-matiere-licence';
import MatiereMaster1 from '../screens/data/liste-matiere-master1';
import MatiereMaster2 from '../screens/data/liste-matiere-master2';
import DetailsAttestationStage from '../screens/data/details-attestation-stage';
import DemandeStage from '../screens/data/demande-stage';
import DetailsStagiaires from '../screens/data/details-stagiaire';



const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Bienvenue">
        

      <Stack.Screen 
        name="Exemple" 
        component={Exemple} 
        options={{headerShown: true}}
        />


      <Stack.Screen 
        name="Bienvenue" 
        component={WelcomeScreen} 
        options={{headerShown: true}}
        />

       <Stack.Screen 
        name="Connexion" 
        component={LoginScreen} 
        options={{title: 'Connexion ',headerShown: true}}
        />


<Stack.Screen 
        name="Deconnexion" 
        component={LogoutScreen} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu Mobile" 
        component={BottomTabsMobile} 
        options={{headerShown: false}}
        />
        

<Stack.Screen 
        name="Inscription" 
        component={Inscription} 
        options={{headerShown: true}}
        />
        


        <Stack.Screen 
        name="Accueil Mobile" 
        component={AccueilMobile} 
        options={{headerShown: true}}
        />





<Stack.Screen 
        name="Menu Decouvrir" 
        component={MenuDecouvrir} 
        options={{headerShown: true}}
        />  

<Stack.Screen 
        name="Details publicite" 
        component={DetailsPublicite} 
        options={{headerShown: true}}
        /> 

<Stack.Screen 
        name="Liste des utilisateurs" 
        component={ListeUtilisateur} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Menu registres" 
        component={MenuRegistres} 
        options={{headerShown: true}}
        />


        <Stack.Screen 
        name="Parametres Mobiles" 
        component={ParametreMobile} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu compte" 
        component={MenuCompte} 
        options={{headerShown: true}}
        />




      <Stack.Screen 
        name="Catalogue" 
        component={Categorie} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Profil" 
        component={ProfilScreen} 
        options={{headerShown: true}}
        />
        




<Stack.Screen 
        name="Moyens de rechargement" 
        component={Reseau} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Rechargement direct" 
        component={RechargementDirect} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Rechargement indirect" 
        component={RechargementIndirect} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Retrait" 
        component={Retrait} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Transfert" 
        component={Transfert} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Transactions" 
        component={Transactions} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Details transaction" 
        component={DetailsTransaction} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Stage" 
        component={Stages} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Condition de stage" 
        component={ConditionStage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Inscription de stage" 
        component={InscriptionStage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Demande de stage" 
        component={DemandeStage} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des cycles" 
        component={ListeCycle} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Critères de notation" 
        component={CycleCritereNotation} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Fiches de notation" 
        component={FicheNotation} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des stagiaires" 
        component={ListeStagiaire} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details stagiaires" 
        component={DetailsStagiaires} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste stagiaire notation" 
        component={ListeStagiaireNotation} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des criteres de notation" 
        component={ListeCritereNotation} 
        options={{headerShown: true}}
        />





<Stack.Screen 
        name="Règlement interieur" 
        component={ReglementInterieur} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Filieres par cycle" 
        component={FiliereParCycle} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des stagiaires theme" 
        component={ListeStagiaireThemeStage} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Choix du theme" 
        component={ChoixThemeStage} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Themes choisis" 
        component={ListeThemeChoisi} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Attestation de stage" 
        component={AttestationStage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details attestation de stage" 
        component={DetailsAttestationStage} 
        options={{headerShown: true}}
        />
        

        <Stack.Screen 
        name="Procedure & Partenaire" 
        component={ProcedurePartenaire} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Telechargement" 
        component={ListeDocument} 
        options={{headerShown: true}}
        />





<Stack.Screen 
        name="Details reglement" 
        component={DetailsReglement} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Menu stage" 
        component={MenuStage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu etudes" 
        component={MenuEtudes} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu services" 
        component={MenuServices} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Menu Offices" 
        component={MenuOffices} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des stagiaires taches" 
        component={ListeStagiaireTaches} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des taches" 
        component={ListeTaches} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Details des taches" 
        component={DetailsTaches} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des themes" 
        component={ListeThemeStage} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des rapports" 
        component={ListeRapportStage} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Foires aux questions" 
        component={FoireAuxQuestions} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Maitre de stage" 
        component={MaitreStage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Messages" 
        component={Messages} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des messages" 
        component={ListeMessage} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Mes membres" 
        component={MesMembres} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Transfert de stagiaires" 
        component={TransfertStagiaire} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Notifications" 
        component={ListeNotification} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Contacts" 
        component={Contacts} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Videos par formation" 
        component={VideosFormation} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Formations" 
        component={Formations} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Categorie Formations" 
        component={FormationsCategorie} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details formation" 
        component={DetailsFormation} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des souscriptions" 
        component={ListeSouscription} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Partage" 
        component={Partage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des ambassadeurs" 
        component={ListeAmbassadeurs} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Choix formule" 
        component={ChoixFormule} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Nouvelle publicite" 
        component={NouvellePublicite} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Liste publicite" 
        component={ListePublicite} 
        options={{headerShown: true}}
        />
        


<Stack.Screen 
        name="Comptes certifies" 
        component={ComptesCertifies} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Fiche Professionnelle" 
        component={FicheProfessionnelle} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Tutoriels" 
        component={Tutoriels} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Ecoles & cabinets" 
        component={EcoleCabinet} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Filieres BTS" 
        component={FiliereBTS} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Matiere par filiere" 
        component={MatiereParFiliere} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Epreuve par matiere" 
        component={EpreuveParMatiere} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste classe" 
        component={ListeClasse} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Matiere par classe" 
        component={MatiereParClasse} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Matiere licence" 
        component={MatiereLicence} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Matiere master 1" 
        component={MatiereMaster1} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Matiere master 2" 
        component={MatiereMaster2} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Cours par matiere" 
        component={CoursParMatiere} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="PDF" 
        component={PDF} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="PDF URL" 
        component={PDFURL} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Registre de formations" 
        component={RegistreFormations} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Registre des stagiaires" 
        component={RegistreStagiaires} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Presentation generale" 
        component={PresentationGenerale} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste Plateforme" 
        component={ListePlateforme} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details Plateforme" 
        component={DetailsPlateforme} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Soutenance Encours" 
        component={SoutenanceEncours} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Temoignages" 
        component={ListeTemoignage} 
        options={{headerShown: true}}
        />


        
<Stack.Screen 
        name="Mes maitres stage" 
        component={MesMaitreStage} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Badge professionnel" 
        component={BadgeProfessionnel} 
        options={{headerShown: true}}
        />



      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes