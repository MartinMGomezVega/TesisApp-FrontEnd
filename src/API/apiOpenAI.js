import { API_HOST } from "../utils/constant";
import { getTokenAPI } from "./auth";

// Recibe la key de la API de Open AI ingresada por el usuario
export function validateTokenGPT(apiKey) {
    const url = `${API_HOST}/validateAPIKey`;
    const data = {
        apiKey
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
            return response.json();
        }) 
        .catch(err => {
            return err;
        });
}

// Recibe la key de la API de Open AI ingresada por el usuario
export async function interactionChatGPT(message) {
    const url = `${API_HOST}/validateAPIKey`;
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

    try {
        const response = await fetch(url, params);
        const data = await response.json();
        return data.message;
    } catch (err) {
        return err;
    }
}