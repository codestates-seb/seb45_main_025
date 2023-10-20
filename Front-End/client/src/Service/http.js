import axios from 'axios';

export default class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetch(url, options) {
        try {
            const response = await axios({
                url: `${this.baseURL}${url}`,
                method: options.method || 'GET',
                data: options.body,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (response.status < 200 || response.status >= 300) {
                const message = 'HTTP problem';
                throw new Error(message);
            }
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}