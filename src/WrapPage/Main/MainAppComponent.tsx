import React from 'react'
import PostWallConteiner from "./MainPostWall/PostWallConteiner";
import ProfileContainer from "./MainInfoBlock/ProfileContainer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Store/Store";
import {stateProps as authProps} from "../../Store/Reducer with Include Selector/AuthRedirectWithHaederPage/Auth.Reducer";
import {Redirect} from "react-router-dom";




const MainPageConteiner: React.FunctionComponent= (props) => {

    const auth = useSelector<AppRootStateType, authProps>(state => state.authentication);
    if (!auth.isAuth) return <Redirect to={'/logIn'}/>


    return (
        <div>
            <ProfileContainer userId = {auth.data.id}/>
            <PostWallConteiner/>
        </div>

    )
}


export default MainPageConteiner