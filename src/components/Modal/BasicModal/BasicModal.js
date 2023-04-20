import React from "react";
import { Modal } from "react-bootstrap";
import LogoHead from "../../../assets/png/logo-head.png";
import LogoValkIALow from "../../../assets/png/Valkia-lowV2.png"; // Valki acostada

import "./BasicModal.scss";

export default function BasicModal(props) {
  const { show, setShow, children } = props;

  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          {/* <img src={LogoValkIALow} alt="App" /> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}