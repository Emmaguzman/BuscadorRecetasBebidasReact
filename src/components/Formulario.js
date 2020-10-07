import React, { useContext, useState } from 'react';

import { CategoriasContext } from '../context/CategoriaContext'
import { RecetasContext } from '../context/RecetasContext';



const Formulario = () => {
    const { categorias } = useContext(CategoriasContext);
    const { setBRecetas,setConsultar } = useContext(RecetasContext);

    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    });

    //obtener los contenidos

    const _obtenerDatosReceta = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }
    return (
        <form
            className="col-12"
            onSubmit={e => {
                e.preventDefault();
                setBRecetas(busqueda);
                setConsultar(true);
                ;
            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por categoria o ingrediente</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="buscar por ingrediente"
                        onChange={_obtenerDatosReceta}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={_obtenerDatosReceta}
                    >
                        <option value="">--Selecciona categoria--</option>
                        {categorias.map(categoria => (
                            <option
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar bebidas"
                    />

                </div>
            </div>
        </form>
    );
}

export default Formulario;