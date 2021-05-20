import React, {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import {equipo} from '../modelo/equipo'



export function useLista(){
    const [listaEquipo, setListaEquipo] = useState < equipo[] > ([]); 
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [titulos, setTitulos] = useState('');
    const [mensaje, setMensaje] = useState(false);
    const [bandera, setBandera] = useState(true);
    const listar = async () => {
        try {
            let lista: equipo[] = []
            const res = await firebase.firestore().collection('equipo').get();
            res.forEach((doc) => {
                let obj = {
                    id: doc.id,
                    nombre: doc.data().nombre,
                    titulos: doc.data().titulos
                };
                lista.push(obj)
    
            });
            setListaEquipo(lista)
        } catch (error) {}
    }

    const crear = async () => {
        try {
            if(bandera){
                await firebase.firestore().collection('equipo').add(
                    {nombre, titulos});
                   
            }else{
                await firebase.firestore().collection('equipo').doc(id).set(
                    {nombre, titulos});
                    setBandera(true);
            }
             
        } catch (error) {}
        setId('');
        setNombre('');
        setTitulos('');
        setMensaje(true);
        listar();  
    }


    const eliminar = async(id:string) =>{
        try {
            console.log(id)
            await firebase.firestore().collection('equipo').doc(id).delete();
            listar();  
        } catch (error) {}       
    }

    const editar = (id:string,nombre:string,titulo:string) => {
      setId(id);
      setNombre(nombre);
      setTitulos(titulo);
      setBandera(false);
  } 

  return {
    listar, 
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
     bandera

  };
}


