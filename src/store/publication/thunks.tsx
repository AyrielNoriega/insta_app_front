import { Dispatch } from "redux";
import { jwtDecode } from "jwt-decode";

import { getPublications, getToken, registerUser, updateUser, getPublicationsByUser } from "../../api";
import { setPublications, setUser } from "./publicationSlice";
import { User, UserRegister, UserToken } from "../../interfaces";

// Obtener todas las publicaciones
export const getAllPublications = () => {

    return async (dispatch: Dispatch) => {

        const res = await getPublications();

        dispatch(setPublications(res));

    };
};


// Obtener todas las publicaciones de un usuario
export const getPublicationsForUser = (username: string) => {

    return async (dispatch: Dispatch) => {

        const res = await getPublicationsByUser(username);

        dispatch(setPublications(res));

    };
};



// Registro usuario
export const register = (user: UserRegister, navigate: (path: string) => void) => {


    return async (dispatch: Dispatch) => {

        const res = await registerUser(user);
        // dispatch(setUser(res));
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

            const user_jwt: User = jwtDecode(dataToken.access_token);

            const dataUser: User = {
                id: user_jwt.id,
                name: user_jwt.name,
                username: user_jwt.username,
                email: user_jwt.email,
            }
            // Establecer usuario
            dispatch(setUser(dataUser));
            setTokenLocalStorage(dataToken.access_token);
            setUserInLocalStorage(dataUser);

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

// Actaulizar usuario
export const update = (user: User) => {

    const token = getTokenOrRedirect()
    const id = localStorage.getItem('id') as string;
    console.log(id);
    user.id = id;
    
    return async (dispatch: Dispatch) => {

        const res = await updateUser(user, token);

        console.log(res);
        // Establecer usuario
        dispatch(setUser(user));
        setUserInLocalStorage(user);

    };
};



// Función para autenticar al usuario y guardar el token en localStorage
export const authenticateUser = (user: UserToken, navigate: (path: string) => void) => {

    return async (dispatch: Dispatch) => {
        try {
                //Obtener token
                const register = await getToken(user);
                if (register.status == 200) {

                    const dataToken = {
                        access_token: register.data.access_token,
                        token_type: register.data.token_type,
                    }

                    const user_jwt: User = jwtDecode(dataToken.access_token);

                    const dataUser: User = {
                        id: user_jwt.id,
                        name: user_jwt.name,
                        username: user_jwt.username,
                        email: user_jwt.email,
                    }
                    // Establecer usuario
                    dispatch(setUser(dataUser));
                    setTokenLocalStorage(dataToken.access_token);
                    setUserInLocalStorage(dataUser);

                    navigate('/');
                }
        } catch (error) {
            console.log('No se pudo autenticar al usuario', error);
        }
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
    localStorage.setItem('id', user.id as string);
    localStorage.setItem('name', user.name);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
};


export const fetchUserFromLocalStorage = () => {
    console.log('Obteniendo usuario de Local Storage');
    
    return (dispatch: Dispatch) => {
        const id = localStorage.getItem('id') as string;
        const name = localStorage.getItem('name') as string;
        const username = localStorage.getItem('username') as string;
        const email = localStorage.getItem('email') as string;

        const user: User = { name, username, email, id };
        if (name && username && email) {
            dispatch(setUser(user));
        }
    };
};
