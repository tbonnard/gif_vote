import axios from 'axios'

const baseUrl = '/api/users'
//const baseUrl = "https://damp-beach-18888.herokuapp.com/api/users"

let config

const setToken = (newToken) => {
  config = {
    headers: { Authorization: `bearer ${newToken}` },
  }
}

const getCurrentGifId = async (token) => {
    const response = await axios.get(`${baseUrl}/current`, {
      headers: { Authorization: `bearer ${token}` },
    } )
    return response.data
}

const createAccount = async (accountObject) => {
  const response = await axios.post(baseUrl, accountObject)
  return response.data
}

const checkUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/validate_username/${username}`)
  if (response.data.message === "username available") {return true} else {return false}
}

const changeCurrentGif = async (gifId) => {
  const response = await axios.post(`${baseUrl}/change_gif`, {gifId:gifId}, config )
  return response.data
}

const exportedObject = { setToken, getCurrentGifId, createAccount, checkUsername, changeCurrentGif }

export default exportedObject