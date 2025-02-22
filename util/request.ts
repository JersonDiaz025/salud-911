import axios from "axios";
const apiRequest = async (
    data: any,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    endURL: string
  ) => {
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