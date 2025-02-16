import axios from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_URL_BACK_END;

const apiRequest = async (data = "", method = "", endURL = "") => {
    try {
        const response = await axios({
            method,
            url: `${BASE_URL}${endURL}`,
            data,
            headers: {
                "Content-Type": "application/json",

            }
        })
        return response?.data
    } catch (error) {
        console.error("API Request Error:", error.response?.data || error.message);
        throw error;


    }


}


export default apiRequest;