import {IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList ,IonItem,IonLabel, IonButton} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation} from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip,ResponsiveContainer } from 'recharts';
import './Home.css';




interface Membre{
    id:number;
    first_name: string;
    last_name:string;
    birth_date:string;
    has_voted:number;
}

interface State{
    total:number;
    voted:number;
}
const ListeMembres: React.FC = ()=>{
     const [membres,setMembres] = useState<Membre[]>([]);
     const [stats,setStats] = useState<State | null>(null);
     const { id: scrutinId } = useParams<{ id: string }>();
     const [showModal, setShowModal] = useState(false);
     const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('title');
    console.log('Titre reçu :', title);

     useEffect(()=>{
        if (!scrutinId) return; 
        const fetchMembres = async ()=>{
            try{
                const res = await fetch(`http://localhost:3000/api/v1/scrutins/${scrutinId}/members`);
                if(!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
                const json = await res.json();
                setMembres(json.data);
                

            } catch(err){
                console.error('Erreur lors du chargement des membres:',err);
            }
        };
        fetchMembres();
        
     }, [scrutinId]);

      const handleVote = async (memberId: number) => {
          try {
            const res = await fetch(`http://localhost:3000/api/v1/scrutins/${scrutinId}/members/${memberId}/vote`, {
                         method: 'POST',});
          if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);

              setMembres(membres => membres.map(m =>
                          m.id === memberId ? { ...m, has_voted: 1 } : m )
                        );
          } catch (err) {
          console.error(`Erreur lors du vote pour le membre ${memberId} :`, err);
            }
        };

        const handleState = async () => {
              try {
            const res = await fetch(`http://localhost:3000/api/v1/scrutins/${scrutinId}/stats`, {
                         method: 'GET',});
                if(!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
                const json = await res.json();
                setStats(json.data);

                setShowModal(true);

            } catch(err){
                console.error('Erreur lors du chargement des stats:',err);
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
                            <IonLabel color="success" slot="end"><strong>A voté</strong></IonLabel>
                           ):(
                            <IonButton slot="end" onClick={() => handleVote(membre.id)}>Voter</IonButton>
                           )}
            
                       </IonItem>
                    ))}
                </IonList>
                <IonButton color="medium" onClick={() => handleState()}>Consulter les stats</IonButton>
                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}
                          initialBreakpoint={0.7}
                          breakpoints={[0, 0.7, 0.75]}
                           handleBehavior="cycle"  
                           className="modal-stat">
                   <IonHeader>
                     <IonToolbar>
                       <IonTitle>{title || 'Titre non disponible'}</IonTitle>
                     </IonToolbar>
                   </IonHeader>
                   <IonContent className="ion-padding">
                            {stats && (
                                   <>
                                   <ResponsiveContainer width="100%" height={250}>
                                     <PieChart width={300} height={250}>
                                         <Pie data={[
                                                      { name: "A voté", value: stats.voted },
                                                      { name: "N'a pas voté", value: stats.total - stats.voted },
                                                    ]}
                                          dataKey="value"
                                          nameKey="name"
                                          cx="50%"
                                          cy="50%"
                                          outerRadius={80}
                                            label={({  index  }: any) => {
                                                                    const values = [stats.voted, stats.total - stats.voted];
                                                                    const percent = (values[ index ] / stats.total) * 100;
                                                                    console.log(`${percent.toFixed(0)}%`);
                                                                    return `${percent.toFixed(0)}%`;
                                                                  }}
                                            >
                                           <Cell fill="#2dd36f" /> 
                                           <Cell fill="#eb445a" /> 
                                         </Pie>
                                         <Tooltip />
                                         <Legend />
                                     </PieChart>
                                     </ResponsiveContainer>
                                 </>
                            )}
                        <IonButton expand="block" color="medium" onClick={() => setShowModal(false)}>
                            Fermer
            
                        </IonButton>
                  </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
     );
};

export default ListeMembres;