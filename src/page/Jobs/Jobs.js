import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import BasicLayout from '../../layout/BasicLayout';
import JobsModal from '../../components/Modal/JobsModal/JobsModal';
import ListJobs from '../../components/ListJobs/ListJobs';
import { getJobsAPI } from '../../API/job';
import queryString from 'query-string';


import "./Jobs.scss";

function Jobs(props) {
    const { setRefreshCheckLogin, location, history } = props; // history para actualizar la url
    const [jobs, setJobs] = useState(null);
    const [showModalJobs, setShowModalJobs] = useState(false);
    const params = useJobsQuery(location);

    // Boton de buscar mas empleos
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        getJobsAPI(queryString.stringify(params))
        .then(response => {
            // eslint-disable-next-line eqeqeq
            if(params.page == 1){
                if(isEmpty(response)){
                    setJobs([]); // Vacia los usuarios
                } else {
                    setJobs(response);
                }
            } else {
                // Recargar los usuarios sin eliminar los que ya aparecen.
                if(!response){
                    // Es nulo o no tiene contenido
                    setBtnLoading(0);
                } else {
                    // Si tiene valor el response, que muestre los usuarios que ya se ven mas los usuarios nuevos de la siguiente pagina
                    setJobs([...jobs, ...response]);
                    setBtnLoading(false);
                    const formattedJobs = formatModel(response);
                    setJobs(prevJobs => {
                        if (prevJobs) {
                            return [...prevJobs, ...formattedJobs];
                        } else {
                            return formattedJobs;
                        }
                    });
                }
            }
        })
        .catch(() => {
            setJobs([]);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

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

    const moreData = (type) => {
        setBtnLoading(true);
        const newPage = parseInt(params.page) + 1;

        // Cambiar de pagina en la URL
        history.push({
            search: queryString.stringify({...params, page: newPage})
        });
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
            <Button onClick={moreData} className="load-more">
                {
                    !btnLoading ? (
                        btnLoading !== 0 && "Cargar más empleos"    
                    ) : (
                        <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
                    )
                }
            </Button>

        </BasicLayout>
    );
}

// Obtener la url de /jobs
function useJobsQuery(location) {
    // page por default es 1, type por default es Follow y search por defualt es vacio
    const { page = 1, search } = queryString.parse(
        location.search
    );

    return { page, search };
}

export default withRouter(Jobs);