import React from 'react'

const IFrameGif = ({ gif }) => {

     return (
         <div>
            <iframe title={gif.data.id} src={gif.data.embed_url} frameBorder="0"></iframe>
        </div>

    )
}

export default IFrameGif