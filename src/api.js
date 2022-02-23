import axios from './utils/axios';

const baseUrl = process.env.REACT_APP_URL;

const api = {
  getBodyComposites: async () => await axios.get(baseUrl+'/body_composites'),
  getEyeComposites: async () => await axios.get(baseUrl+'/eye_composites'),
  getMouthComponentImages: async () => await axios.get(baseUrl+'/components?c_type=mouth'),
}

export default api;
