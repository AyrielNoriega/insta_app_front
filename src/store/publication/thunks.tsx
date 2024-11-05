import { Dispatch } from "redux";
import { jwtDecode } from "jwt-decode";

import { getPublications, getToken, registerUser } from "../../api";
import { setPublications, setUser } from "./publicationSlice";
import { User, UserRegister } from "../../interfaces";

// Obtener todas las publicaciones
export const getAllPublications = () => {

    return async (dispatch: Dispatch) => {

        const res = await getPublications();

        dispatch(setPublications(res));

    };
};



// Registro usuario
export const register = (user: UserRegister, navigate: (path: string) => void) => {


    return async (dispatch: Dispatch) => {

        const res = await registerUser(user);
        // dispatch(setUser(res));
        console.log(res);
        if (res.status != 201) {
            console.log('No se registro el user registrado', res.data);
        }

        //Obtener token
        const register = await getToken(user);
        if (register.status == 200) {
            const dataToken = {
                access_token: register.data.access_token,
                token_type: register.data.token_type,
            }
            // Establecer usuario
            dispatch(setUser(user));
            setTokenLocalStorage(dataToken.access_token);
            setUserInLocalStorage(user);

            navigate('/');
        } else {
            // const data = {
            //     error: register.data.error,
            //     message: register.data.message,
            //     status : register.status
            // }
            console.log("No se pudo obtener el token", register.data);

        }



    };
};


// Interfaz para las credenciales del usuario
interface UserCredentials {
    email: string;
    password: string;
}

// Función para autenticar al usuario y guardar el token en localStorage
export const authenticateUser = (credentials: UserCredentials) => {
    return async (dispatch: Dispatch) => {
        // try {
        //     const token = await loginUser(credentials);

        //     // Guardar el token en Local Storage
        //     setTokenLocalStorage(token);

        //     // Establecer usuario (puedes decodificar el token para obtener los datos del usuario)
        //     const user = jwtDecode(token);
        //     dispatch(setUser(user));
        // } catch (error) {
        //     console.log('No se pudo autenticar al usuario', error);
        // }
    };
};


// Función para verificar si el token ha expirado
const isTokenExpired = (token: string) => {
    try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        if (Date.now() >= exp * 1000) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return true;
    }
};


// Función para obtener el token o redirigir al inicio de sesión
export const getTokenOrRedirect = () => {
    const token = getTokenLocalStorage();
    if (!token || isTokenExpired(token)) {
        window.location.href = '/login'; // Redirigir al usuario a la página de inicio de sesión
        throw new Error('Token expirado o no disponible');
    }
    return token;
};


const setTokenLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
    console.log('Token guardado en Local Storage:', token);
}


const getTokenLocalStorage = () => {
    const token = localStorage.getItem('token');
    console.log('Token obtenido de Local Storage:', token);
    return token;
}


// guardar usuario en local storage
export const setUserInLocalStorage = (user: User) => {
    localStorage.setItem('name', user.name);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
};


export const fetchUserFromLocalStorage = () => {
    console.log('fetchUserFromLocalStorage');
    
    return (dispatch: Dispatch) => {
        const name = localStorage.getItem('name') as string;
        const username = localStorage.getItem('username') as string;
        const email = localStorage.getItem('email') as string;
        const user: User = { name, username, email };
        if (name && username && email) {
            dispatch(setUser(user));
        }
    };
};