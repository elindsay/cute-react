import axios from './utils/axios';

const baseUrl = process.env.REACT_APP_URL;

const api = {
  getComponents: async () => await axios.get(baseUrl+'/components'),
  getComponentsByType: async (type) => await axios.get(baseUrl+'/components?component_type='+type),
  getGeneratedProduct: async (product_id) => await axios.get(baseUrl+'/generated_products/'+product_id),
  uploadComponent: async (file, type, run) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("component_type", type)
    formData.append("run", run)
    const result = await axios.post(baseUrl + '/components',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return result
  },
  createComposite: async (photo, frame, scale, position) => { 
    const formData = new FormData()
    formData.append("photo_component_id", photo.id)
    formData.append("frame_component_id", frame.id)
    formData.append("photo_position", position)
    formData.append("photo_scale", scale)
    await axios.post(baseUrl+'/composites', formData)
  },
  createOrder: async (product_id, frame, scale, position) => { 
    const formData = new FormData()
    formData.append("product_id", product_id)
    await axios.post(baseUrl+'/orders', formData)
  }
}

export default api;
