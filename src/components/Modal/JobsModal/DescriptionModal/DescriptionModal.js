import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Close } from "../../../../utils/Icons";

import './DescriptionModal.scss'

function DescriptionModal(props) {
    const { show, description, setShow } = props;
    const [formData, setFormData] = useState(initialFormValue());

    console.log(props);

    const handleClose = () => {
        // Restablecer los valores del formulario al cerrar el modal
        setFormData(initialFormValue());
        setShow(false); // Para cerrar el modal
    }

    return (
        <Modal className='description-job' show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={handleClose} />
                </Modal.Title>
            </Modal.Header>

            <h2>Descripción del empleo</h2>

            <Modal.Body>
                {description}
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
}

// initialFormValue: Inicializar los campos del formulario de publicación del puesto laboral
function initialFormValue() {
    return {
        description:""
    };
}

export default DescriptionModal;
