import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { Close } from "../../../utils/Icons";

import "./ValidationTokenGPTModal.scss";

export default function ValidationTokenGPTModal(props) {
    const { show, setShow } = props;
    const [key, setKey] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        // Enviar la Key al Back
        if(key.length > 0){
            /*
            validateTokenGPT(key)
                .then(response => {
                    if(response?.code >= 200 && response?.code < 300){ // Funciona perfecto
                        toast.success(response.key);
                        setShow(false);
                        // Redireccionar a TalarIA
                            // window.location.reload();
                    }
                })
                .catch(() => {
                    toast.warning("Error al enviar la publicación, inténtelo más tarde.");
                });
                */
        }
    }

    const handleClose = () => {
        setShow(false);
      };

    return (
        <Modal className='validateKeyGPT-modal' show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={handleClose} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Control as="textarea" rows={6} placeholder='¿Qué estás pensandooo?' onChange={(e) => setKey(e.target.value)} />
                    <Button type='submit' disabled={key.length < 0 }>Enviar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
