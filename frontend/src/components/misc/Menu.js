import React from 'react'
import menu from '../../files/menu.png';

const Menu = () => {

    const handleMenu = () => {
        const menuItem = document.querySelector('.navItem')
        if (menuItem.style.display==='none') {
            menuItem.style.display='flex'
        } else {
            menuItem.style.display='none'
        }
    }

    window.addEventListener('resize', function(event) {
        const menuItem = document.querySelector('.navItem')
        if (window.innerWidth >= 900) {
            menuItem.style.display='flex'
        } else {
            menuItem.style.display='none'
        }
    });

    return (
        <div >
            <img onClick={handleMenu} className='menu_icon' src={menu} alt='Menu'/>
        </div>  
    )
}

export default Menu