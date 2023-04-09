import React, { useState, useCallback } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { API_HOST } from '../../../utils/constant';
import { Camera } from '../../../utils/Icons';
import { uploadBannerAPI } from '../../../API/user';
import { uploadAvatarAPI } from '../../../API/user';
import { updateInformationUserAPI } from '../../../API/user';

import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const { user, setShowModal } = props;
    const [formData, setFormData] = useState(initialValue(user));
    const [loading, setLoading] = useState(false);

    // Obtener el banner
    const [bannerURL, setBannerURL] = useState(
        user?.banner ? `${API_HOST}/getBanner?id=${user.id}` : null
    );

    // Obtener banner al seleccionar el archivo
    const [bannerFile, setBannerFile] = useState(null);

    // Obtener el avatar
    const [avatarURL, setAvatarURL] = useState(
        user?.banner ? `${API_HOST}/getAvatar?id=${user.id}` : null
    );
    // Obtener avatar al seleccionar el archivo
    const [avatarFile, setAvatarFile] = useState(null);

    // Guardar imagen del banner
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        // console.log(URL.createObjectURL(file));
        setBannerURL(URL.createObjectURL(file));
        setBannerFile(file);
    });
    // Condiciones para aceptar la imagen
    const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner,
    });

    // Avatar
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        // console.log(URL.createObjectURL(file));
        setAvatarURL(URL.createObjectURL(file));
        setAvatarFile(file);
    });
    const { getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar,
    });

    // Obtener los valores del formulario
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // Es asincrona porque tiene que esperar a que se terminan las peticiones para recargar la pagina
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Spinner de carga activado

        // Si existe significa que el usuario subio un nuevo banner
        if (bannerFile){
            // Si da error mostrar mensaje de error con toast
            await uploadBannerAPI(bannerFile).catch(() => {
                toast.error("Error al subir el nuevo banner");
            });
        }

        // Si existe significa que el usuario subio un nuevo avatar
        if (avatarFile){
            // Si da error mostrar mensaje de error con toast
            await uploadAvatarAPI(avatarFile).catch(() => {
                toast.error("Error al subir el nuevo avatar");
            });
        }

        // Actualizar informacion del usuario
        await updateInformationUserAPI(formData).then(() => {
            setShowModal(false); // Si todo sale bien cierra el modal
        })
        .catch(() => {
            toast.error("Error al actualizar los datos");
        })
        
        // Actualizar la pagina al presionar el boton de actualizar
        setLoading(false); // Spinner de carga desactivado
        window.location.reload();
    }

  return (
    <div className='edit-user-form'>
        <div className='banner' style= {{backgroundImage: `url('${bannerURL}')`}} {...getRootBannerProps()}>
            <input {...getInputBannerProps()} />
            <Camera/>
        </div>

        <div className='avatar' style= {{backgroundImage: `url('${avatarURL}')`}} {...getRootAvatarProps()}>
            <input {...getInputAvatarProps()} />
            <Camera/>
        </div>

        <Form onSubmit={onSubmit}>
            {/* Nombre y apellido */}
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control type='text' placeholder='Nombre' name='name' defaultValue={formData.name} onChange={onChange} />
                    </Col>
                    <Col>
                        <Form.Control type='text' placeholder='Apellido' name='surname' defaultValue={formData.surname} onChange={onChange} />
                    </Col>
                </Row>
            </Form.Group>

            {/* Biografia */}
            <Form.Group>
                <Form.Control as='textarea' row="3" placeholder='Agrega tu biografia' type='text' name='biography' defaultValue={formData.biography} onChange={onChange} />
            </Form.Group>

            {/* Sitio web */}
            <Form.Group>
                <Form.Control type='text' placeholder='Sitio web' name='webSite' defaultValue={formData.webSite} onChange={onChange} />
            </Form.Group>

            {/* Fecha de nacimiento */}
            <Form.Group>
                <DatePicker placeholder="Fecha de nacimiento" locale={es} selected={new Date(formData.dateOfBirth)} 
                onChange={value => setFormData({ ...formData, dateOfBirth: value})} />
            </Form.Group>

            {/* Boton de actualizar */}
            <Button className='btn-submit' variant='primary' type="submit">
                {loading && <Spinner animation='border' size='sm' />} Actualizar
            </Button>
            
        </Form>
    </div>
  )
}

// Validar datos
function initialValue(user) {
    return {
        name: user.name ||  "",
        surname: user.surname || "",
        biography: user.biography || "",
        location: user.location || "",
        webSite: user.webSite || "",
        dateOfBirth: user.dateOfBirth || ""
    };
}
