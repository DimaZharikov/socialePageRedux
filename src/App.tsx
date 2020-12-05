import React from 'react';
import './App.css';
import FriendConteiner from "./WrapPage/Friend/FriendConteiner";
import MainPageConteiner from "./WrapPage/Main/MainConteiner";
import {BrowserRouter, Route} from "react-router-dom";
import Navigation from "./StaticPage/Navigation/NavigationConteiner";


function App() {
    return (<div>

        <BrowserRouter>
            <Navigation/>


            <div className='WrapPage -app'>
                <Route path='/Main'  component ={MainPageConteiner} />
                <Route exact path='/Friends' render= {()=> <FriendConteiner /> }/>
            </div>

        </BrowserRouter>

    </div>);

}

export default App;
