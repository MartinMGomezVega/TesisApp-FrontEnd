import React, { useState } from 'react';
import { Modal, Form, Button, Dropdown, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Close } from "../../../utils/Icons";
import { addPublicationAPI } from '../../../API/publication';

import "./JobsModal.scss";

export default function JobsModal(props) {
    const { show, setShow } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [jobFormLoading, setJobFormLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Lógica para enviar el formulario a tu backend (falta implementar)
    }

    const handleDropdownSelect = (fieldName, selectedValue) => {
        setFormData({ ...formData, [fieldName]: selectedValue });
    }

    const handleClose = () => {
        // Restablecer los valores del formulario al cerrar el modal
        setFormData(initialFormValue());
        setShow(false);
    }

    // Actualizar los datos mediante el formulario
    // Solo para formularios con todos los campos con input
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    return (
        <Modal className='publication-job' show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={handleClose} />
                </Modal.Title>
            </Modal.Header>

            <h2>Anuncia un empleo</h2>
            
            <Modal.Body>
                <Form onSubmit={onSubmit} onChange={onChange}>
                    <Form.Group>
                        <Form.Label>Nombre del puesto</Form.Label>
                        <Form.Control type="text" placeholder="Añade el puesto que necesitas cubrir" name="jobTittle" value={formData.jobTittle} onChange={(e) => setFormData({ ...formData, jobTittle: e.target.value })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Empresa</Form.Label>
                        <Form.Control type="text" placeholder="Nombre de la empresa ofrecente" name="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de lugar de trabajo</Form.Label>
                        <Dropdown onSelect={(selectedKey) => handleDropdownSelect("typeOfWorkplace", selectedKey)}>
                            <Dropdown.Toggle variant="light" id="workplace-dropdown">
                                {formData.typeOfWorkplace || "Seleccionar..."}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Presencial">Presencial</Dropdown.Item>
                                <Dropdown.Item eventKey="Híbrido">Híbrido</Dropdown.Item>
                                <Dropdown.Item eventKey="Remoto">Remoto</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Ubicación del empleo</Form.Label>
                        <Form.Control type="text" placeholder="Ciudad, Región o País de la Empresa" name="jobLocation" value={formData.jobLocation} onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de empleo</Form.Label>
                        <Dropdown onSelect={(selectedKey) => handleDropdownSelect("typeOfEmployment", selectedKey)}>
                            <Dropdown.Toggle variant="light" id="employment-dropdown">
                                {formData.typeOfEmployment || "Seleccionar..."}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Jornada completa">Jornada completa</Dropdown.Item>
                                <Dropdown.Item eventKey="Media jornada">Media jornada</Dropdown.Item>
                                <Dropdown.Item eventKey="Contrato por hora">Contrato por hora</Dropdown.Item>
                                <Dropdown.Item eventKey="Temporal">Temporal</Dropdown.Item>
                                <Dropdown.Item eventKey="Otro">Otro</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {!jobFormLoading ? "Publicar" : <Spinner animation="border" />}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

// initialFormValue: Inicializar los campos del formulario de publicación del puesto laboral
function initialFormValue() {
    return {
        jobTittle: "",
        company: "",
        typeOfWorkplace: "",
        jobLocation: "",
        typeOfEmployment: ""
    };
}
