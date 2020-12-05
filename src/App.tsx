import React from 'react';

import FriendConteiner from "./WrapPage/Friend/FriendConteiner";
import MainPageConteiner from "./WrapPage/Main/MainConteiner";
import {BrowserRouter, Route} from "react-router-dom";
import Navigation from "./StaticPage/Navigation/Navigation";
import MessagePageConteiner from "./WrapPage/Message/MessagePageConteiner";




function App() {
    return (<div>

        <BrowserRouter>
            <Navigation/>


            <div className='WrapPage -app'>
                <Route path='/Main'  component ={MainPageConteiner} />
                <Route exact path='/Friends' render= {()=> <FriendConteiner /> }/>
                <Route exact path='/Message' component = {MessagePageConteiner}  />
            </div>

        </BrowserRouter>

    </div>);

}

export default App;
