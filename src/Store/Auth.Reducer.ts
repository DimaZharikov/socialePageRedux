import {Dispatch} from "redux";
import {AuthAPI} from "./API/API";


interface dataProps {
    id: number | null,
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
    isFetching: false
}


export enum ActionType {
    SET_USERS_DATE = "SET-USER-DATE",
}

interface Action<T> {
    type: ActionType,
    payload: T

}

export const setAuthUserDate = (data : dataProps) : Action<dataProps> => ({
    type: ActionType.SET_USERS_DATE,
    payload: data
})


//thunk
export const getAuthUserDate = () => {

    return (dispatch: Dispatch) => {
        AuthAPI.authenticator(). then (response => {
            if (response.data.resultCode === 0) {
                const {data: {id, email, login}} = response.data
                dispatch(setAuthUserDate({id, email, login}))
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