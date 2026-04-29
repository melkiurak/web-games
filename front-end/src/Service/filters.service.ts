import axios from "axios"

export const getMetaDate = async() => {
    try{
        const response = await axios.get('http://localhost:3000/api/metadata')
        return response.data
    } catch(error) {
        console.error("Failed to load metaDate:", error);
    }
}