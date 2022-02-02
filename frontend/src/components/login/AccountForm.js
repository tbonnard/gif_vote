import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

import {createAccount} from '../../reducers/userReducer'
import userServices from '../../services/users'

const AccountForm = () => {

    const dispatch = useDispatch()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [usernameConfirmed, setUsernameConfirmed] = useState(false)

    const handleCreateAccount = (e) => {
        e.preventDefault()
        const accountObject = {username:username, password:password, confirmPassword:confirmPassword}
        dispatch(createAccount(accountObject))
        setUsername('')
        setPassword('')
        setConfirmPassword('')
    }

    const hanldeUsername = async (e) => {
        setUsername(e.target.value)
        const usernameValidated = await userServices.checkUsername(e.target.value)
        setUsernameConfirmed(usernameValidated)
    }

    return (
        <div>
            <h2>Create an account</h2>
            <p className='whyCreate'>to save your hall of fame</p>
            <form onSubmit={handleCreateAccount}>
                <input type="text" placeholder='a username' value={username} onChange={hanldeUsername} />
                <input type="password" placeholder='a password (4 characters min)' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder='confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <div className='buttonForm'>
                {!usernameConfirmed && username.length > 0 ?  <p className='error'>username not available</p> : <button type='submit'>Create</button>  }
                </div>
            </form>
            <p>Already have an account?
            <Link className='linkBody' to="/signin"> login to your account</Link></p>
        </div>
    )
}

export default AccountForm