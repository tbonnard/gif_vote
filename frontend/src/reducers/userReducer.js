import userServices from '../services/login'
import usersServices from '../services/users'
import votesGifService from '../services/votesGif'

import { setNotification } from './notifReducer'
import { initGetUserFame }  from './fameReducer'
import { initializeGif } from './gifCompareReducer'

export const userLogin = (credentials, category) => {
    return async dispatch => {
        try {
            const user = await userServices.loginUser(credentials)
            window.localStorage.setItem('loggedGifAppUser', JSON.stringify(user))
            usersServices.setToken(user.token)
            votesGifService.setToken(user.token)
            dispatch(initGetUserFame())
            dispatch(initializeGif(category))
            dispatch({
                    type: "USER_LOGIN",
                    data: user
                })
        } catch(exception) {
            dispatch(setNotification({message:'wrong credentials, please try again', style:'error'}))
        }
    }
}

export const createAccount = (accountObject) => {
    return async dispatch => {
        try {
            const newUser = await usersServices.createAccount(accountObject)
            let user;
            if (newUser) {
                user = await userServices.loginUser({username:accountObject.username, password:accountObject.password})
                window.localStorage.setItem('loggedGifAppUser', JSON.stringify(user))
                usersServices.setToken(user.token)
                votesGifService.setToken(user.token)
                dispatch(initGetUserFame())
            }
            dispatch({
                type: "USER_CREATE_ACCOUNT",
                data: user
            })
        } catch(exception) {
            dispatch(setNotification({message:'incorrect username or password (min 4 characters), please try again', style:'error'}))
        }
    }
}

export const getUserInfo = () =>{
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedGifAppUser')
        if (loggedUserJSON) {
        const user = await JSON.parse(loggedUserJSON)
        usersServices.setToken(user.token)
        votesGifService.setToken(user.token)
        dispatch(initGetUserFame())
        dispatch({
            type: "GET_USER_INFO",
            data: user
            })
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedGifAppUser')
        dispatch({
            type: "LOGOUT_USER",
            data: null
            })
    }
}

export const changeUserCurrentGif = (gifId, category) => {
    return async dispatch => {
        const newCurrentGifUser = await usersServices.changeCurrentGif(gifId)
        dispatch(initializeGif(category))
        dispatch({
            type: "CHANGE_CURRENT_GIF",
            data: newCurrentGifUser
        })
    }
}

const userReducer = (state=null, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            return action.data
        case 'GET_USER_INFO':
            return action.data
        case 'LOGOUT_USER':
            return action.data
        case 'USER_CREATE_ACCOUNT':
            return action.data
        case 'CHANGE_CURRENT_GIF':
            return action.data
        default:
            return state
    }

}

export default userReducer