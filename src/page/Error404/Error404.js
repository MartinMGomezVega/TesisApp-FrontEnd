import React from "react";
import { Link } from "react-router-dom";
import Error404VALKIRIA from "../../assets/png/Error404/404.png";

import "./Error404.scss";

export default function Error404() {
  return (
    <div className="error404">
      <img src={Error404VALKIRIA} alt="Error404" />
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}