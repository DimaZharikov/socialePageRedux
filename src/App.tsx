import React from 'react';

import Navigation from "./StaticPage/Navigation/Navigation";
import MessagePageAppComponent from "./WrapPage/Message/MessagePageAppComponent";
import MainPageConteiner from "./WrapPage/Main/MainAppComponent";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import FriendContainer from "./WrapPage/Friend/FriendsPageConteiner";
import HeaderAppComponent from "./StaticPage/Header/HeaderAppComponent";
import {DialoguePageContainer} from "./WrapPage/Message/Components/Dialogue/DialogueAppContainer";
import LogInFormContainer from "./StaticPage/Header/login/LogInFormContainer";
import Preloader from "./common/preloader/Preloader";
import {AppRootStateType} from "./Store/Store";
import {connect} from "react-redux";
import {initializerApp} from "./Store/Reducer with Include Selector/App/App.Reducer";
import {compose} from "redux";


interface Props {
    initialized: boolean
    initializerApp: () => void
}

class App extends React.Component <Props>{

    componentDidMount() {

        this.props.initializerApp()
    }

    render() {

        if (!this.props.initialized){
            return <Preloader/>
        }

        return (<div>

            <BrowserRouter>
                <HeaderAppComponent/>
                <Navigation/>


                <div className='WrapPage -app'>
                    <Route path='/profile/:userId?' render={() => <MainPageConteiner/>}/>

                    <Route exact path='/friends' render={() => <FriendContainer/>}/>

                    <Route exact path='/Message' component={MessagePageAppComponent}/>
                    {/*Path to private dialogue from MessagePage/Container */}
                    <Route path='/dialogue/:userId?' render={() => <DialoguePageContainer/>}/>


                    {/*redirect*/}
                    <Route path='/logIn' render={() => <LogInFormContainer/>}/>
                </div>

            </BrowserRouter>

        </div>);

    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    initialized: state.App.initialized
})




export default compose<React.ComponentType> (withRouter,connect (mapStateToProps,{initializerApp})) (App)


