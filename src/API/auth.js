import { API_HOST, TOKEN } from "../utils/constant";
import jwtDecode from "jwt-decode";

export function signUpAPI(user){
    const url = `${API_HOST}/register`;

    // Enviar el mail en minusculas y darle una fecha de nacimiento al usuario
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        dateOfBirth: new Date()
    };
    // Elimina el campo repeatPassword porque no es necesaria
    delete userTemp.repeatPassword;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp)
    };

    return fetch(url, params).then(response => {
        if(response.status >= 200 && response.status < 300){
            return response.json();
        }
        return { code: 404, message: "Email no encontrado" };
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function signInAPI(user){
    const url = `${API_HOST}/login`;

    // Enviar el mail en minusculas y darle una fecha de nacimiento al usuario
    const data = {
        ...user,
        email: user.email.toLowerCase()
    };

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params).then(response => {
        if(response.status >= 200 && response.status < 300){
            return response.json();
        }
        return { message: "Usuario o contraseña incorrecto" };
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

// Guardar el token en el storage
export function setTokenAPI(token){
    localStorage.setItem(TOKEN, token);
}

// Obtener el token
export function getTokenAPI() {
    return localStorage.getItem(TOKEN);
}

// Funcion para cerrar sesion
export function logoutAPI(){
    localStorage.removeItem(TOKEN);
}

export function isUserLogedAPI(){
    const token = getTokenAPI();

    if(!token){
        logoutAPI();
        return null;
    }

    if(isExpired(token)){
        logoutAPI();
    }

    return jwtDecode(token);
}

// Saber si el token caduco
function isExpired(token){
    const { exp } = jwtDecode(token);
    const expire = exp * 1000;
    const timeout = expire - Date.now(); // si devuelve un negativo es porque expiró.
    
    if (timeout < 0) {
        return true; // Expiró
    } else {
        return false;
    }
}