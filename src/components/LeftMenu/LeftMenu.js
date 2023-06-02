import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHouseChimney, faUser, faUsers, faCommentAlt, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import PublicationModal from '../Modal/PublicationModal/PublicationModal';
import ValidationTokenGPTModal from '../Modal/ValidationTokenGPTModal/ValidationTokenGPTModal';
import { logoutAPI } from '../../API/auth';
import useAuth from '../../hooks/useAuth';

import LogoValkIALow from "../../assets/png/Valkia-lowV2.png"; // Valki acostada
// import LogoHead from "../../assets/png/logo-head.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
    const { setRefreshCheckLogin } = props;
    const [showModal, setShowModal] = useState(false); // Mostrar el formulario de publicar
    const [showModalKeyGPT, setShowModalKeyGPT] = useState(false); // Mostrar el formulario de Validar la Key de Open AI
    const user = useAuth(); // Exportacion de los datos del usuario

    const logout = () => {
        logoutAPI();
        setRefreshCheckLogin(true);
    };
    
    return (
        <div className='left-menu'>
            {/* Logo de la app */}
            <img className='logo' src={LogoValkIALow} alt ='app' />
            
            {/* Inicio */}
            <Link to="/">
                <FontAwesomeIcon icon={faHouseChimney} /> Inicio
            </Link>

            {/* Usuarios */}
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} /> Usuarios
            </Link>

            {/* Perfil */}
            {/* Validacion del hook user: Si el parametro ._id no existe no lo ejecuta */}
            <Link to={`/${user?._id}`}> 
                <FontAwesomeIcon icon={faUser} /> Perfil
            </Link>

            {/* Chat GPT - TalarIA */}          
            <button className='Left_TalarIA' onClick={() => setShowModalKeyGPT(true)}>
                <FontAwesomeIcon icon={faCommentAlt} /><span className="button-text-TalarIA">TalarIA</span>
            </button>
            <ValidationTokenGPTModal show={showModalKeyGPT} setShow={setShowModalKeyGPT} />

            {/* Publicar */}
            <Button onClick={() => setShowModal(true)}>Publicar</Button>
            <PublicationModal show={showModal} setShow={setShowModal} />

            {/* Cerrar sesion */}
            <Link className='logout' to="" onClick={logout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} /> Salir
            </Link>
        
        </div>
    )
}
