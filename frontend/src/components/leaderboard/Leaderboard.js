import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import { initializeLeaderBoard } from '../../reducers/leaderboardReducer'


const Leaderboard = ({gif}) => {

    return (
        <iframe className='iframeLeaderBoard' title={gif.gifId} src={gif.urlEmbeddedGif} frameBorder="0"></iframe>
    )
}

const Leaderboards = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeLeaderBoard())
      }, [dispatch])

    const leaderboards = useSelector(state => state.leaderboard)

    if (!leaderboards) {
        return null
    }

    return (
        <div className='leaderboardGlobal'>
            <div className='leaderboardSection'>
                <h2>Daily</h2>
                {leaderboards.daily.length > 0 ? 
                leaderboards.daily.map(leader => <Leaderboard key={leader.GifId} gif={leader}/>) :
                <p>no gif for now! start <Link className='linkBody' to="/"> voting</Link>!</p> }
            </div>
            <div className='leaderboardSection'>
                <h2>Weekly</h2>
                {leaderboards.weekly.length > 0 ?
                leaderboards.weekly.map(leader => <Leaderboard key={leader.GifId} gif={leader}/>)
                :
                <p>no gif for now! start <Link className='linkBody' to="/"> voting</Link>!</p> }
            </div>
            <div className='leaderboardSection'>
                <h2>Overall</h2>
                {leaderboards.all.length > 0 ?
                leaderboards.all.map(leader => <Leaderboard key={leader.GifId} gif={leader}/>)
                :
                <p>no gif for now! start <Link className='linkBody' to="/"> voting</Link>!</p> }
            </div>
        </div>
    )

}

export default Leaderboards