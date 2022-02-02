import axios from 'axios'

const baseUrl = '/api/gifs'
//const baseUrl = "https://damp-beach-18888.herokuapp.com/api/gifs"


const getRandomGif = async (category) => {
  const response = await axios.get(`${baseUrl}/cat/${category}`)
  return response.data
}

const getSpecificGif = async (id) => {
  const response = await axios.get(`${baseUrl}/gif/${id}`)
  return response.data
}

const exportedObject = { getRandomGif, getSpecificGif }
export default exportedObject