import React, {FunctionComponent} from 'react'

import {NavLink} from "react-router-dom";




const Navigation: FunctionComponent <any> = (props: any) => {
    return(
        <nav>
            <div >

                <div><NavLink to={'/Main'}> <p>Main</p> </NavLink> </div>
                <div><NavLink to={'/Friends'}><p>Friends</p>  </NavLink> </div>
                <div><NavLink to={''}><p>Music</p></NavLink> </div>
                <div><NavLink to={'/Message'}><p>Message</p></NavLink></div>
                <div><NavLink to={''}><p>Video</p></NavLink></div>
                <div><NavLink to={''}><p>Setting</p></NavLink></div>


            </div>
        </nav>
    )


}


export default Navigation;
