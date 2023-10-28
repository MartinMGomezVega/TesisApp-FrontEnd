import React, { useState } from 'react';
import { Modal, Form, Button, Dropdown, Spinner, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Close } from "../../../../utils/Icons";
import { applyToJob } from '../../../../API/job';
import { values, size } from "lodash";

import "./Postulation.scss";

export default function Postulation(props) {
    const { show, setShow } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [jobPostulationFormLoading, setJobPostulationFormLoading] = useState(false);

    console.log(props)

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
            toast.warning("Completa todos los campos para postularte al empleo.");
        } else {
            setJobPostulationFormLoading(true);
            applyToJob(formData).then(response => {
                console.log(response.message);
                if(response.message){
                    toast.warning(response.message); // Si hay errores al postularse
                } else {
                    toast.success("¡Postulación enviada!");
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
                setJobPostulationFormLoading(false); // Vuelve a su estado original el signo de cargando
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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, cv: file });
    };

    // Actualizar los datos mediante el formulario
    // Solo para formularios con todos los campos con input
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    return (
        <Modal className='postulation-job' show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={handleClose} />
                </Modal.Title>
            </Modal.Header>

            <h2>Solicitar empleo</h2>
            
            <Modal.Body>
                <Form onSubmit={onSubmit} onChange={onChange}>
                    <Form.Group>
                        <Row>
                            {/* Name */}
                            <Col>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="" name="name" defaultValue={formData.name} />
                            </Col>
                            {/* Surname */}
                            <Col>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" placeholder="" name="surname" defaultValue={formData.surname} />
                            </Col>
                        </Row>
                    </Form.Group>

                    {/* Country code */}
                    <Form.Group>
                        <Form.Label>Código del país</Form.Label>
                        <Dropdown onSelect={(selectedKey) => handleDropdownSelect("countryCode", selectedKey)}>
                            <Dropdown.Toggle variant="light" id="workplace-dropdown">
                                {formData.countryCode || "Seleccionar..."}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Albania (+355)">Albania (+355)</Dropdown.Item>
                                <Dropdown.Item eventKey="Alemania (+49)">Alemania (+49)</Dropdown.Item>
                                <Dropdown.Item eventKey="Andorra (+376)">Andorra (+376)</Dropdown.Item>
                                <Dropdown.Item eventKey="Argentina (+54)">Argentina (+54)</Dropdown.Item>
                                <Dropdown.Item eventKey="Australia (+61)">Australia (+61)</Dropdown.Item>
                                <Dropdown.Item eventKey="Austria (+43)">Austria (+43)</Dropdown.Item>
                                <Dropdown.Item eventKey="Bélgica (+32)">Bélgica (+32)</Dropdown.Item>
                                <Dropdown.Item eventKey="Bielorrusia (+375)">Bielorrusia (+375)</Dropdown.Item>
                                <Dropdown.Item eventKey="Bolivia (+591)">Bolivia (+591)</Dropdown.Item>
                                <Dropdown.Item eventKey="Bosnia y Herzegovina (+387)">Bosnia y Herzegovina (+387)</Dropdown.Item>
                                <Dropdown.Item eventKey="Brasil (+55)">Brasil (+55)</Dropdown.Item>
                                <Dropdown.Item eventKey="Bulgaria (+359)">Bulgaria (+359)</Dropdown.Item>
                                <Dropdown.Item eventKey="Canadá (+1)">Canadá (+1)</Dropdown.Item>
                                <Dropdown.Item eventKey="Chipre (+357)">Chipre (+357)</Dropdown.Item>
                                <Dropdown.Item eventKey="Chile (+56)">Chile (+56)</Dropdown.Item>
                                <Dropdown.Item eventKey="China (+86)">China (+86)</Dropdown.Item>
                                <Dropdown.Item eventKey="Colombia (+57)">Colombia (+57)</Dropdown.Item>
                                <Dropdown.Item eventKey="Costa de Marfil (+225)">Costa de Marfil (+225)</Dropdown.Item>
                                <Dropdown.Item eventKey="Costa Rica (+506)">Costa Rica (+506)</Dropdown.Item>
                                <Dropdown.Item eventKey="Croacia (+385)">Croacia (+385)</Dropdown.Item>
                                <Dropdown.Item eventKey="Dinamarca (+45)">Dinamarca (+45)</Dropdown.Item>
                                <Dropdown.Item eventKey="Ecuador (+593)">Ecuador (+593)</Dropdown.Item>
                                <Dropdown.Item eventKey="Egipto (+20)">Egipto (+20)</Dropdown.Item>
                                <Dropdown.Item eventKey="Emiratos Árabes Unidos (+971)">Emiratos Árabes Unidos (+971)</Dropdown.Item>
                                <Dropdown.Item eventKey="Eslovaquia (+421)">Eslovaquia (+421)</Dropdown.Item>
                                <Dropdown.Item eventKey="Eslovenia (+386)">Eslovenia (+386)</Dropdown.Item>
                                <Dropdown.Item eventKey="España (+34)">España (+34)</Dropdown.Item>
                                <Dropdown.Item eventKey="Estados Unidos (+1)">Estados Unidos (+1)</Dropdown.Item>
                                <Dropdown.Item eventKey="Estonia (+372)">Estonia (+372)</Dropdown.Item>
                                <Dropdown.Item eventKey="Finlandia (+358)">Finlandia (+358)</Dropdown.Item>
                                <Dropdown.Item eventKey="Francia (+33)">Francia (+33)</Dropdown.Item>
                                <Dropdown.Item eventKey="Grecia (+30)">Grecia (+30)</Dropdown.Item>
                                <Dropdown.Item eventKey="Guatemala (+502)">Guatemala (+502)</Dropdown.Item>
                                <Dropdown.Item eventKey="Honduras (+504)">Honduras (+504)</Dropdown.Item>
                                <Dropdown.Item eventKey="Hungría (+36)">Hungría (+36)</Dropdown.Item>
                                <Dropdown.Item eventKey="India (+91)">India (+91)</Dropdown.Item>
                                <Dropdown.Item eventKey="Indonesia (+62)">Indonesia (+62)</Dropdown.Item>
                                <Dropdown.Item eventKey="Irlanda (+353)">Irlanda (+353)</Dropdown.Item>
                                <Dropdown.Item eventKey="Islandia (+354)">Islandia (+354)</Dropdown.Item>
                                <Dropdown.Item eventKey="Israel (+972)">Israel (+972)</Dropdown.Item>
                                <Dropdown.Item eventKey="Italia (+39)">Italia (+39)</Dropdown.Item>
                                <Dropdown.Item eventKey="Japón (+81)">Japón (+81)</Dropdown.Item>
                                <Dropdown.Item eventKey="Kenia (+254)">Kenia (+254)</Dropdown.Item>
                                <Dropdown.Item eventKey="Marruecos (+212)">Marruecos (+212)</Dropdown.Item>
                                <Dropdown.Item eventKey="México (+52)">México (+52)</Dropdown.Item>
                                <Dropdown.Item eventKey="Moldavia (+373)">Moldavia (+373)</Dropdown.Item>
                                <Dropdown.Item eventKey="Montenegro (+382)">Montenegro (+382)</Dropdown.Item>
                                <Dropdown.Item eventKey="Nicaragua (+505)">Nicaragua (+505)</Dropdown.Item>
                                <Dropdown.Item eventKey="Nigeria (+234)">Nigeria (+234)</Dropdown.Item>
                                <Dropdown.Item eventKey="Noruega (+47)">Noruega (+47)</Dropdown.Item>
                                <Dropdown.Item eventKey="Nueva Zelanda (+64)">Nueva Zelanda (+64)</Dropdown.Item>
                                <Dropdown.Item eventKey="Países Bajos (+31)">Países Bajos (+31)</Dropdown.Item>
                                <Dropdown.Item eventKey="Panamá (+507)">Panamá (+507)</Dropdown.Item>
                                <Dropdown.Item eventKey="Paraguay (+595)">Paraguay (+595)</Dropdown.Item>
                                <Dropdown.Item eventKey="Perú (+51)">Perú (+51)</Dropdown.Item>
                                <Dropdown.Item eventKey="Polonia (+48)">Polonia (+48)</Dropdown.Item>
                                <Dropdown.Item eventKey="Portugal (+351)">Portugal (+351)</Dropdown.Item>
                                <Dropdown.Item eventKey="Reino Unido (+44)">Reino Unido (+44)</Dropdown.Item>
                                <Dropdown.Item eventKey="República Checa (+420)">República Checa (+420)</Dropdown.Item>
                                <Dropdown.Item eventKey="Rumania (+40)">Rumania (+40)</Dropdown.Item>
                                <Dropdown.Item eventKey="Rusia (+7)">Rusia (+7)</Dropdown.Item>
                                <Dropdown.Item eventKey="San Marino (+378)">San Marino (+378)</Dropdown.Item>
                                <Dropdown.Item eventKey="Serbia (+381)">Serbia (+381)</Dropdown.Item>
                                <Dropdown.Item eventKey="Sudáfrica (+27)">Sudáfrica (+27)</Dropdown.Item>
                                <Dropdown.Item eventKey="Suecia (+46)">Suecia (+46)</Dropdown.Item>
                                <Dropdown.Item eventKey="Suiza (+41)">Suiza (+41)</Dropdown.Item>
                                <Dropdown.Item eventKey="Ucrania (+380)">Ucrania (+380)</Dropdown.Item>
                                <Dropdown.Item eventKey="Uruguay (+598">Uruguay (+598)</Dropdown.Item>
                                <Dropdown.Item eventKey="Vaticanoo (+39">Vaticano (+39)</Dropdown.Item>
                                <Dropdown.Item eventKey="Venezuela (+58)">Venezuela (+58)</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    {/* mobile phone */}
                    <Form.Group>
                        <Form.Label>Teléfono móvil</Form.Label>
                        <Form.Control type="text" placeholder="" name="mobilePhone" defaultValue={formData.mobilePhone} />
                    </Form.Group>

                    {/* email */}
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="" defaultValue={formData.email} />
                    </Form.Group>

                    {/* cv */}
                    <Form.Group>
                        <Form.Label>Curriculum Vitae (.pdf)</Form.Label>
                        <input
                            type="file"
                            name="cv"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            className="cv-upload-input"
                        />
                    </Form.Group>

                    {/* describe */}
                    <Form.Group>
                        <Form.Label>Describete</Form.Label>
                        <Form.Control as="textarea" row="4"  placeholder="Añade tu descripción" type='text' name="describe" defaultValue={formData.describe} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {!jobPostulationFormLoading ? "Enviar" : <Spinner animation="border" />}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

// initialFormValue: Inicializar los campos del formulario de solicitud del empleo
function initialFormValue() {
    return {
        name: "",
        surname: "",
        countryCode: "",
        mobilePhone: "",
        email: "",
        describe:"",
        cv: null
    };
}
