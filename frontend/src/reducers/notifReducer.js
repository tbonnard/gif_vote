// format {message:'bonjour', style:'error'} or style =success
const notifReducer = (state=null, action) => {
    switch (action.type) {
        case "SET_NOTIF":
            return action.data
        case "HIDE_NOTIF":
            return action.data     
        default:
            return state;
    }
}

export const setNotification = (messageInfo) => {
    return async dispatch => {
        dispatch({
            type:'SET_NOTIF',
            data:messageInfo
        })
        setTimeout(() => {
            dispatch({
                type:'HIDE_NOTIF',
                data:null
            })
          }, 5000)
    }
}

export default notifReducer