import fameServices from '../services/fame'

export const initGetUserFame =() =>{
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedGifAppUser')
        if (loggedUserJSON) {
          const user = await JSON.parse(loggedUserJSON)
            const votesFame = await fameServices.getUserFame(user.token)
            dispatch({
                type:"INIT_FAME",
                data: votesFame
            })
        }
    }
}

const fameReducer = (state=[], action) => {
    switch(action.type) {
        case "INIT_FAME":
            return action.data
       default:
           return state
    }
   }
   
   export default fameReducer