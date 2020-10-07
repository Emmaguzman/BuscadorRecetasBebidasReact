import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Receta = ({ receta }) => {
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const _handleOpen = () => {
        setOpen(true);
    }
    const _handleClose = () => {
        setOpen(false)
    }
    //extraer valores del context 
    const { setIdreceta, informacion, setReceta } = useContext(ModalContext);

    //muestra y formatea los ingredientes
    const _mostraringredientes=info=>{
        let ingredientes=[];
        for (let i = 1; i < 16; i++) {
            if(info[`strIngredient${i}`]){
                ingredientes.push(
                <li>{info[`strIngredient${i}`] } {info[`strMeasure${i}`] }</li>
                )
            }            
        }
        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">
                    {receta.strDrink}
                </h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de${receta.strDrink}`} />
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdreceta(receta.idDrink);
                            _handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            setIdreceta(null);
                            _handleClose();
                            setReceta({});
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{informacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {informacion.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={informacion.strDrinkThumb} />
                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {_mostraringredientes(informacion)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Receta;