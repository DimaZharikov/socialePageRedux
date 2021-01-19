import React, {useEffect} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../Store/Store";
import {getAuthUserDate, logOutThunk, stateProps as authProps} from "../../../Store/Reducer with Include Selector/AuthRedirectWithHaederPage/Auth.Reducer";


const AuthenticationComponent: React.FC  = () => {

    const auth = useSelector<AppRootStateType,authProps>(state => state.authentication);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch (getAuthUserDate())

    },[])



    return <div>

        {    auth.isAuth? <button onClick={()=> dispatch(logOutThunk())}><h4>{auth.data.login}</h4> </button> : <NavLink to={'/login'}>LogIn</NavLink> }

    </div>
}

export default AuthenticationComponent;