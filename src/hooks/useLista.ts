import {useState} from 'react';
import {contacto} from '../modelo/contacto'
import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast';
import { Haptics } from '@capacitor/haptics';
import { ActionSheet} from '@capacitor/action-sheet';
import { ScreenReader } from '@capacitor/screen-reader';
import { Storage } from '@capacitor/storage';



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
            let con=0;
            const { value } = await Storage.get({ key: con+'' });
            let valuejs = JSON.parse(value+'');
            while(valuejs!=null)
            {
              
              let obj={
                  id:con+'',
                  nombre:valuejs.nombre+'',
                  telefono:valuejs.telefono+'',
                  tipo:valuejs.tipo+''
              };
              con++;
              let { value } = await Storage.get({ key: con+'' });
              valuejs = JSON.parse(value+'');
              lista.push(obj);
            }
            setLista(lista)
            
        } catch (error) {
          console.log(error);
          
        }
    }

    

    const crear = async () => {
      let con = lista.length;
        try {
            if(bandera){
              
              await Toast.show({
                text: con+'',});
              await Storage.set({
                key: con+'',
                value: JSON.stringify({
                  "nombre":nombre,
                  "telefono":telefono,
                  "tipo":tipo
                }),
              });
              showagregartoast();
            }else{
              eliminar(id);
              await Storage.set({
                key: id,
                value: JSON.stringify({
                  "nombre":nombre,
                  "telefono":telefono,
                  "tipo":tipo
                }),
              });
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
                await Storage.remove({ key: id });
                listar();
                showEliminartoast(); 
            } catch (error) {} 
       
    }

    const editar = (id:string,nombre:string,telefono:string,tipo:string) => {
      setId(id);
      setNombre(nombre);
      setTelefono(telefono);
      setTipo(tipo);
      setBandera(false);
      crear();
      showeditartoast();
      
  } 

  
const showActions = async (id:string,nombre:string,telefono:string,tipo:string) => {
    const result = await ActionSheet.showActions({
      title: 'Opciones',
      message: 'Selectiona una opcion',
      options: [
        {
          title: 'Modificar',
        },
        {
          title: 'Eliminar',
        },
        {
          title: 'Leer',
        }
      ],
    });
  switch (result.index) {
      case 0:
          editar(id,nombre,telefono,tipo);
          break;
      case 1:
          showeliminar(id)
          break;
      case 2:
            leer('El nombre del contacto es '+nombre+', su telefono es '+telefono+', y esta registrado como un numero de '+tipo)
            break;
      default:
          break;
  }
    
  };

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
      text: 'se ha editado el contacto',
    });
  };

  const hapticsVibrate = async () => {
    await Haptics.vibrate();
  };

  
  

  const leer = async (texto:string) => {
    if(await ScreenReader.isEnabled()){
    await ScreenReader.speak({ value: texto });
    }else{
      await Toast.show({
        text: 'El Lector no esta disponible',
      });
    }
  }

  return {
    listar, 
    crear,
    showActions,
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


