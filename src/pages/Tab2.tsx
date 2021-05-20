import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonList,
  IonButton,
  IonIcon,
  useIonViewWillEnter,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';

import { RefresherEventDetail } from '@ionic/core';

import {trashBinOutline, pencil } from 'ionicons/icons';
import './Tab2.css';
import { useLista} from '../hooks/useLista';
import React from 'react';

function doRefresh(event: CustomEvent<RefresherEventDetail>) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.detail.complete();
    window.location.reload();
  }, 2000);
}

const Tab2: React.FC = () => {

  

  const {showeliminar,
     editar,
     listar,
     lista} = useLista();

     useIonViewWillEnter(() => {
      listar();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
                    <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                         <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
                
      <IonList> {
                    lista.map(contacto => (
                        <IonCard key={contacto.id} >
                            <IonCardHeader>
                                <IonCardTitle>Nombre:{
                                    contacto.nombre
                                }</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Telefono: {contacto.telefono}
                                Tipo: {contacto.tipo} 
                                <IonButton color="danger" expand="block"
                               onClick={() => showeliminar(''+contacto.id)}>
                             <IonIcon icon={trashBinOutline}></IonIcon>
                               Eliminar</IonButton>  
                        <IonButton color="tertiary" expand="block"
                         onClick={
                    () => editar(''+contacto.id,
                    ''+contacto.nombre,
                    ''+contacto.telefono,
                    ''+contacto.tipo)}>
                             <IonIcon icon={pencil}></IonIcon>Editar</IonButton>   
                            </IonCardContent>
                             
                        </IonCard>
                    )) }
                 </IonList>
                 
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
