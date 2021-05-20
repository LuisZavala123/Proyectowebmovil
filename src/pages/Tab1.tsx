import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonCard,
    IonButton,
    IonItem,
    IonIcon,
    IonToast
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';

import './Tab1.css';
import 'firebase/firebase-firestore';
import { useLista} from '../hooks/useLista';




const Tab1: React.FC = () => {

    
    const {listar, 
        crear,
         mensaje,
         setMensaje,
         titulos,
         setTitulos,
         nombre,
         setNombre,
         bandera } = useLista();

    
    return (
        <IonPage>
        <IonToast
           isOpen={mensaje}
           onDidDismiss={() => setMensaje(false)}
           message="equipo guardado"
           duration={500}
          />
            <IonHeader>
                <IonToolbar color="warning">
                    <IonTitle>Formulario</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Equipo</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonItem>
                        <IonInput value={nombre}
                            placeholder="Nombre Equipo"
                            onIonChange={ e => setNombre(e.detail.value!) }
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput value={titulos}
                            placeholder="Cantidad Titulos"
                            onIonChange={ e => setTitulos(e.detail.value!) }
                        ></IonInput>
                    </IonItem>
                <IonButton color="success" expand="block"
                    onClick={() => crear() }>
                        <IonIcon icon={addOutline}>
                        </IonIcon>{bandera?'Equipo':'Editar'}</IonButton>
                </IonCard>
                
            </IonContent>
        </IonPage>
    );
};
export default Tab1;