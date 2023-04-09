import { useContext } from "react";
import { AuthContext } from "../utils/contexts";

// Obtener la informacion del contexto a traves de una funcion anonima
// eslint-disable-next-line import/no-anonymous-default-export
export default () => useContext(AuthContext);