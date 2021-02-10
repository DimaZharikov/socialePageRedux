import React, {lazy} from 'react';

import Navigation from "./StaticPage/Navigation/Navigation";

import MainPageConteiner from "./WrapPage/Main/MainAppComponent";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";

import HeaderAppComponent from "./StaticPage/Header/HeaderAppComponent";

import LogInFormContainer from "./StaticPage/Header/login/LogInFormContainer";
import Preloader from "./common/preloader/Preloader";
import {AppRootStateType} from "./Store/Store";
import {connect} from "react-redux";
import {initializerApp} from "./Store/Reducer with Include Selector/App/App.Reducer";
import {compose} from "redux";
import {withSuspense} from "./common/withSuspense";

const FriendContainer = lazy(():any  => import ("./WrapPage/Friend/FriendsPageConteiner"));
const MessagePageAppComponent = lazy(():any  => import ("./WrapPage/Message/MessagePageAppComponent"));
const DialoguePageContainer = lazy(():any  => import ("./WrapPage/Message/Components/Dialogue/DialogueAppContainer"));


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


                <HeaderAppComponent/>
                <Navigation/>

                <Switch>


                        <Route exact path={'/'} render ={()=><Redirect to = {'/profile'}/>}/>

                        <Route path='/profile/:userId?' render={() => <MainPageConteiner/>}/>

                        <Route exact path='/friends' render={withSuspense(FriendContainer) }/>

                        <Route exact path='/Message' component={withSuspense(MessagePageAppComponent)}/>
                        {/*Path to private dialogue from MessagePage/Container */}
                        <Route path='/dialogue/:userId?' render={withSuspense(DialoguePageContainer)}/>


                        {/*redirect*/}
                        <Route path='/logIn' render={() => <LogInFormContainer/>}/>
                        <Route path={'*'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>



                </Switch>

        </div>);

    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    initialized: state.App.initialized
})



export default compose<React.ComponentType> (withRouter,connect (mapStateToProps,{initializerApp})) (App)

