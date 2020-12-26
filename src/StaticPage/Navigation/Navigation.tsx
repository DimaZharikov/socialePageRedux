import React from 'react';
import {NavLink} from "react-router-dom";


interface NavigationProps {

}

export const Navigation = (props: NavigationProps) => {
    return(
        <nav>
            <div >

                <div><NavLink to={'/profile'}> <p>Profile</p> </NavLink> </div>
                <div><NavLink to={'/friends'}><p>Friends</p>  </NavLink> </div>
                <div><NavLink to={''}><p>Music</p></NavLink> </div>
                <div><NavLink to={'/Message'}><p>Message</p></NavLink></div>
                <div><NavLink to={''}><p>Video</p></NavLink></div>
                <div><NavLink to={''}><p>Setting</p></NavLink></div>


            </div>
        </nav>
    )


}

export default Navigation

