import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"

import { getUserInfo } from './reducers/userReducer'
import { initializeGif }  from './reducers/gifCompareReducer'
import { initializeGifDuo }  from './reducers/gifDuoReducer'

import LoginForm from './components/login/LoginForm'
import UserInfo from './components/login/UserInfo'
import Logo from './components/misc/Logo'
import AccountForm from './components/login/AccountForm'
import Fame from './components/challenge/Fame'
import Challenge from './components/challenge/Challenge'
import Connect from './components/login/Connect'
import GifDuo from './components/gifDuo/GifDuo'
import HowTo from './components/misc/HowTo'
import Notification from "./components/Notification"
import Leaderboards from './components/leaderboard/Leaderboard'
import Menu from './components/misc/Menu'

const App = () => {
  const dispatch = useDispatch()

  const categoryGlobal = useSelector(state => state.category)

  useEffect(() => {
    dispatch(getUserInfo())
    dispatch(initializeGifDuo())
    dispatch(initializeGif())
  }, [dispatch])

  
  const user = useSelector(state => state.user)
  const gifCompare = useSelector(state => state.gifCompare)
  const gifDuo = useSelector(state => state.gifDuo)

  return (
    <div>

      <div>
        <div className='nav'>
        <Logo />
          <div className='navItem'>
            <Link className='link' to="/leaderboard">leaderboard</Link>
            <Link className='link' to="/profile">{user === null ? "connect": "profile"}</Link>
          </div>
        </div>
      </div>
      <Menu />

    
       <Switch>
        <Route path='/profile'>
          {user === null? <Redirect to="/signup" /> : <UserInfo />}         
        </Route>

        <Route path='/signin'>
          {user === null ? <div><LoginForm /><Notification /></div> : <Redirect to="/profile" />}         
        </Route>

        <Route path='/signup'>
          {user === null ? <div><AccountForm /><Notification /></div>  : <Redirect to="/profile" />}         
        </Route>

        <Route path='/challenge/play' >
        {user === null ?
        <Connect /> :
        <div>
          <Challenge categories={categoryGlobal} user={user} gifs={gifCompare}/>
          <Fame />
          <Notification />
        </div>
        }
        </Route>

        <Route path='/challenge' >
          <HowTo user={user}/>
        </Route>

        <Route path='/leaderboard' >
          <Leaderboards />
        </Route>
    
        <Route path='/' >
            <GifDuo categories={categoryGlobal} user={user} gifs={gifDuo}/>
            <Notification />
        </Route>
      </Switch>

    </div>
    
  )
}

export default App;
