import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios'

export const RecetasContext = createContext();


const RecetasProvider = (props) => {
    const [recetas, setRecetas] = useState([]);
    const [busqueda, setBRecetas] = useState({
        categoria: '',
        nombre: ''
    });
    const [consultar,setConsultar]=useState(false);

    const {nombre,categoria}=busqueda

    useEffect(()=>{
        if(consultar){
        const _obtenerRecetas=async()=>{
            const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
            const res=await axios.get(url);
            setRecetas(res.data.drinks);
        }
        _obtenerRecetas();
    }
    },[busqueda])

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                setBRecetas,
                setConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>

    );
}

export default RecetasProvider;