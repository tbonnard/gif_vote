import axios from 'axios'

const baseUrl = '/api/login'
//const baseUrl = "https://damp-beach-18888.herokuapp.com/api/login"

const loginUser = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const exportedObject = { loginUser }
export default exportedObject
