# ECFIonicVote
1/ Dans App changer le redirect vers home
   et rajouter la route <Route exact path="/scrutins/:id/members">
2/Dans home faire appel au composant Scrutin
3/Creer le composant Scrutin puis rajouter une Interface Scrutin
4/Dans le composant Scrutin ajouter un useeffect qui utilisera le fetch pour ce connecter a l'Api
5/Puis dans return on affichera les donnee a l'aide d'une map en forme de list a l'aide de IonList
6/ajouter le bouton IonButton dans IonItem puis a l'interieur routerLink avec le chemin vers la page members
7/Utiliser la commende const { id: scrutinId } = useParams<{ id: string }>(); pour recuperer l'id envoyer par routerLink dans ListeMembres
8/ corriger la route dans le fetch et ajouter [scrutinId] a la fin du useEffect permetera de relancer le fetch à chaque changement de scrutin.
9/corriger la route dans le fetch de handleVote pour recuperer l'id de scrutin et l'id du membre
10/mettre les donnees dans un IonList et IonItem
11/Jouter un bouton en dessous de IonList lorsque on click on passe la fonction handleState
12/creer la modale en dessous avec son useState
13/ Dans handleState faire le fetch pour récuperer les stats 
14/Comme on récupère un objet creer une interface State et un useState pour stats
15/Une fois on récupere les donnes faire showModal(true)
16/Dans la modale on affiche les donnees avec stats.voted et stats.total
17/creer le pie char à l'aide de la bibliotheque npm install recharts
18/dans mon IonContent de ma modale au lieu d'afficher les donnees je met mon composant PieChart et mes donnees dans data dans Pie
puis je met les couleurs vert et rouge dans les cells et j'ai la modale en mode sheet
19/ envoyer le titre du scrutin avec l'id pour que je puisse l'afficher dans ma modale donc:
routerLink={`/scrutins/${scrutin.id}/members?title=${encodeURIComponent(scrutin.title)}`}
et dans ListeMembers j'importe useLocation dans react-router-dom et je recupere title avec:
const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('title');
20/ Dans label de Pie j'ai ajouter les pourcentages
21/J'ai ajouter du style

