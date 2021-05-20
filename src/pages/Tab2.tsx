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
  IonToast,
} from '@ionic/react';

import {trashBinOutline, pencil } from 'ionicons/icons';
import './Tab2.css';
import { useLista} from '../hooks/useLista';
import React from 'react';

const Tab2: React.FC = () => {

  

  const {eliminar,
     editar,
     listar,
     showToast2,
     setShowToast2,
     showToast3,
     setShowToast3,
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
                               onClick={() => eliminar(''+contacto.id)}>
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
                 <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Contacto eliminado"
        duration={2000}
      />
       <IonToast
        isOpen={showToast3}
        onDidDismiss={() => setShowToast3(false)}
        message="C0ntacto editado"
        duration={2000}
      />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
