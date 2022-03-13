import axios from './utils/axios';

const baseUrl = process.env.REACT_APP_URL;

const api = {
  getComponents: async () => await axios.get(baseUrl+'/components'),
  getBodyComposites: async () => await axios.get(baseUrl+'/body_composites'),
  getEyeComposites: async () => await axios.get(baseUrl+'/eye_composites'),
  getMouthComponentImages: async () => await axios.get(baseUrl+'/components?c_type=mouth'),
  getGeneratedProduct: async (product_id) => await axios.get(baseUrl+'/generated_products/'+product_id),
  composeImage: async (body_id, eyes_id, mouth_id) => { 
    const formData = new FormData()
    console.log('body eyes mouth')
    console.log(body_id + " " + eyes_id + " " + mouth_id)
    formData.append("body_id", body_id)
    formData.append("eyes_id", eyes_id)
    formData.append("mouth_id", mouth_id)
    await axios.post(baseUrl+'/compose_image', formData)
  },
  uploadComponent: async (file, type) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("c_type", type)
    const result = await axios.post(baseUrl + '/components',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return result
  },
  generateImage: async (components) => {
    const stripped_components = components.map((c) => ({'id': c.id, 'url': c.signed_url, 'layer': c.layer, 'x': c.x, 'y': c.y}))
    const formData = new FormData()
    formData.append('components', JSON.stringify(stripped_components))
    await axios.post(baseUrl +'/gen_image', formData)
  }
}

export default api;
