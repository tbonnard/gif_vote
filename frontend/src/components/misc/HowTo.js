import { Link } from "react-router-dom"

import one from '../../files/one.png';
import two from '../../files/two.png';
import three from '../../files/three.png';

import Credits from './Credits';

const HowTo = ({ user }) => {

    return (
        <div className='howTo'>
            <div className='itemCompareGlobal'>
                <img className='number' src={one} alt='one'/><h4>Select/change category</h4>
            </div>
 
            <div className='itemCompareGlobal'>
                <img className='number' src={two} alt='two'/><h4>As long as you vote for the same one, it remains in competition against the others</h4>
            </div>

            <div className='itemCompareGlobal'>
                <img className='number' src={three} alt='three'/><h4>Check which ones will make it to your hall of fame!</h4>
            </div>
            {user?
                <div>
                <Link className='linkBody' to="/challenge/play"><button>start</button> </Link>
                </div> :
                <div> 
                <Link className='linkBody' to="/signup"><button>connect</button> </Link>
                </div> 
            }
            <Credits />
        </div>
    )
}

export default HowTo