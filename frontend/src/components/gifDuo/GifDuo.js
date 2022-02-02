import React from "react";

import { useDispatch } from 'react-redux'

import { voteGif } from '../../reducers/gifDuoReducer'

import Gif from "../gif/Gif";
import CategoryItems from '../categories/CategoryItems'
import PlayChallenge from '../challenge/PlayChallenge'


const GifDuo = ({ gifs,categories }) => {
    const dispatch = useDispatch()

    const handleClick = (e, gif,category) => {
        e.preventDefault()
        dispatch(voteGif(gif, category))
    }

    if (!gifs ) {
        return null
    }
    
    return (
        <div>
            <h2 className='topIndexTitle'>Who wins?</h2>
            <CategoryItems categories={categories}/>
            {categories.userCategories.length > 0 ?
            <div className='itemCompareGlobal'>
                <div className='item'>
                    <Gif gif={gifs.gifs.gif1} functionbutton={(e) => handleClick(e, gifs.gifs.gif1, gifs.categories1)}  label={"This one"}/>
                </div>
                <span>VS</span>
                <div className='item'>
                    <Gif gif={gifs.gifs.gif2} functionbutton={(e) => handleClick(e, gifs.gifs.gif2, gifs.categories2)}  label={"This one"}/>
                </div>
            </div>
            :
            <p className="noCatMessage">select at least 1 category to continue</p>}
            <PlayChallenge />
        </div>
    )

}

export default GifDuo