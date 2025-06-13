import axios from 'axios'

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
      }

})

api.interceptors.request.use(config => {
    const token = localStorage?.getItem('token'); 

    config.headers.Authorization = `Bearer ${token}`
    return config
})


export { api }