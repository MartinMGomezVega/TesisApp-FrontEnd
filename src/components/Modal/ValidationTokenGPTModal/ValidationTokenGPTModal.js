import React, { useState } from 'react';
import { Modal, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Close } from "../../../utils/Icons";
import { validateTokenGPT } from '../../../API/apiOpenAI';
import { toast } from 'react-toastify';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./ValidationTokenGPTModal.scss";

export default function ValidationTokenGPTModal(props) {
    const { show, setShow } = props;
    const [key, setKey] = useState("");
    const [validationResponse, setValidationResponse] = useState(false);
    const maxLength = 100; // Tope de caracteres

    const handleClose = () => {
        setShow(false);
    };

    const handleValidate = (e) => {
        e.preventDefault();
        // Acción a realizar al hacer clic en el botón "Validar"
        console.log('Validar API Key:', key);

         // Enviar la Key al Back
         if(key.length > 0){
            validateTokenGPT(key)
                .then(response => {
                    if(response.valid === true){
                        console.log("Clave valida");
                        toast.success("La clave es valida, ahora puede ir a TalarIA.");
                        setValidationResponse(true);
                    } else {
                        console.log(response.valid)
                        toast.warning("La clave es invalida, por favor ingrese una clave valida.");
                    }

                })
                .catch(() => {
                    toast.error("Error al enviar la key, inténtelo más tarde.");
                });
        }
    };

    const handleGo = (e) => {
        e.preventDefault();
        // Redirigir solo si la validación es exitosa
        if (validationResponse) {
            window.location.href = '/TalarIA';
        }
    };

    const infoTooltip = (
        <Tooltip id="info-tooltip">
            <ol className="step-list">
                <li>Regístrate en OpenAI</li>
                <li>Accede a la API</li>
                <li>Perfil</li>
                <li>Selecciona View API Keys</li>
                <li>Create new secret key</li>
            </ol>
        </Tooltip>
    );

    return (
        <Modal className='validateKeyGPT-modal' show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={handleClose} />
                </Modal.Title>
            </Modal.Header>
            <h2>Ingrese la clave de la API de Open AI</h2>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Escriba aquí..."  onChange={(e) => setKey(e.target.value)}/>
                    </Form.Group>
                    <div className="container">
                        <div className="button-container">
                            <Button variant="primary" type="submit" 
                            disabled={key.length > maxLength || key.length < 20} 
                            onClick={handleValidate}
                            >Validar</Button>
                            
                            <div className="button-spacing"></div>
                            
                            <Button variant="primary" type="submit" 
                            disabled={!validationResponse} 
                            onClick={handleGo}
                            >Ir</Button>
                        </div>
                    </div>
                    <div>
                        <p>¿No tienes una clave de API de OpenAI? <a href="https://openai.com/" target="_blank" rel="noopener noreferrer">Obtén una aquí</a>.
                        <OverlayTrigger placement="bottom" overlay={infoTooltip}>
                            <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                        </OverlayTrigger>
                        </p>                        
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
