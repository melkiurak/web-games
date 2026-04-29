import axios from "axios";

const axiosInput = axios.create({
    baseURL: 'http://localhost:3000/api/games', 
    timeout: 5000,
    paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        for(const key in params){
            const value = params[key];
            if(Array.isArray(value)){
                value.forEach(item => searchParams.append(key, item))
            } else {
                searchParams.append(key, value)
            }
        }
        return searchParams.toString()
     }
})
export default axiosInput