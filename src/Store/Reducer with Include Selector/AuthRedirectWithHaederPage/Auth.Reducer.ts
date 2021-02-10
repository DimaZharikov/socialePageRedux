import {Dispatch} from "redux";
import {AuthAPI, SecurityAPI} from "../../API/API";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {stopSubmit, FormAction} from "redux-form";
import {AppRootStateType} from "../../Store";



interface dataProps {
    id: number | null,
    email: string | null,
    login: string | null,

}

export interface stateProps {
    data: dataProps
    isAuth: boolean
    isFetching: boolean
    captcha: string | null // if null - captcha in not requared
   }



const initialeState: stateProps = {
    data: {
        id: null,
        email: null,
        login: null,

    },
    isAuth: false,
    isFetching: false,
    captcha: null
}

// enum string configuration: namePages/{name of component}/actionType
export enum ActionType {
    SET_USERS_DATE = "/auth/{AuthComponent & HeaderAppComponent, App}/SET-USER-DATE",
    GET_CAPTCHA_URL_SUCCESS = "auth/{authComponent}/GET_CAPTCHA_URL_SUCCESS"

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

type getCaptchaURLSuccessType = ReturnType<typeof getCaptchaURLSuccess>
export const getCaptchaURLSuccess = (url: string): Action <string> => ({
    type: ActionType.GET_CAPTCHA_URL_SUCCESS,
    payload: url
})


//thunk
export const getAuthUserDate = (): ThunkAction<void, AppRootStateType, unknown, setAuthUserDateType> => {
    return  async (dispatch: Dispatch) => {
         const response = await AuthAPI.authenticator();
         if (response.data.resultCode === 0) {
                const {data: {id, email, login}  } = response.data
                dispatch(setAuthUserDate({id, email, login}, true ))
            }
    }
}



export const logInThunk =   (email: string, password: string, rememberMe: boolean = false, captcha: string | null): ThunkAction<void, AppRootStateType, unknown, FormAction > =>
 async (dispatch ) => {

         const response = await AuthAPI.login(email, password, rememberMe, captcha);
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDate())
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptcha());
                }

                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(stopSubmit("login", {_error: message}));
            }
}


export const logOutThunk = () :  ThunkAction<void, AppRootStateType, unknown, setAuthUserDateType> => {
        return async (dispatch) => {
        const response = await AuthAPI.logOut();
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDate({login: null,email: null,id:null}, false))
            }
        }
}


export const getCaptcha = () => async (dispatch: ThunkDispatch<AppRootStateType, {  }, getCaptchaURLSuccessType>) => {
    const res = await SecurityAPI.getCaptchaUrl()
        const captchaUrl = res.data.url;
        dispatch (getCaptchaURLSuccess(captchaUrl))

 }


const AuthReducer = (state = initialeState, action: Action<any>): stateProps => {
    switch (action.type) {
        case ActionType.SET_USERS_DATE:
            return {
                ...state,
                data: action.payload.data ,
                isAuth: action.payload.isAuth
            }
        case ActionType.GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state, captcha: action.payload
            }
    }
    return state
}

//type

type TypesOfAction = setAuthUserDateType

export default AuthReducer