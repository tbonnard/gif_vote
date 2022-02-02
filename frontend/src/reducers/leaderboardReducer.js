import leaderboardServices from '../services/leaderboard'

export const initializeLeaderBoard = () => {
    return async dispatch => {
        const leaderboardData = await leaderboardServices.getLeaderboard()
        dispatch({
            type:"INIT_LEADER",
            data:leaderboardData
        })
    }
}

const leaderboardReducer = (state=null, action) => {
    switch(action.type) {
        case "INIT_LEADER":
            return action.data
        default:
            return state
    }
}

export default leaderboardReducer