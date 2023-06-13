import { API_HOST } from "../utils/constant";
import { getTokenAPI } from "./auth";

// Recibe el mensaje de la publicacion para enviar a la bd
export function addPublicationAPI(message) {
    const url = `${API_HOST}/savePublication`;
    const data = {
        message
    }

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: JSON.stringify(data),
    };

    return fetch(url, params)
        .then(response => {
            if(response.status >= 200 && response.status < 300 ){
                return { code: response.status, message: "Publicación enviada."};
            }
            return { code: 500, message: "Error del servidor."};
        })
        .catch(err => {
            return err;
        })
}

// Obtener las publicaciones del usuario paginado
export function getUserPublicationsAPI(idUser, page) {
    const url = `${API_HOST}/readPosts?id=${idUser}&page=${page}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        }) 
        .catch(err => {
            return err;
        });
}

// Obtener las publicaciones de mis seguidores
// Como inicio o default es la pagina 1
export function getPublicationsFollowersAPI(page = 1){
    const url = `${API_HOST}/readPostsFollowers?page=${page}`;

    const params = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenAPI()}`,
        },
      };
    
      return fetch(url, params)
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          return err;
        });
}