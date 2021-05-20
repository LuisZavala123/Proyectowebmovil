import {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import {contacto} from '../modelo/contacto'



export function useLista(){
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);
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
            setShowToast1(true)
        } catch (error) {}
        setId('');
        setNombre('');
        setTelefono('');
        setTipo('');
        listar();  
    }


    const eliminar = async(id:string) =>{
        try {
            console.log(id)
            await firebase.firestore().collection('contacto').doc(id).delete();
            listar();
            setShowToast2(true)  
        } catch (error) {}       
    }

    const editar = (id:string,nombre:string,telefono:string,tipo:string) => {
      setId(id);
      setNombre(nombre);
      setTelefono(telefono);
      setTipo(tipo);
      setShowToast3(true)
      setBandera(false);
  } 

  return {
    listar, 
    crear,
    eliminar,
    editar,
    lista,
    telefono,
    setTelefono,
    nombre,
    setNombre,
    tipo,
    setTipo,
    showToast1,
    setShowToast1,
    showToast2,
    setShowToast2,
    showToast3,
    setShowToast3,
    bandera

  };
}


