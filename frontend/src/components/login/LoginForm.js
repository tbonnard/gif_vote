import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import { userLogin } from '../../reducers/userReducer'

const LoginForm = () => {
    
    const dispatch = useDispatch()

    const category = useSelector(state => state.category)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLoginSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin({username, password}, category.userCategory))
        setUsername('')
        setPassword('')

    }

    return (
        <div>
            <h2>Login to your account</h2>
            <form onSubmit={handleLoginSubmit}>
                <input type="text" placeholder='your username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder='your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className='buttonForm'>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <p>Don't have an account?
            <Link className='linkBody' to="/signup"> create an account</Link></p>
        </div>
    )

}

export default LoginForm