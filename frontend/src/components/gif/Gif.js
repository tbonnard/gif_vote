import React from 'react'

import ButtonGif from './ButtonGif';
import IFrameGif from './IFrameGif';
import GiphyLink from './GiphyLink';

const Gif = ({ gif, functionbutton, label }) => {

    if (!gif) {
        return null
    }
    
return (
    <div>
        <IFrameGif gif={gif} />
        <ButtonGif functionbutton={functionbutton} label={label} />
        <GiphyLink gif={gif}  />
    </div>
)
}

export default Gif