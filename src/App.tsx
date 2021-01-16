import React from 'react';

import Navigation from "./StaticPage/Navigation/Navigation";
import MessagePageAppComponent from "./WrapPage/Message/MessagePageAppComponent";
import MainPageConteiner from "./WrapPage/Main/MainAppComponent";
import {BrowserRouter, Route} from "react-router-dom";
import FriendContainer from "./WrapPage/Friend/FriendConteiner";
import HeaderAppComponent from "./StaticPage/Header/HeaderAppComponent";


import  DialogueContainerForm from "./WrapPage/Message/Components/Dialogue/DialogueComponent";
import LogInFormContainer from "./StaticPage/Header/login/LogInFormContainer";






function App() {
    return (<div>

        <BrowserRouter>
            <HeaderAppComponent />
            <Navigation/>


            <div className='WrapPage -app'>
                <Route path='/profile/:userId?'  render ={()=><MainPageConteiner/>} />

                <Route exact path='/friends' render= {()=> <FriendContainer /> }/>

                <Route exact path='/Message' component = {MessagePageAppComponent}  />
                {/*Path to private dialogue from MessagePage/Container */}
                <Route path='/dialogue/:userId?'  render ={()=><DialogueContainerForm/>} />



                {/*redirect*/}
                <Route path='/logIn'  render ={()=><LogInFormContainer/>} />
            </div>

        </BrowserRouter>

    </div>);

}

export default App;
