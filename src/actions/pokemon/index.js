import axios from "axios";
import { API_URL } from "helpers/env";

const getListPokemon = async (offset, limit, filter) => {
  try {
    const response = await axios.get(
      `${API_URL}/pokemon?offset=${offset}&limit=${limit}`
    );

    let data = [];
    if (response?.data?.results?.length > 0) {
      for (const el of response.data.results) {
        if (el?.url) {
          const response = await axios(el?.url);
          if (filter) {
            const type = response.data?.types?.map((el) => el?.type?.name);
            if (type?.length > 0 && type.includes(filter)) {
              data.push(response.data);
            }
          } else {
            data.push(response.data);
          }
        }
      }
    }

    return { count: response.data.count, results: data };
  } catch (error) {
    console.log("[Error Api]", error);
    throw error;
  }
};

export { getListPokemon };
