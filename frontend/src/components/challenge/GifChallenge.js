import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";

import { voteGif } from '../../reducers/gifCompareReducer'

import Gif from '../gif/Gif';

const GifChallenge = ({ gif, user }) => {

    const dispatch = useDispatch()
    const votesFame = useSelector(state => state.fame)

    if(!gif) {
        return null
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(voteGif(gif))
    }

    let numberInFame=0
    if (votesFame) {
        votesFame.forEach((i, index) => {
            if (i.GifId === gif.data.id) {
                numberInFame = index+1
            }
        })
    }

    return (
        <div>
            <Gif user={user} gif={gif} functionbutton={(e) => handleClick(e)}  label={"This one!"}/>
            {numberInFame ? <p>Your #{numberInFame}</p> : <p>not yet in fame</p> }
        </div>
    )
}

export default GifChallenge