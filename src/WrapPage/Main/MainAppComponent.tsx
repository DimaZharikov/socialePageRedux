import React from 'react'
import PostWallConteiner from "./MainPostWall/PostWallConteiner";
import ProfileContainer from "./MainInfoBlock/ProfileContainer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Store/Store";
import {stateProps as authProps} from "../../Store/Auth.Reducer";
import {Redirect} from "react-router-dom";



interface Props {

}


const MainPageConteiner: React.FunctionComponent<Props> = (props) => {

    const auth = useSelector<AppRootStateType, authProps>(state => state.authentication);
    if (!auth.isAuth) return <Redirect to={'/logIn'}/>


    return (
        <div>
            <ProfileContainer/>
            <PostWallConteiner/>
        </div>

    )
}


export default MainPageConteiner