import axios from 'axios'

const baseUrl = '/api/votesgif'
//const baseUrl = "https://damp-beach-18888.herokuapp.com/api/votesgif"

let config

const setToken = (newToken) => {
  config = {
    headers: { Authorization: `bearer ${newToken}` },
  }
}

const voteGif = async (objectVotedDetails) => {
  const response = await axios.post(`${baseUrl}/challenge`, objectVotedDetails, config)
  return response.data
}

const voteDuoGif = async (objectVotedDetails, token) => {
  const response = await axios.post(`${baseUrl}/duo`, {objectVotedDetails, token})
  return response.data
}

const exportedObject ={ setToken, voteGif, voteDuoGif }
export default exportedObject