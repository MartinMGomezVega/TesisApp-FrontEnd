import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { Close } from "../../../utils/Icons";
import { addPublicationAPI } from '../../../API/publication';

import "./JobsModal.scss";

export default function JobsModal(props) {
    const { show, setShow } = props;
    const [message, setMessage] = useState("");
    const maxLength = 280; // Tope de caracteres

    const onSubmit = (e) => {
        e.preventDefault();
        
        // Enviar publicacion a la base de datos
        if(message.length > 0 && message.length <= maxLength){
            addPublicationAPI(message)
                .then(response => {
                    if(response?.code >= 200 && response?.code < 300){ // Funciona perfecto
                        toast.success(response.message);
                        setShow(false);
                        window.location.reload();
                    }
                })
                .catch(() => {
                    toast.warning("Error al enviar la publicación, inténtelo más tarde.");
                });
        }
    }

  return (
    <Modal className='publication-modal' show={show} onHide={() => setShow(false)} centered size='lg'>
        <Modal.Header>
            <Modal.Title>
                <Close onClick={() => setShow(false)} />
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Control as="textarea" rows={6} placeholder='¿Qué estás pensando?' onChange={(e) => setMessage(e.target.value)} />
                {/* el spam se ocupa de saber cuantos caracteres tiene la publicacion */}
                <span className={classNames("count", {error: message.length > maxLength})}>
                    {message.length}
                </span>
                {/* Deshabilitar el boton de publicar si no hay caracteres o supera el mazimo */}
                <Button type='submit' disabled={message.length > maxLength || message.length < 1}>Publicar</Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}
