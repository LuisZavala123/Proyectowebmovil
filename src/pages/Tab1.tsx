import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    useIonViewWillEnter,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonList,
    IonButton,
    IonItem,
    IonIcon,
    IonToast
} from '@ionic/react';
import { addOutline, trashBinOutline, pencil } from 'ionicons/icons';
import {firebaseConfig} from '../database/config'
import firebase from 'firebase/app'; 
import './Tab1.css';
import 'firebase/firebase-firestore';
import { useLista} from '../hooks/useLista';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Tab1: React.FC = () => {

    
    const {listar, 
        crear,
        eliminar,
         editar,
         listaEquipo,
         mensaje,
         setMensaje,
         titulos,
         setTitulos,
         nombre,
         setNombre,
         bandera } = useLista();

    useIonViewWillEnter(() => {
        listar();
    })
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
                    <IonTitle>CRUD IONIC REACT FIREBASE</IonTitle>
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
                <IonList> {
                    listaEquipo.map(equipo => (
                        <IonCard key={equipo.id} >
                            <IonCardHeader>
                                <IonCardTitle>Nombre:{
                                    equipo.nombre
                                }</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Titulos: {equipo.titulos} 
                                <IonButton color="danger" expand="block"
                               onClick={() => eliminar(''+equipo.id)}>
                             <IonIcon icon={trashBinOutline}></IonIcon>
                               Eliminar</IonButton>  
                        <IonButton color="tertiary" expand="block"
                         onClick={
                    () => editar(''+equipo.id,''+equipo.nombre,''+equipo.titulos)}>
                             <IonIcon icon={pencil}></IonIcon>Editar</IonButton>   
                            </IonCardContent>
                             
                        </IonCard>
                    )) }
                 </IonList>
            </IonContent>
        </IonPage>
    );
};
export default Tab1;