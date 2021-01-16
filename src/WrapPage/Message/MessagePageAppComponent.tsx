import React from 'react'
import SearchFriendsConteiner from "./Components/SerchFriend/SearchFriendsConteiner";
import MessageItemsConteiner from "./Components/MessageItems/MessageItemsConteiner";

import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Store/Store";
import {stateProps as authProps} from "../../Store/Auth.Reducer";
import {Redirect} from "react-router-dom";



const MessagePageAppComponent:React.FunctionComponent = () => {

    const auth = useSelector<AppRootStateType,authProps>(state => state.authentication);
    if (!auth.isAuth) return <Redirect  to = {'/logIn'} />

    return <React.Fragment>
        <SearchFriendsConteiner/>
        <MessageItemsConteiner/>
    </React.Fragment>
}



export default MessagePageAppComponent;