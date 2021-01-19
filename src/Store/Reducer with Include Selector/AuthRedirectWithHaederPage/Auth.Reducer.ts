import {Dispatch} from "redux";
import {AuthAPI} from "../../API/API";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {AppRootStateType} from "../../Store";


interface dataProps {
    id: string | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,




}

export interface stateProps {
    data: dataProps
    isAuth: boolean
    isFetching: boolean

}



const initialeState: stateProps = {
    data: {
        id: null,
        email: null,
        login: null,
        isAuth: false,

    },
    isAuth: false,
    isFetching: false,

}


export enum ActionType {
    SET_USERS_DATE = "SET-USER-DATE",

}

interface Action<T> {
    type: ActionType,
    payload: T

}

export const setAuthUserDate = (data: dataProps) : Action<dataProps> => ({
    type: ActionType.SET_USERS_DATE,
    payload:  data
})







//thunk
export const getAuthUserDate = () => {
    return (dispatch: Dispatch) => {
         return AuthAPI.authenticator(). then (response => {
            if (response.data.resultCode === 0) {
                const {data: {id, email, login} } = response.data
                dispatch(setAuthUserDate({id, email, login, isAuth: true} ))

            }
        })
    }
}



export const logInThunk =   (email: string, password: string, rememberMe: boolean = false):  ThunkAction<void, AppRootStateType, unknown, any> =>
(dispatch ) => {

        AuthAPI.login(email, password, rememberMe)
            .then (response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDate())
            } else {
                let messageError = response.data.messages.length > 0 ? response.data.messages[0] : 'someError'

                dispatch (stopSubmit('login', {_error: messageError}))
            }
        })

}


export const logOutThunk = () => {
        return (dispatch: Dispatch) => {
        AuthAPI.logOut(). then ((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDate({login: null,email: null,id:null, isAuth: false}))

            }
        })
    }
}


const AuthReducer = (state = initialeState, action: Action<dataProps>) => {
    switch (action.type) {
        case ActionType.SET_USERS_DATE:
            return {
                ...state,
                data: action.payload,
                isAuth: true
            }

    }
    return state
}




export default AuthReducer