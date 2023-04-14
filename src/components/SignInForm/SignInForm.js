import React, { useState } from 'react';
import { Form, Button, Spinner} from "react-bootstrap";
import { values, size } from 'lodash';
import { toast } from "react-toastify";
import { isEmailValid } from '../../utils/validations';
import { signInAPI, setTokenAPI } from '../../API/auth';

import "./SignInForm.scss";

export default function SignInForm(props) {
    const { setRefreshCheckLogin } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signInLoading, setSignInLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        // Validacion del formulario
        // Si el validCount es menor a la cantidad de campos del formulario, no es valido
        let validCount = 0;
        values(formData).some(value => {
            // Bucle para buscar cada uno de los items (some)
            value && validCount++
            return null;
        });

        if(size(formData) !== validCount) {
            // Es correcto si es igual a la cantidad de campos (size(formData))
            toast.warning("Completa todos los campos del formulario");
        } else {
            if(!isEmailValid(formData.email)) {
                toast.warning("El email ingresado es invalido.");
            } else {
                setSignInLoading(true);
                signInAPI(formData)
                    .then(response => {
                        if(response.message){
                            toast.warning(response.message);
                        } else {
                            setTokenAPI(response.token);
                            setRefreshCheckLogin(true); // Cambia el estado de refreshCheckLogin
                        }
                    })
                    .catch(() => {
                        toast.error("Error del servidor, inténtelo más tarde");
                    })
                    .finally(() => {
                        // Se ejecuta cuando finaliza el registro
                        setSignInLoading(false); // Vuelve a su estado original el signo de cargando
                    })
            }
        }
    };

    // Actualizar los datos mediante el formulario
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    return (
        <div className="sign-in-form">
            <h2>Iniciar sesión</h2>
            <form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control type="email" name="email" placeholder="Correo electrónico" defaultValue={formData.email} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="password" placeholder="Contraseña" defaultValue={formData.password} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {!signInLoading ? "Iniciar sesión" : <Spinner animation="border" />}
                </Button>
            </form>
        </div>
    );
}

function initialFormValue() {
    return{
        email:"",
        password:""
    };
}
