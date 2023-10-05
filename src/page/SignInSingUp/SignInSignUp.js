import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUsers, faComment, faBrain} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modal/BasicModal/BasicModal";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignInForm from "../../components/SignInForm";
import LogoValkIALow from "../../assets/png/Valkia-lowV2.png"; // Valki acostada
import LogoValkIA from "../../assets/png/ROBOT-APP-imagen.png";
import LogoHead from "../../assets/png/logo-head.png";

import "./SignInSignUp.scss"

export default function SignInSingUp(props){
    const { setRefreshCheckLogin } = props;
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);

    // Abrir y añadir el contenido al contentModal
    const openModal = content => {
      setShowModal(true);
      setContentModal(content);
    }

    // Mostrar en la pagina SignInSingUp
    return(
      <>
        <Container className="signin-signup" fluid>
            <Row>
                <LeftComponent />
                <RightComponent openModal={openModal} setShowModal={setShowModal} setRefreshCheckLogin={setRefreshCheckLogin}/>
            </Row>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal}>
          {contentModal}
        </BasicModal>
      </>
    )
}

// LeftComponent: Lado izquierdo de la pagina de SignInSingUp
function LeftComponent() {
    return (
      <Col className="signin-signup__left" xs={6}>
        <img src={LogoValkIA} alt="App" />
        <div>
          {
            /* <h2>
            <FontAwesomeIcon icon={faSearch} />
            Sigue lo que te interesa.
          </h2>
          <h2>
            <FontAwesomeIcon icon={faUsers} />
            Entérate de qué está hablando la gente.
          </h2>
          <h2>
            <FontAwesomeIcon icon={faComment} />
            Únete a la conversación.
          </h2>
          <h2>
            <FontAwesomeIcon icon={faBrain} />
            Descubre el poder de las IA del momento.
          </h2> 
          */}
        </div>
      </Col>
    );
  }

// RightComponent: Lado derecho de la pagina de SignInSingUp
function RightComponent(props) {
  const { openModal, setShowModal, setRefreshCheckLogin } = props;
  return (
      <Col className="signin-signup__right" xs= {6}>
          <div>
              {/* <img src={LogoHead} alt="App"/> */}
              {/* Efecto en el titulo de la app:  */}
              <svg>
                <defs>
                  <filter id="filter">
                    <feFlood floodColor="#191b22" result="#191b22" />
                    <feFlood floodColor="#e7ecef" result="flood1" />
                    <feFlood floodColor="#fae588" result="flood2" /> {/* // efecto corto por la derecha */}
                    <feOffset in="SourceGraphic" dx="3" dy="0" result="off1a"/>
                    <feOffset in="SourceGraphic" dx="2" dy="0" result="off1b"/>
                    <feOffset in="SourceGraphic" dx="-3" dy="0" result="off2a"/>
                    <feOffset in="SourceGraphic" dx="-2" dy="0" result="off2b"/>
                    <feComposite in="flood1" in2="off1a" operator="in"  result="comp1" />
                    <feComposite in="flood2" in2="off2a" operator="in" result="comp2" />
                    <feMerge x="0" width="100%" result="merge1">
                      <feMergeNode in = "#191b22" />
                      <feMergeNode in = "comp1" />
                      <feMergeNode in = "off1b" />
                      <animate attributeName="y" id = "y" dur ="4s"
                        values = '104px; 104px; 30px; 105px; 30px; 2px; 2px; 50px; 40px; 105px; 105px; 20px; 6ßpx; 40px; 104px; 40px; 70px; 10px; 30px; 104px; 102px'
                        keyTimes = '0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1'
                        repeatCount = "indefinite" />

                      <animate attributeName="height" id = "h" dur ="8s"                          
                        values = '10px; 0px; 10px; 30px; 50px; 0px; 10px; 0px; 0px; 0px; 10px; 50px; 40px; 0px; 0px; 0px; 40px; 30px; 10px; 0px; 50px'
                        keyTimes = '0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1'
                        repeatCount = "indefinite" />
                    </feMerge>
                    <feMerge x="0" width="100%" y="60px" height="65px" result="merge2">
                      <feMergeNode in = "#191b22" />
                      <feMergeNode in = "comp2" />
                      <feMergeNode in = "off2b" />
                      <animate attributeName="y" id = "y" dur ="8s"
                        values = '103px; 104px; 69px; 53px; 42px; 104px; 78px; 89px; 96px; 100px; 67px; 50px; 96px; 66px; 88px; 42px; 13px; 100px; 100px; 104px;' 
                        keyTimes = '0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513; 0.548; 0.577; 0.613; 1'
                        repeatCount = "indefinite" />
                      <animate attributeName="height" id = "h" dur = "8s"
                        values = '0px; 0px; 0px; 16px; 16px; 12px; 12px; 0px; 0px; 5px; 10px; 22px; 33px; 11px; 0px; 0px; 10px'
                        keyTimes = '0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513;  1' 
                        repeatCount = "indefinite" />
                    </feMerge>
                    <feMerge>
                      <feMergeNode in="SourceGraphic" />	
                      <feMergeNode in="merge1" /> 
                      <feMergeNode in="merge2" />
                    </feMerge>
                </filter>
              </defs>
              <text x="0" y="100">ValkirIA</text>
              </svg>

              <h2>Sé parte de una comunidad en línea inteligente y relevante.</h2>
              {/* <h3>Únete a ValkIA</h3> */}
              <Button variant="primary" onClick={() => openModal(<SignUpForm setShowModal={setShowModal}/>)}> Registrese</Button>
              <Button variant="outline-primary" onClick={() => openModal(<SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />)}>Iniciar sesión</Button>
          </div>
      </Col>
  )
}