import axios from "axios";

export const fetchFromAPI = async (name, region) => {
  const options = {
    method: "GET",
    url:
      name === ""
        ? `https://restcountries.com/v3.1/all`
        : `https://restcountries.com/v3.1/name/${name}`,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
