import axios from 'axios';
import { User, UserRegister, UserToken } from '../interfaces';


export const getPublications = async () => {
    const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/publications/',
        headers: { }
    };


    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};


export const getPublicationsByUser = async (username: string) => {
    const config = {
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/users/${username}/publications`,
        headers: { }
    };

    try {
        const response = await axios.request(config);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};


export const registerUser = async (user: UserRegister) => {

    const config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/v1/users/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: user
    };


    try {
        const response = await axios.request(config);
        return response;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};


export const updateUser = async (user: User, token: string) => {
    console.log(user);
    
    const config = {
        method: 'put',
        url: `http://127.0.0.1:8000/api/v1/users/${user.id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: user
    };


    try {
        const response = await axios.request(config);
        console.log(response);
        
        return response;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};


export const getToken = async (user: UserToken) => {
    const data = new FormData();
    data.append('username', user.username);
    data.append('password', user.password);

    const config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/v1/token',
        headers: {
            'Accept': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};
