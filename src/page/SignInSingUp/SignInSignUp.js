import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUsers, faComment} from "@fortawesome/free-solid-svg-icons"
import BasicModal from "../../components/Modal/BasicModal/BasicModal";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignInForm from "../../components/SignInForm";
import LogoApp from "../../assets/png/logo.png";
import LogoWhiteApp from "../../assets/png/logo-white.png";

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
        <img src={LogoApp} alt="App" />
        <div>
          <h2>
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
              <img src={LogoWhiteApp} alt="App"/>
              <h2>Mira lo que esta pasando en el mundo en este momento</h2>
              <h3>Únete a App en este momento.</h3>
              <Button variant="primary" onClick={() => openModal(<SignUpForm setShowModal={setShowModal}/>)}> Registrese</Button>
              <Button variant="outline-primary" onClick={() => openModal(<SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />)}>Iniciar sesión</Button>
          </div>
      </Col>
  )
}