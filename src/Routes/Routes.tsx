import React, {FC, Fragment} from "react";
import {withSuspense} from "../hoc/withSuspense";
import {Redirect, Route, Switch} from 'react-router-dom'
import {UsersPage} from "../components/Users/UsersContainer";
import {LoginPage} from "../components/Login/LoginPage";


//---- LAZY
const DialogsContainer = React.lazy(() => import("../components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("../components/Profile/ProfileContainer"));
const ChatPage = React.lazy(() => import("../pages/Chat/ChatPage"));
const VideoContainer = React.lazy(() => import ("../components/Video/VideoContainer"));
const SearchingMovieDesc = React.lazy(() => import ("../components/Video/SearchingMovie"));

// //SUSPENDED
export const SuspendedDialogs = withSuspense(DialogsContainer);
export const SuspendedProfile = withSuspense(ProfileContainer);
export const SuspendedChatPage = withSuspense(ChatPage);
export const SuspendedVideoPage = withSuspense(VideoContainer);
export const SuspendedDescMovies = withSuspense(SearchingMovieDesc)

const Routes: FC = () => {
    return (<Fragment>

        <Switch>
            <Route exact path='/'
                   render={() => <Redirect to={'/profile'}/>}/>

            <Route path='/dialogs'
                   render={() => <SuspendedDialogs/>}/>

            <Route path='/profile/:userId?'
                   render={() => <SuspendedProfile/>}/>
            {/*moviesBlock*/}
            <Route path='/video'
                   render={() => <SuspendedVideoPage/>}/>

            <Route path={'/movieByTitle/:imdbID'}
                   render={() => <SuspendedDescMovies/>}/>
            {/*-----------*/}
            <Route path='/developers'
                   render={() => <UsersPage pageTitle={'local Developers'}/>}/>

            <Route path='/login'
                   render={() => <LoginPage/>}/>

            <Route path='/chat'
                   render={() => <SuspendedChatPage/>}/>

            <Route path='*'
                   render={() => <div>404 NOT FOUND</div>}/>
        </Switch>

    </Fragment>)
}
export default Routes