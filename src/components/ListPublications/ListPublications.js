import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { map } from 'lodash';
import moment from 'moment';
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { getUserAPI } from '../../API/user';
import { API_HOST } from '../../utils/constant';
import { replaceURLWithHTMLLinks } from '../../utils/functions';

import "./ListPublications.scss";

export default function ListPublications(props) {
    const { publications } = props;

    return (
        <div className='list-publications'>
            {map(publications, (post, index) => (
                <Publication key={index} publication={post} />
            ))}
        </div>
    );
}

// Renderiza la publicacion
function Publication(props){
    const { publication } = props;
    const [userInfo, setUserInfo] = useState(null); // Guardar la informacion del usuario
    const [avatarURL, setAvatarURL] = useState(null); //Guardar la url de la imagen
    const history = useHistory();

    // Obtener el avatar para mostrar en la publicacion
    useEffect(() => {
        getUserAPI(publication.userId).then((response) => {
          setUserInfo(response);
          setAvatarURL(
            response?.avatar
              ? `${API_HOST}/getAvatar?id=${response.id}`
              : AvatarNotFound
          );
        });
    }, [publication]);
    
    // Redireccionarme al perfil del usuario al clickear en el avatar de la publicacion
    const handleClick = (id) => {
        // console.log("El id es: "+id);
        history.push('/'+id);
    };

    return (
        <div className='publication'>
            <Image className='avatar' src={avatarURL} roundedCircle onClick={() => handleClick(userInfo.id)}/>
            <div>
                {/* Nombre, apellido y fecha de publicacion */}
                <div className='name'>
                    {userInfo?.name} {userInfo?.surname}
                    <span>{moment(publication.date).calendar()}</span>
                </div>
                <div>
                    {/* Mostrar publicaciones renderizadas si hay links */}
                    <div dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(publication.message)}} />
                </div>
            </div>
        </div>
    );
 
}