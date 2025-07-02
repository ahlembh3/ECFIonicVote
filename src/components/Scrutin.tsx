import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList ,IonItem,IonLabel, IonButton} from '@ionic/react';
interface Scrutin {
    
            id: number;
            title: string;
            starts_at: string;
            ends_at: string;
        
 }

const Scrutin:  React.FC = () => {
        const [scrutins,setScrutins] = useState<Scrutin[]>([]);
    
         useEffect(()=>{
            const fetchScrutins = async ()=>{
                try{
                    const res = await fetch('http://localhost:3000/api/v1/scrutins');
                    if(!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
                    const json = await res.json();
                    setScrutins(json.data);
                    console.log(scrutins);
                    
    
                } catch(err){
                    console.error('Erreur lors du chargement des membres:',err);
                }
            };
            fetchScrutins();
            
         },[]);
  return (
   <IonPage>
               <IonHeader>
                   <IonToolbar>
                       <IonTitle>Liste des scrutins</IonTitle>
                   </IonToolbar>
               </IonHeader>
               <IonContent>
                   <IonList>
                       {scrutins.map((scrutin)=>(
                           <IonItem key={scrutin.id}>
                              <IonLabel className="ion-text-wrap">
                              <h2>{scrutin.title}</h2>
                              <p>Date de debut : {new Date(scrutin.starts_at).toLocaleDateString()}</p>
                              <p>Date de fin :{new Date(scrutin.ends_at).toLocaleDateString()} </p>
                              </IonLabel>
                              <IonButton routerLink={`/scrutins/${scrutin.id}/members?title=${encodeURIComponent(scrutin.title)}`}
                              slot="end">
                              Liste des membres
                              </IonButton>
                          </IonItem>
                       ))}
                   </IonList>
                   
               </IonContent>
           </IonPage>
  );
};

export default Scrutin;