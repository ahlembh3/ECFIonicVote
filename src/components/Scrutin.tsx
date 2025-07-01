import React, { useEffect, useState } from 'react';

interface Scrutin {
    
            id: number;
            title: string;
            starts_at: string;
            ends_at: string;
        
 }

const Scrutin:  React.FC = () => {
        const [scrutin,setScrutin] = useState<Scrutin[]>([]);
    
         useEffect(()=>{
            const fetchScrutins = async ()=>{
                try{
                    const res = await fetch('http://localhost:3000/api/v1/scrutins');
                    if(!res.ok) throw new Error('Erreur HTTP : ${res.status}');
                    const json = await res.json();
                    setScrutin(json.data);
                    console.log(scrutin);
                    
    
                } catch(err){
                    console.error('Erreur lors du chargement des membres:',err);
                }
            };
            fetchScrutins();
            
         },[]);
  return (
    <div id="container">
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default Scrutin;