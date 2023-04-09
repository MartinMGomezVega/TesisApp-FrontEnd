import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import LeftMenu from '../../components/LeftMenu';

import "./BasicLayout.scss";

// Se repite en todas las paginas que lo contengan
export default function BasicLayout(props) {
    // className: para diferencias paginas
    const { className, setRefreshCheckLogin, children } = props;
    
    return (
        <Container className={`basic-layout ${className}`}>
            <Row>
                <Col xs={3} className='basic-layout__menu'>
                    <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin} nameClass={className}/>
                </Col>
                <Col xs={9} className="basic-layout__content">
                    {children}
                </Col>
            </Row>
        </Container>
    );
}