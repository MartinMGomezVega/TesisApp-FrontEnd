import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHome, faUser, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import PublicationModal from '../Modal/PublicationModal/PublicationModal';
import { logoutAPI } from '../../API/auth';
import useAuth from '../../hooks/useAuth';
import LogoWhiteApp from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
    const { setRefreshCheckLogin } = props;
    const [showModal, setShowModal] = useState(false); // Mostrar el formulario de publicar
    const user = useAuth(); // Exportacion de los datos del usuario

    const logout = () => {
        logoutAPI();
        setRefreshCheckLogin(true);
    };
    
    return (
        <div className='left-menu'>
            {/* Logo de la app */}
            <img className='logo' src={LogoWhiteApp} alt ='app' />
            
            {/* Inicio */}
            <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Inicio
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

            {/* Cerrar sesion */}
            <Link to="" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión
            </Link>

            <Button onClick={() => setShowModal(true)}>Publicar</Button>
            <PublicationModal show={showModal} setShow={setShowModal} />
        </div>
    )
}
