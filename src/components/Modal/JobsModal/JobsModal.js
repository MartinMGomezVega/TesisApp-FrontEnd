import React, { useState } from 'react';
import { Modal, Form, Button, Dropdown, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Close } from "../../../utils/Icons";
import { publishJobs } from '../../../API/job';
import { values, size } from "lodash";

import "./JobsModal.scss";

export default function JobsModal(props) {
    const { show, setShow } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [jobFormLoading, setJobFormLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // Validacion del formulario
        // Si el validCount es menor a la cantidad de campos del formulario, no es valido
        let validCount = 0;
        // Bucle para buscar cada uno de los items (some)
        values(formData).some(value => {
            value && validCount++
            return null
        });

        if(validCount !== size(formData)) {
            // Es correcto si es igual a la cantidad de campos (size(formData))
            toast.warning("Completa todos los campos para publicar el empleo");
        } else {
            setJobFormLoading(true);
            publishJobs(formData).then(response => {
                console.log(response.message);
                if(response.message){
                    toast.warning(response.message); // Si hay errores en al publicarlo
                } else {
                    toast.success("¡Empleo publicado!");
                    setShow(false); // Para cerrar el modal
                    setFormData(initialFormValue()); // Inicializar los valores del formulario
                    setTimeout(() => {
                        window.location.href = '/jobs'; // Recargar la pagina de empleos
                    }, 3000); // Espera 3 segundos antes de recargar la página
                }
            })
            .catch(() => {
                // Error al realizar el registro
                toast.error("Error del servidor, intentelo más tarde.");
            })
            .finally(() => {
                // Se ejecuta cuando finaliza el registro
                setJobFormLoading(false); // Vuelve a su estado original el signo de cargando
            })
        }
    }

    const handleDropdownSelect = (fieldName, selectedValue) => {
        setFormData({ ...formData, [fieldName]: selectedValue });
    }

    const handleClose = () => {
        // Restablecer los valores del formulario al cerrar el modal
        setFormData(initialFormValue());
        setShow(false); // Para cerrar el modal
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
                        <Form.Control type="text" placeholder="Añade el puesto que necesitas cubrir" name="position" defaultValue={formData.position} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Empresa</Form.Label>
                        <Form.Control type="text" placeholder="Nombre de la empresa ofrecente" name="company" defaultValue={formData.company} />
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
                        <Form.Control type="text" placeholder="Ciudad, Región o País de la Empresa" name="jobLocation" defaultValue={formData.jobLocation} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de empleo</Form.Label>
                        <Dropdown onSelect={(selectedKey) => handleDropdownSelect("jobType", selectedKey)}>
                            <Dropdown.Toggle variant="light" id="employment-dropdown">
                                {formData.jobType || "Seleccionar..."}
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

                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" row="4"  placeholder="Describa el puesto laboral" type='text' name="description" defaultValue={formData.description} />
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
        position: "",
        company: "",
        typeOfWorkplace: "",
        jobLocation: "",
        jobType: "",
        description:""
    };
}
