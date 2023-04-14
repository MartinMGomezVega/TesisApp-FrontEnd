import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpAPI } from "../../API/auth";

import "./SignUpForm.scss";

export default function SignUpForm(props) {
    const { setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = e => {
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
            toast.warning("Completa todos los campos del formulario");
        } else {
            if(!isEmailValid(formData.email)) {
                toast.warning("El email ingresado es invalido.");
            } else if(formData.password !== formData.repeatPassword) {
                toast.warning("Las contraseñas no coinciden");
            } else if(size(formData.password) < 6) {
                toast.warning("La contraseña tiene que tener al menos 6 caracteres");
            } else {
                setSignUpLoading(true); // Cargando
                // toast.success("Formulario Ok.")
                signUpAPI(formData).then(response => {
                    if(response.code) {
                        toast.wagning(response.message); // Si hay errores en el registro
                    } else {
                        toast.success("El registro fue correcto");
                        setShowModal(false); // Para cerrar el modal
                        setFormData(initialFormValue()); // Inicializar los valores del formulario
                    }
                })
                .catch(() => {
                    // Error al realizar el registro
                    toast.error("Error del servidor, intentelo más tarde");
                })
                .finally(() => {
                    // Se ejecuta cuando finaliza el registro
                    setSignUpLoading(false); // Vuelve a su estado original el signo de cargando
                })
            }
        }
    };

    // Actualizar los datos mediante el formulario
    // Solo para formularios con todos los campos con input
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    return (
        <div className="sign-up-form">
            <h2>Registrate</h2>
            <h3>Es rápido y fácil.</h3>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Name" name="name" defaultValue={formData.name} />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Surname" name="surname" defaultValue={formData.surname} />
                        </Col>
                    </Row>
                </Form.Group>
                
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" name="email" defaultValue={formData.email} />
                </Form.Group>

                <Form.Group>
                <Row>
                    <Col>
                        <Form.Control type="password" placeholder="Password" name="password" defaultValue={formData.password} />
                    </Col>
                    <Col>
                        <Form.Control type="password" placeholder="Repeat password" name="repeatPassword" defaultValue={formData.repeatPassword} />
                    </Col>
                </Row>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {!signUpLoading ? "Registrate" : <Spinner animation="border" />}
                </Button>
            </Form>
        </div>
        
    )
}

// initialFormValue: Inicializar los campos del formulario de registro
function initialFormValue() {
    return{
        name: "",
        surname: "",
        email: "",
        password: "",
        repeatPassword: ""
    };
}