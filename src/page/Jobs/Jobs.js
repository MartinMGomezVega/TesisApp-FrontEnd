import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import BasicLayout from '../../layout/BasicLayout';
import JobsModal from '../../components/Modal/JobsModal/JobsModal';

import "./Jobs.scss";

function Jobs(props) {
    const { setRefreshCheckLogin, location, history } = props; // history para actualizar la url
    const [jobs, setJobs] = useState(null);
    const [showModalJobs, setShowModalJobs] = useState(false);

    return (
        <BasicLayout className='jobs' title="Jobs" setRefreshCheckLogin={setRefreshCheckLogin}>
            {/* Titulo de la pagina */}
            <div className='jobs__title'>
                <h2>Empleos</h2>
                {/* Publicar */}
                <Button onClick={() => setShowModalJobs(true)}>Publicar empleo</Button>
                <JobsModal show={showModalJobs} setShow={setShowModalJobs} />
            </div>

        </BasicLayout>
    );
}

export default withRouter(Jobs);
