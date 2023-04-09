import React, { useState, useEffect} from 'react';
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

    return (
        <div className='publication'>
            <Image className='avatar' src={avatarURL} roundedCircle/>
            <div>
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