import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import EditUserForm from '../EditUserForm';
import AvatarNotFound from "../../../assets/png/avatar-no-found.png";
import { API_HOST } from '../../../utils/constant';
import ConfigModal from '../../Modal/ConfigModal/ConfigModal';
import { checkFollowAPI } from '../../../API/follow';
import { followUserAPI, unfollowUserAPI } from '../../../API/follow';

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
    const { user, loggedUser } = props;
    const [showModal, setShowModal] = useState(false);
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);

    // Si banner tiene contenido, los guardo en la variable bannerUrl
    const bannerUrl = user?.banner ? `${API_HOST}/getBanner?id=${user.id}` : null;
    // Si el avatar tiene contenido, lo guardo en la variable avatarUrl
    const avatarUrl = user?.banner ? `${API_HOST}/getAvatar?id=${user.id}` : AvatarNotFound;

    // Comprobar si sigo al usuario, loggedUser es el usuario logeado y user es el usuario a investigar si lo sigo o no
    useEffect(() => {
        if(user){
            checkFollowAPI(user?.id).then(response => {
            // console.log(response); // Ver cual es su status de relacion, si se siguen o no
            if (response?.status) {
                setFollowing(true);
            } else {
                setFollowing(false);
            }
            });
        }
        setReloadFollow(false); // Vuelve a su estado inicial
    }, [user, reloadFollow]);// Cuando la pagina cambie de usuario, que cambie de user

    // Seguir al usuario
    const onFollow = () => {
        followUserAPI(user.id).then(() => {
            setReloadFollow(true); // Comprueba si sigue al usuario
        });
    };

    // Dejar de seguir al usuario
    const onUnfollow = () => {
        unfollowUserAPI(user.id).then(() => {
            setReloadFollow(true); // Comprueba si sigue al usuario
        });
    };

    return (
        <div className='banner-avatar' style={{backgroundImage:`url('${bannerUrl}')`}}>
            <div className='avatar' style={{backgroundImage:`url('${avatarUrl}')`}} />
            {/* Si el usuario existe, mostrar el boton de editar perfil */}
            {user && (
                <div className='options'>
                    {/* Si me encuentro en mi perfil, puedeo editarlo */}
                    {loggedUser._id === user.id && <Button onClick={() => setShowModal(true)}>Editar perfil</Button>}
                    
                    {/* si veo a otro usuario, muestro el boton de seguir (si lo sigo, si no lo sigo le muestro el boton de seguir)*/}
                    {loggedUser._id !== user.id &&
                        following !== null &&
                        (following ? (
                                <Button onClick={onUnfollow} className="unfollow">
                                    <span>Siguiendo</span>
                                </Button>
                            ) : (
                                <Button onClick={onFollow}>Seguir</Button>
                            )
                        )
                    }
                </div>
            )}
            <ConfigModal show={showModal} setShow={setShowModal} title="Editar perfil">
                <EditUserForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    );
}
