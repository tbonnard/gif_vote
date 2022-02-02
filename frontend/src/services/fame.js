import axios from 'axios'

const baseUrl = '/api/fame'
//const baseUrl = "https://damp-beach-18888.herokuapp.com/api/fame"


const getUserFame = async (tokenUser) => {
  const config = {
        headers: { Authorization: `bearer ${tokenUser}` },
      }
  const response = await axios.get(baseUrl, config)
  return response.data
  }


const exportedObject = { getUserFame }
export default exportedObject