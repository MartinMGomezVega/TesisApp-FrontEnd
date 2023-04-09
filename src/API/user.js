import { API_HOST } from "../utils/constant";
import { getTokenAPI } from "./auth";

// Obtener todos los datos del usuario
export function getUserAPI(id) {
    const url = `${API_HOST}/viewProfile?id=${id}`;

    // Parametros de la peticion
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        // eslint-disable-next-line no-throw-literal
        if(response.status >= 400) throw null // Si el usuario entra a una pagina que no existe
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    })
}

// Conectarse a la base de datos para enviar el banner
export function uploadBannerAPI(file) {
    const url = `${API_HOST}/uploadBanner`;

    // Al subir un archivo se necesita el con FormData
    const formData = new FormData();
    formData.append("banner", file);

    // Parametros de la peticion
    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: formData
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

// Conectarse a la base de datos para enviar el avatar
export function uploadAvatarAPI(file) {
    const url = `${API_HOST}/uploadAvatar`;

    // Al subir un archivo se necesita el con FormData
    const formData = new FormData();
    formData.append("avatar", file);

    // Parametros de la peticion
    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: formData
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

// Conectarse a la base de datos para actualizar la informacion del usuario
export function updateInformationUserAPI(data) {
    const url = `${API_HOST}/modifyProfile`;

    // Parametros de la peticion
    const params = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
    .then(response => {
        return response
    })
    .catch(err => {
        return err;
    })
}