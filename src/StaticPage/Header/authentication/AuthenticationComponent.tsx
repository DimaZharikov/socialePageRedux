import React, {useEffect} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../Store/Store";
import {getAuthUserDate, setAuthUserDate, stateProps} from "../../../Store/Auth.Reducer";
import {AuthAPI} from "../../../Store/API/API";



const AuthenticationComponent: React.FC  = () => {

    const auth = useSelector<AppRootStateType,stateProps>(state => state.authentication);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch (getAuthUserDate())
    },[dispatch])

    return <div>
        {auth.isAuth ?   <h4>{auth.data.login}</h4>  : <NavLink to={'/login'}>LogIn</NavLink> }

    </div>
}

export default AuthenticationComponent;