import React from "react";
import { Link } from "react-router-dom"

const Connect = () => {
    return (
        <div>
            <h2 className='topIndexTitle'>which one will be your 1st?</h2>
            <div className='buttonForm'>
            <Link className='linkBodyWhite' to="/signin">Connect to start</Link>
            </div>
        </div>
    )
}

export default Connect