import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'

export const ModalContext = createContext()

const ModalProvider = (props) => {
    //state del provider
    const [idreceta, setIdreceta] = useState(null);
    const [informacion, setReceta] = useState({});
    //teniendo receta llamar a la api
    useEffect(() => {
        const _obtenerReceta = async () => {
            if (!idreceta) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const res = await axios.get(url);
            setReceta(res.data.drinks[0]);
        }
        _obtenerReceta();
    }, [idreceta])

    return (
        <ModalContext.Provider
            value={{
                informacion,
                setIdreceta,
                setReceta
            }}>
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;