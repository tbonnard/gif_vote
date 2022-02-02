import React from "react";

import GifChallenge from "./GifChallenge";
import CategoryItems from '../categories/CategoryItems' 

const Challenge = ({ categories, user, gifs }) => {

    if (!gifs || !user ) {
        return null
    }

    return (
        <div>
            <h2 className='topIndexTitle'>which one will be your 1st?</h2>
            <CategoryItems categories={categories}/>
            {categories.userCategories.length > 0 ?
            <div className='itemCompareGlobal'>
                <div className='item'>
                    {user && <p>Your current gif</p> }
                    <GifChallenge gif={gifs.gif1} user={user} />
                </div>
                <span>VS</span>
                <div className='item'>
                    {user && <p>The opponent gif</p>}              
                    <GifChallenge gif={gifs.gif2} user={user} />
                </div>
            </div>
            : 
            <p className="noCatMessage">select at least 1 category to continue</p>}
        </div>
    )

}

export default Challenge