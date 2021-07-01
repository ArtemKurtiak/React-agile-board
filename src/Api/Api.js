import axios from "axios";

const BASE_URL = 'http://localhost:3001';

class Api {
    constructor(url) {
        this.url = url;
    }

    async post(endpoint, body, method = 'post', token = '') {
        const response = await axios({
            url: `${this.url.url}/${endpoint}`,
            method,
            data: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${JSON.parse(token)}`,
                "Accept": "application/json"
            }
        })
        return response
    }

    async get(endpoint, method = 'get', token = '') {
        console.log(`${this.url.url}/${endpoint}`)
        const response = await axios({
            url: `${this.url.url}/${endpoint}`,
            method,
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            }
        })
        return await response.data;
    }

    async put(endpoint, body, method = 'put') {
        const response = await axios({
            url: `${this.url.url}/${endpoint}`,
            method,
            data: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            }
        })
        return response
    }
}

export default new Api({url: BASE_URL})
