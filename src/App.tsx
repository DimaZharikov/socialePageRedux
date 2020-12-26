import React from 'react';



import Navigation from "./StaticPage/Navigation/Navigation";
import MessagePageAppComponent from "./WrapPage/Message/MessagePageAppComponent";
import MainPageConteiner from "./WrapPage/Main/MainAppComponent";
import {BrowserRouter, Route} from "react-router-dom";
import FriendContainer from "./WrapPage/Friend/FriendConteiner";






function App() {
    return (<div>

        <BrowserRouter>
            <Navigation/>


            <div className='WrapPage -app'>
                <Route path='/profile/:userId?'  render ={()=><MainPageConteiner/>} />
                <Route exact path='/friends' render= {()=> <FriendContainer /> }/>

                <Route exact path='/Message' component = {MessagePageAppComponent}  />
            </div>

        </BrowserRouter>

    </div>);

}

export default App;
