import axios from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_URL_BACK_END;

/*const apiRequest = async (data = "", method = "", endURL = "") => {
    try {
        console.log(`${BASE_URL}${endURL}`, "this is the url...")
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
}*/

const apiRequest = async (
    data: any,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    endURL: string
  ) => {
    console.log(`https://api-911.onrender.com${endURL}`, " this is the request url", endURL)
    try {
      const completeURL = `${process.env.EXPO_PUBLIC_URL_BACK_END}${endURL}`;
      const response = await axios({
        method,
        url: completeURL,
        data,
      });
  
      return response;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  };


export default apiRequest;