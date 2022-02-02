import React from "react";

const ButtonGif = ({functionbutton, label}) => {

    return (
        <div className='buttonVoteDiv'><button onClick={functionbutton}>{label}</button></div>
    )
}

export default ButtonGif