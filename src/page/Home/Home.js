import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import ListPublications from '../../components/ListPublications/ListPublications';
import { getPublicationsFollowersAPI } from '../../API/publication'; // Se hace dentro de un UseEffect

import "./Home.scss";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [publications, setPublications] = useState(null); // Obtener las publicaciones
  const [page, setPage] = useState(1); // Por default es la pagina 1
  const [loadingPosts, setLoadingPosts] = useState(false); // Cargar mas publicaciones

  useEffect(() => {
    getPublicationsFollowersAPI(page).then(response => {
      if(!publications && response){
        setPublications(formatModel(response));
      } else {
        if(!response) {
          setLoadingPosts(0);
        } else {
          const data = formatModel(response);
          setPublications([...publications, ...data]); // Al tocar el boton de obtener mas publicaciones, mostrar las nuevas con las ya mostradas
          setLoadingPosts(false);
        }
      }
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Se ejecuta cada vez que se cambie la pagina
  
  // Buscar y cargar mas publicaciones
  const moreData = () => {
      setLoadingPosts(true);
      setPage(page + 1); // Iterar la pagina cuando se aprete el boton de Obtener mas publicaciones
  };

  return (
    <BasicLayout className='home' setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className='home__title'>
        <h2>Inicio<small> Publicaciones de mis seguidores</small></h2>
      </div>
      {/* Si publications tiene contenido, mostrar la lista de publicaciones */}
      {publications && <ListPublications publications={publications} />}
      <Button onClick={moreData} className='load-more'>
        {
          !loadingPosts ? (
            loadingPosts !== 0 ? "Obtener más publicaciones" : "No hay más publicaciones"
          ) : (
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
          )
        }
      </Button>
    </BasicLayout>
  )
}

// Formatear el modelo del listado de publicaciones para mostrar las publicaciones de mis seguidores
function formatModel(publications) {
  const publicationsTemp = [];
  publications.forEach((post) => {
    publicationsTemp.push({
      _id: post._id,
      userId: post.userRelationId,
      message: post.Publication.message,
      date: post.Publication.date,
    });
  });

  return publicationsTemp;
}