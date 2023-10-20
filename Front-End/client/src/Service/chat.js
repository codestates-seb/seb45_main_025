import axios from 'axios';

export default class ChatService {
    constructor() {
        this.http = axios.create({
            baseURL: 'e',
        });
    }
    async runServer() {
        try {
            const response = await this.http.get('/server');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async signup(username) {
        try {
            const response = await this.http.post('/signup', { username });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getRoomList() {
        try {
            const response = await this.http.get('/chat/rooms');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getMyRooms(username) {
        try {
            const response = await this.http.get(`/user/${username}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async postRoom(username, title) {
        try {
            const response = await this.http.post('/chat/room', { username, title });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async joinRoom(username, title) {
        try {
            const response = await this.http.post(`/chat/user/${title}`, { username });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getRoom(title) {
        try {
            const response = await this.http.get(`/chat/room/${title}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}