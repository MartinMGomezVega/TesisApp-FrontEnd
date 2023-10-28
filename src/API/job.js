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

// Obtener los posteos de los empleos
// Como inicio o default es la pagina 1
export function getJobsAPI(page){
    const url = `${API_HOST}/readPostsJobs?${page}`;

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

// Publicar la postulacion al empleo
export function applyToJob(applyData, fileInput) {
    const url = `${API_HOST}/savePostulationJob`;
    const formData = new FormData();

    // Agrega los campos de formulario uno por uno
    formData.append("name", applyData.name);
    formData.append("surname", applyData.surname);
    formData.append("countryCode", applyData.countryCode);
    formData.append("mobilePhone", applyData.mobilePhone);
    formData.append("email", applyData.email);
    formData.append("describe", applyData.describe);
    formData.append("cv", fileInput.files[0]);
    formData.append("idJob", applyData.idJob);

    console.log("cv", fileInput.files[0]);


    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: formData
    };

    return fetch(url, params)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return { code: response.status };
            }
            return { code: 500, message: "Error del servidor." };
        })
        .catch(err => {
            return err;
        });
}
