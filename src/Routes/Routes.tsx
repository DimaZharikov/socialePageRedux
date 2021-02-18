import React, {FC, Fragment} from "react";
import {withSuspense} from "../hoc/withSuspense";
import {Redirect, Route, Switch} from 'react-router-dom'
import {UsersPage} from "../components/Users/UsersContainer";
import {LoginPage} from "../components/Login/LoginPage";



//---- LAZY
const DialogsContainer = React.lazy(() => import("../components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("../components/Profile/ProfileContainer"))
const ChatPage = React.lazy(() => import("../pages/Chat/ChatPage"))
const VideoContainer = React.lazy(() => import ("../components/Video/VideoContainer"))


// //SUSPENDED
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)
const SuspendedVideoPage = withSuspense(VideoContainer)

const Routes : FC = () => {
    return (<Fragment>
        <Switch>
            <Switch>
                <Route exact path='/'
                       render={() => <Redirect to={'/profile'}/>}/>

                <Route path='/dialogs'
                       render={() => <SuspendedDialogs/>}/>

                <Route path='/profile/:userId?'
                       render={() => <SuspendedProfile/>}/>

                <Route  path='/video'
                render = {() => <SuspendedVideoPage/>} />

                <Route path='/developers'
                       render={() => <UsersPage pageTitle={'local Developers'}/>}/>

                <Route path='/login'
                       render={() => <LoginPage/>}/>

                <Route path='/chat'
                       render={() => <SuspendedChatPage/>}/>

                <Route path='*'
                       render={() => <div>404 NOT FOUND</div>}/>
            </Switch>
    </Switch>
    </Fragment>)
}
export default Routes