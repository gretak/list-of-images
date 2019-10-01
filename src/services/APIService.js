import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getImages(perPage, page) {
        return apiClient.get('/photos?_limit=' + perPage + '&_page=' + page)
    }
}