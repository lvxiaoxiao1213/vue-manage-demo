import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://elm.cangdu.org'
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

axios.interceptors.request.use(
    config => {
        config.headers = {
            'Accept': 'application/json',
			'Content-Type': 'application/json'
        }
        if(config.method==='post'){
            config.data = JSON.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

export default {
    get(url, params={}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err);
            })
        })
    },
    post(url, data={}) {
        return new Promise((resolve, reject) => {
            axios.post(url,data).then(response => {
                resolve(response.data);
            }).catch(err=>{
                reject(err);
            })
        })
    },
    delete(url, data={}) {
        return new Promise((resolve, reject) => {
            axios.delete(url).then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
