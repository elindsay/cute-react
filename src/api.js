import axios from './utils/axios';

const baseUrl = process.env.REACT_APP_URL;

const api = {
  getComponentImages: async () => await axios.get(baseUrl+'/components/')
}

export default api;
