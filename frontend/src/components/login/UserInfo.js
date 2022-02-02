import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import { logoutUser } from '../../reducers/userReducer'
import Fame from '../challenge/Fame'



const UserInfo = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const handleLogout= ()=>{
        dispatch(logoutUser())
    }

    if (!user) {
        return null
    }
    
    return (
        <div>
            <h2>Hi {user.username}!</h2>
            <Fame />
            <div className='buttonVoteDiv'>
                <Link className='linkBody' to='/challenge/play'><button>Play</button></Link>
            </div>
            <Link className='linkBody' onClick={handleLogout}>Logout</Link>
        </div>
    )
}

export default UserInfo