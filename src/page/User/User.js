import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Redirect, withRouter } from 'react-router-dom'; // Obtener los datos de la URL
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth'; // Obtener el usuario actual que se logeo
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from '../../components/User/BannerAvatar';
import InfoUser from '../../components/User/InfoUser/InfoUser';
import ListPublications from '../../components/ListPublications/ListPublications';
import { getUserAPI } from '../../API/user';
import { getUserPublicationsAPI } from '../../API/publication';

import "./User.scss"

function User(props) {
  const { match, setRefreshCheckLogin } = props; //setRefreshCheckLogin para volver al login al cerrar sesion
  const [user, setUser] = useState(null);
  const [publications, setPublications] = useState(null);
  const [page, setPage] = useState(1); // Empieza por la primer pagina
  const [loadingPublications, setLoadingPublications] = useState(false);
  const { params } = match; // obtener los datos del user
  const loggedUser = useAuth();

  const [shouldRedirect, setShouldRedirect] = useState(false);

  // console.log(publications);

  // Obtener el usuario con el ID
  useEffect(() => {
    getUserAPI(params.id)
      .then((response) => {
        // console.log("Response test: "+response);
        if (!response) toast.error("El usuario que has visitado no existe");
        setUser(response);
        if(response == null){
          setShouldRedirect(true);
        }
      })
      .catch(() => {
        toast.error("Error, el usuario que has visitado no existe");
      });
  }, [params]); // Se actualiza siempre que se cambie de usuario

  // Obtener todas las publicaciones
  useEffect(() => {
    getUserPublicationsAPI(params.id, 1)
      .then((response) => {
        setPublications(response);
      })
      .catch(() => {
        setPublications([]);
      });
  }, [params]);// Se actualiza siempre se que cambie de usuario

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingPublications(true);

    getUserPublicationsAPI(params.id, pageTemp).then(response => {
      if(!response) {
        setLoadingPublications(0);
      } else {
        setPublications([...publications, ...response]); // Traer todas las publicaciones existentes (...publications) y las nuevas (...response)
        setPage(pageTemp);
        setLoadingPublications(false);
      }
    })
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/Error" />}
      <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
        <div className='user__title'>
          <h2>
            {/* si el usuario existe, muestra el nombre */}
            {user ? `${user.name} ${user.surname}` : "Este usuario no existe"}
          </h2>
        </div>
        <BannerAvatar user={user} loggedUser={loggedUser} />
        <InfoUser user={user}/>
        {/* Listar las publicaciones */}
        <div className='user__publications'>
          <h3>Publicaciones</h3>
          {publications && <ListPublications publications={publications}/>}
          <Button onClick={moreData}>
            {!loadingPublications ? (
              loadingPublications !== 0 && 'Obtener más publicaciones'
            ): (
              <Spinner as="span" animation="grow" size="sm" role="status" arian-hidden="true" />
            )}
          </Button>
        </div>
      </BasicLayout>
    </>
  );
}

// Se exporta la informacion del usuario
export default withRouter(User);