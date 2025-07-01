import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Scrutin from '../components/Scrutin';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des scrutins</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       
        <Scrutin />
      </IonContent>
    </IonPage>
  );
};

export default Home;
