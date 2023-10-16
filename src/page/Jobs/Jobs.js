import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import BasicLayout from '../../layout/BasicLayout';
import JobsModal from '../../components/Modal/JobsModal/JobsModal';
import ListJobs from '../../components/ListJobs/ListJobs';
import { getJobsAPI } from '../../API/publicationJob';

import "./Jobs.scss";

function Jobs(props) {
    const { setRefreshCheckLogin } = props; // history para actualizar la url
    const [jobs, setJobs] = useState(null);
    const [showModalJobs, setShowModalJobs] = useState(false);
    const [page, setPage] = useState(1);
    const [loadingJobs, setLoadingJobs] = useState(false);

    useEffect(() => {
        loadJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const loadJobs = () => {
        setLoadingJobs(true);

        getJobsAPI(page)
        .then(response => {
        if (response && response.length > 0) {
            const formattedJobs = formatModel(response);

            setJobs(prevJobs => {
            if (prevJobs) {
                return [...prevJobs, ...formattedJobs];
            } else {
                return formattedJobs;
            }
            });

            setLoadingJobs(false);
        } else {
            setLoadingJobs(false);
        }
        })
        .catch(error => {
        console.error(error);
        setLoadingJobs(false);
        });
    };

    const formatModel = jobs => {
        return jobs.map(job => ({
            _id: job._id,
            userId: job.userId,
            position: job.position,
            company: job.company,
            typeOfWorkplace: job.typeOfWorkplace,
            jobLocation: job.jobLocation,
            jobType: job.jobType,
            description: job.description,
            datePublication: job.datePublication,
            finished: job.finished
        }));
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
      };

    return (
        <BasicLayout className='jobs' title="Jobs" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className='jobs__title'>
                {/* Titulo de la pagina */}
                <h2>Empleos</h2>
                {/* Publicar */}
                <Button onClick={() => setShowModalJobs(true)}>Publicar empleo</Button>
                <JobsModal show={showModalJobs} setShow={setShowModalJobs} />
            </div>

            {/* Lista de los posteos de empleos */}
            {jobs && <ListJobs jobs={jobs} />}

            {/* Botón para cargar más empleos (si hay) */}
            <Button onClick={handleLoadMore} className="load-more">
                {!loadingJobs ? (
                loadingJobs !== 0 ? (
                    'Obtener más empleos'
                ) : (
                    'No hay más empleos'
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

export default withRouter(Jobs);