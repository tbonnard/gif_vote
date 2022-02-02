import React from "react";
import { useDispatch, useSelector } from "react-redux";

import compare from '../../files/compare_b.png';
import { changeUserCurrentGif } from '../../reducers/userReducer'


const FameItem = ({voteFame, index, category}) => {

    const dispatch = useDispatch()
    const handleChallenge = () => {
        if (window.confirm("Are you sure you want to challenge back this gif? Your current gif will be replaced.")) {
            dispatch(changeUserCurrentGif(voteFame.GifId, category))
            window.scrollTo(0, 0)
        }
    }

    return (
        <div className="hallFameItem">
            <div>
                {index+1}
            </div>
            <div>
                <img onClick={handleChallenge} className='challenge' src={compare} alt='Challenge' title="Challenge back this gif"/>
            </div>
            <div>
                <iframe title={voteFame.id} src={voteFame.urlEmbeddedGif} frameBorder="0"></iframe>
            </div>
        </div>   
    )
}


const Fame = () => {

    const category = useSelector(state => state.category)

    const votesFame = useSelector(state => state.fame)
    return (
        <div className="hallFame">
            <h3>Your top 10 hall of fame</h3>
            {votesFame.length === 0 ?
            <p>no fame yet! Start voting!</p>:
            votesFame.map((voteFame, i) => <FameItem key={voteFame.id} voteFame={voteFame} index={i} category={category.userCategory}/>)
            }
            
        </div>
    )
}

export default Fame