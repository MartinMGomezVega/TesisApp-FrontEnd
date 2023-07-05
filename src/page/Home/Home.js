import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import ListPublications from '../../components/ListPublications/ListPublications';
import { getPublicationsFollowersAPI } from '../../API/publication';

import './Home.scss';

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [publications, setPublications] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    loadPublications();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadPublications = () => {
    setLoadingPosts(true);

    getPublicationsFollowersAPI(page)
      .then(response => {
        if (response && response.length > 0) {
          const formattedPublications = formatModel(response);

          setPublications(prevPublications => {
            if (prevPublications) {
              return [...prevPublications, ...formattedPublications];
            } else {
              return formattedPublications;
            }
          });

          setLoadingPosts(false);
        } else {
          setLoadingPosts(false);
        }
      })
      .catch(error => {
        console.error(error);
        setLoadingPosts(false);
      });
  };

  const formatModel = publications => {
    return publications.map(publication => ({
      _id: publication._id,
      userId: publication.userId,
      message: publication.message,
      date: publication.date
    }));
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>

      {publications && <ListPublications publications={publications} />}

      <Button onClick={handleLoadMore} className="load-more">
        {!loadingPosts ? (
          loadingPosts !== 0 ? (
            'Obtener más publicaciones'
          ) : (
            'No hay más publicaciones'
          )
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout>
  );
}
