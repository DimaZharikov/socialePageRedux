import React, {useEffect} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../Store/Store";
import {setAuthUserDate, stateProps} from "../../../Store/Auth.Reducer";
import axios from "axios";



const AuthenticationComponent: React.FC  = () => {

        const auth = useSelector<AppRootStateType,stateProps>(state => state.authentication);
        const dispatch = useDispatch();

        useEffect(()=> {

            axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
                {withCredentials: true}
            )
                .then(response => {
                        if (response.data.resultCode === 0){
                            const {data: {id, email, login}} = response.data
                            dispatch(setAuthUserDate({id, email, login}))
                        }
                })
        },[dispatch])

    return <div>
        {auth.isAuth ?   <h4>{auth.data.login}</h4>  : <NavLink to={'/login'}>LogIn</NavLink> }

    </div>
}

export default AuthenticationComponent;