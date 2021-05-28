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
    

    

    const listar = async () => {
        try {
            let lista: contacto[] = []
            let con=0;
            
            let valuejs = JSON.parse(await (await Storage.get({ key: con+'' })).value+'');
            


             while(valuejs!=null)
              {
              
                let obj={
                    id:con+'',
                    nombre:valuejs.nombre+'',
                    telefono:valuejs.telefono+'',
                    tipo:valuejs.tipo+''
                };
                lista.push(obj);
                con++;
             let { value } = await Storage.get({ key: con+'' });
             valuejs = JSON.parse(value+'');
             
            }
            setLista(lista)
            
            


        } catch (error) {
          console.log(error);
          
        }
    }

    

    const crear = async () => {
      let con = lista.length;
        try {
           
              
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


  
const showActions = async (id:string,nombre:string,telefono:string,tipo:string) => {
    const result = await ActionSheet.showActions({
      title: 'Opciones',
      message: 'Selectiona una opcion',
      options: [
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
          showeliminar(id)
          break;
      case 1:
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
  

  const hapticsVibrate = async () => {
    await Haptics.vibrate();
  };

  
  

  const leer = async (texto:string) => {
    
    await ScreenReader.speak({ value: texto });
    
      
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
    setTipo

  };
}


