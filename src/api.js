import axios from './utils/axios';

const baseUrl = process.env.REACT_APP_URL;

const api = {
  getComponents: async () => await axios.get(baseUrl+'/components'),
  getBodyComposites: async () => await axios.get(baseUrl+'/body_composites'),
  getEyeComposites: async () => await axios.get(baseUrl+'/eye_composites'),
  getMouthComponentImages: async () => await axios.get(baseUrl+'/components?c_type=mouth'),
  composeImage: async () => await axios.post(baseUrl+'/test', {
    test: 'test'
  }),
  uploadComponent: async (file, type) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("c_type", type)
    const form_data = { 'file': file, 'c_type': type }
    const result = await axios.post(baseUrl + '/components',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    console.log(result)
    return "hi"
  }
}

export default api;
