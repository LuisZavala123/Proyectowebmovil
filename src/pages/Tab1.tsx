import React from 'react';
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
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonRadio,
    IonRadioGroup,
    useIonViewWillEnter
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';


import './Tab1.css';
import { useLista} from '../hooks/useLista';




const Tab1: React.FC = () => {
    
    
    const {
        crear,
         telefono,
         setTelefono,
         nombre,
         setNombre,
         tipo,
         setTipo,
         listar} = useLista();

         useIonViewWillEnter(() => {
            listar();
        })
    
    return (
        <IonPage>
        
            <IonHeader>
                <IonToolbar>
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
                            placeholder="Nombre"
                            onIonChange={ e => setNombre(e.detail.value!) }
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput value={telefono}
                            placeholder="Telefono"
                            onIonChange={ e => setTelefono(e.detail.value!) }
                        ></IonInput>
                    </IonItem>
                    <IonList>
          <IonRadioGroup value={tipo} onIonChange={e => setTipo(e.detail.value)}>
            <IonListHeader>
              <IonLabel>Tipo</IonLabel>
            </IonListHeader>

            <IonItem>
              <IonLabel>Movil</IonLabel>
              <IonRadio slot="start" value="Movil" />
            </IonItem>

            <IonItem>
              <IonLabel>Casa</IonLabel>
              <IonRadio slot="start" value="Casa" />
            </IonItem>
          </IonRadioGroup>
          <IonItemDivider>Seleccion</IonItemDivider>
          <IonItem>{tipo ?? '(none selected'}</IonItem>
        </IonList>
                <IonButton id="btncrear" color="success" expand="block"
                    onClick={() => crear() }>
                        Agregar<IonIcon icon={addOutline}>
                        </IonIcon></IonButton>
                </IonCard>
                
            </IonContent>
        </IonPage>
    );
};
export default Tab1;