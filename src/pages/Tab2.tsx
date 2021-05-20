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
} from '@ionic/react';

import {trashBinOutline, pencil } from 'ionicons/icons';
import './Tab2.css';
import { useLista} from '../hooks/useLista';

const Tab2: React.FC = () => {

  

  const {eliminar,
     editar,
     listar,
     listaEquipo} = useLista();

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

export default Tab2;
