import React from 'react'

const GiphyLink = ({ gif }) => {

     return (
        <p className='giphy'><a href={gif.data.url} target="_blank" rel="noreferrer">via GIPHY</a></p>
    )
}

export default GiphyLink