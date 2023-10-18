import React, { useState, useEffect} from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { map } from 'lodash';
import moment from 'moment';
import { getUserAPI } from '../../API/user';
import { API_HOST } from '../../utils/constant';
import { replaceURLWithHTMLLinks } from '../../utils/functions';
import DescriptionModal from '../../components/Modal/JobsModal/DescriptionModal'
import Postulation from '../../components/Modal/JobsModal/Postulation';

import "./ListJobs.scss";

export default function ListJobs(props) {
    const { jobs } = props;

    return (
        <div className='list-jobs'>
            {map(jobs, (post, index) => (
                <Job key={index} job={post} />
            ))}
        </div>
    );
}

// Renderiza el posteo del empleo
function Job(props){
    const { job } = props;
    const [userInfo, setUserInfo] = useState(null); // Guardar la informacion del usuario
    const [jobFormLoading, setJobFormLoading] = useState(false);
    const [descriptionModal, setDescriptionModal] = useState('');
    const [showDescription, setShowDescriptionJobs] = useState(false); // Modal para la descripción del empleo
    const [showPostulationJobs, setShowPostulationJobs] = useState(false);

    // Obtener el avatar para mostrar en la publicacion
    useEffect(() => {
        getUserAPI(job.userId).then((response) => {
          setUserInfo(response);
        });
    }, [job]);

    const showDescripcion = (descripcion) => {
        setDescriptionModal(descripcion);
        setShowDescriptionJobs(true);
    };

    return (
        <div className='job'>
            <div>
                <div className='position'>
                    {job?.position}
                    <span>{moment(job.datePublication).calendar()}</span>
                </div>
                <div className='company'>
                    {job?.company}
                    <Button variant="primary" type="submit" className='job_button' onClick={() => setShowPostulationJobs(true)}>Postularme</Button>
                    <Postulation show={showPostulationJobs} setShow={setShowPostulationJobs} />
                </div>
                <div className='jobLocation'>
                    {job?.jobLocation} - {job?.typeOfWorkplace} - {job?.jobType}
                </div>
                <div className='description'>
                    {/* {userInfo?.description}  */}
                    <button onClick={() => showDescripcion(job?.description)}>Ver descripción</button>
                    <DescriptionModal show={showDescription} setShow={setShowDescriptionJobs} description={job?.description} />
                </div>

                <div>
                    {/* Mostrar publicaciones renderizadas si hay links */}
                    <div dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(job.message)}} />
                </div>
            </div>
        </div>
    );
}