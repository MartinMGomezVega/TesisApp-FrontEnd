import { API_HOST } from "../utils/constant";
import { getTokenAPI } from "./auth";


// Recibe el mensaje de la publicacion para enviar a la bd
export function publishJobs(publicationJob) {
    const url = `${API_HOST}/savePublicationJob`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: JSON.stringify(publicationJob), // Enviar los datos directamente
    };

    return fetch(url, params)
        .then(response => {
            if(response.status >= 200 && response.status < 300 ){
                return { code: response.status };
            }
            return { code: 500, message: "Error del servidor."};
        })
        .catch(err => {
            return err;
        })
}
