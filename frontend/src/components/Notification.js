import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(state => state.notif)

    if (!message) {
        return <div className="error"></div>
    }
    return (
        <div className='notifGlobal'>
        <p className={message.style}>
            {message.message}
        </p>
        </div>
    )
}

export default Notification