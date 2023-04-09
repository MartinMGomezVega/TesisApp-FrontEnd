import { API_HOST } from "../utils/constant";
import { getTokenAPI } from "./auth";

// PETICIONES

// Recibe el idUser del usuario para ver si lo sigo 
export function checkFollowAPI(idUser) {
    const url = `${API_HOST}/consultationRelation?id=${idUser}`;
    
    // Parametros de la peticion
    const params = {
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}

// Funcionalidad de seguir al usuario
export function followUserAPI(idUser) {
    const url = `${API_HOST}/highRelation?id=${idUser}`;
  
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenAPI()}`,
      },
    };
  
    return fetch(url, params)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
}

// Funcionalidad de dejar de seguir al usuario
export function unfollowUserAPI(idUser) {
    const url = `${API_HOST}/lowRelation?id=${idUser}`;
  
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getTokenAPI()}`,
      },
    };
  
    return fetch(url, params)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
}

// Obtener mis seguidores
export function getFollowAPI(paramURL){
  const url = `${API_HOST}/listUsers?${paramURL}`;

  const params = {
    headers: {
      Authorization: `Bearer ${getTokenAPI()}`,
    },
  };

  return fetch(url, params)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
}