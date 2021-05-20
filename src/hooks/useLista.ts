import {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import {contacto} from '../modelo/contacto'
import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast';
import { Haptics } from '@capacitor/haptics';



export function useLista(){
    const [lista, setLista] = useState < contacto[] > ([]); 
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipo, setTipo] = useState('');
    const [bandera, setBandera] = useState(true);
    const listar = async () => {
        try {
            let lista: contacto[] = []
            const res = await firebase.firestore().collection('contacto').get();
            res.forEach((doc) => {
                let obj = {
                    id: doc.id,
                    nombre: doc.data().nombre,
                    telefono: doc.data().telefono,
                    tipo: doc.data().tipo
                };
                lista.push(obj)
    
            });
            setLista(lista)
        } catch (error) {}
    }

    const crear = async () => {
        try {
            if(bandera){
                await firebase.firestore().collection('contacto').add(
                    {nombre, telefono,tipo});
                   
            }else{
                await firebase.firestore().collection('contacto').doc(id).set(
                    {nombre, telefono,tipo});
                    setBandera(true);
            }
            
        } catch (error) {}
        setId('');
        setNombre('');
        setTelefono('');
        setTipo('');
        listar();  
    }
    const showeliminar = async (id:string) => {
        hapticsVibrate();
        const { value } = await Dialog.confirm({
          title: 'Eliminar',
          message: `¿desea eliminar el contacto?`,
        });
      
        if(value){
            eliminar(id);
            showEliminartoast();
        }
      };

    const eliminar = async(id:string) =>{
          
            try {
                console.log(id)
                await firebase.firestore().collection('contacto').doc(id).delete();
                listar();
                showagregartoast(); 
            } catch (error) {} 
       
    }

    const editar = (id:string,nombre:string,telefono:string,tipo:string) => {
      setId(id);
      setNombre(nombre);
      setTelefono(telefono);
      setTipo(tipo);
      setBandera(false);
      showeditartoast();
  } 

  const showEliminartoast = async () => {
    await Toast.show({
      text: 'Se ha eliminado el contacto',
    });
  };
  const showagregartoast = async () => {
    await Toast.show({
      text: 'se ha agregado el contacto',
    });
  };
  const showeditartoast = async () => {
    await Toast.show({
      text: 'sea editado el contacto',
    });
  };

  const hapticsVibrate = async () => {
    await Haptics.vibrate();
  };

  return {
    listar, 
    crear,
    showeliminar,
    editar,
    lista,
    telefono,
    setTelefono,
    nombre,
    setNombre,
    tipo,
    setTipo,
    bandera

  };
}


