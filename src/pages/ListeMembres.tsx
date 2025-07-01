import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList ,IonItem,IonLabel, IonButton} from '@ionic/react';
import React, { useEffect, useState } from 'react';

interface Membre{
    id:number;
    first_name: string;
    last_name:string;
    birth_date:string;
    has_voted:number;
}
const ListeMembres: React.FC = ()=>{
     const [membres,setMembres] = useState<Membre[]>([]);

     useEffect(()=>{
        const fetchMembres = async ()=>{
            try{
                const res = await fetch('http://localhost:3000/api/v1/members');
                if(!res.ok) throw new Error('Erreur HTTP : ${res.status}');
                const json = await res.json();
                setMembres(json.data);
                

            } catch(err){
                console.error('Erreur lors du chargement des membres:',err);
            }
        };
        fetchMembres();
        
     },[]);

      const handleVote = async (id: number) => {
          try {
            const res = await fetch(`http://localhost:3000/api/v1/members/${id}/vote`, {
                         method: 'POST',});
          if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);

              setMembres(membres => membres.map(m =>
                          m.id === id ? { ...m, has_voted: 1 } : m )
                        );
          } catch (err) {
          console.error(`Erreur lors du vote pour le membre ${id} :`, err);
            }
        };


     return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Liste des membres</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {membres.map((membre)=>(
                        <IonItem key={membre.id}>
                           <IonLabel className="ion-text-wrap">
                           <h2>{membre.first_name} {membre.last_name}</h2>
                           <p>Date de naissance : {membre.birth_date}</p>
                           </IonLabel>
                           {membre.has_voted?(
                            <IonLabel color="succes"><strong>A voté</strong></IonLabel>
                           ):(
                            <IonButton onClick={() => handleVote(membre.id)}>Voter</IonButton>
                           )}
            
                       </IonItem>
                    ))}
                </IonList>
                
            </IonContent>
        </IonPage>
     );
};

export default ListeMembres;