import axios from 'axios';

export function api() {
    return axios.create({
        baseURL: process.env.REACT_APP_BASEURL,
    });
}
