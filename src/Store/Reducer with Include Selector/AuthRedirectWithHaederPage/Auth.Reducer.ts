import {Dispatch} from "redux";
import {AuthAPI} from "../../API/API";
import {ThunkAction} from "redux-thunk";
import {stopSubmit, FormAction} from "redux-form";
import {AppRootStateType} from "../../Store";


interface dataProps {
    id: string | null,
    email: string | null,
    login: string | null,

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

type setAuthUserDateType = ReturnType<typeof setAuthUserDate>

export const setAuthUserDate = (data:dataProps, isAuth: boolean ) : Action<{data:dataProps, isAuth: boolean }> => ({
    type: ActionType.SET_USERS_DATE,
    payload:  {data,isAuth}
})



//thunk
export const getAuthUserDate = (): ThunkAction<void, AppRootStateType, unknown, setAuthUserDateType> => {
    return (dispatch: Dispatch) => {
         return AuthAPI.authenticator(). then (response => {
            if (response.data.resultCode === 0) {
                const {data: {id, email, login}  } = response.data
                dispatch(setAuthUserDate({id, email, login}, true ))
            }
        })
    }
}



export const logInThunk =   (email: string, password: string, rememberMe: boolean = false): ThunkAction<void, AppRootStateType, unknown, FormAction > =>
(dispatch ) => {

        AuthAPI.login(email, password, rememberMe)
            .then (response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDate())
            } else {
                let messageError = response.data.messages.length != 0 ? response.data.messages[0] : 'someError'

                dispatch (stopSubmit('login', {_error: messageError}))

            }
        })

}


export const logOutThunk = () :  ThunkAction<void, AppRootStateType, unknown, setAuthUserDateType> => {
        return (dispatch) => {
        AuthAPI.logOut(). then ((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDate({login: null,email: null,id:null}, false))
            }
        })
    }
}


const AuthReducer = (state = initialeState, action: Action<any>) => {
    switch (action.type) {
        case ActionType.SET_USERS_DATE:
            return {
                ...state,
                data: action.payload.data,
                isAuth: action.payload.isAuth

            }


    }
    return state
}


export default AuthReducer