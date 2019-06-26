import axios from 'axios';
import {displayError} from "./utils";

export const baseUrl = 'http://components.nextf.ru/api/';
// export const baseUrl = 'http://127.0.0.1:8000/api/';
// export const baseUrl = 'http://92.53.124.133/api/';

export class BaseApi {
    baseUrl = baseUrl;
    headers = {'Authorization': 'token ' + this.getToken()};

    getUrl(url) {
        return this.baseUrl + url;
    }

    post(url, data) {
        return axios
            .post(this.getUrl(url), data, {
                headers: this.headers
            })
            .catch(error => {
                displayError(error.message, 'SERVER')
            })
    }

    get(url) {
        return axios
            .get(this.getUrl(url), {
                headers: this.headers
            });
    }

    put(url, data) {
        return axios
            .put(this.getUrl(url), data, {
                headers: this.headers
            });
    }

    deleteRequest(url) {
        return axios
            .delete(this.getUrl(url), {
                headers: this.headers
            });
    }

    getToken() {
        return localStorage.getItem('token');
    }
}