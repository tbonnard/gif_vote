import axios from 'axios'

const baseUrl = '/api/leaderboard'
//const baseUrl = "https://damp-beach-18888.herokuapp.com/api/leaderboard"

const getLeaderboard = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const exportedObject = { getLeaderboard }
export default exportedObject
