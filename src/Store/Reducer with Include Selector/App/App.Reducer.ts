import {getAuthUserDate} from "../AuthRedirectWithHaederPage/Auth.Reducer";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../Store";


export interface stateProps {
    initialized: boolean
}



const initialState: stateProps = {
    initialized: false
}


export enum ActionType {
    SET_INITIALIZED='/login will be true'

}

interface Action<T> {
    type: ActionType,
    payload: T

}



//ActionCreator
export const setInitializerSucceed = () => ({
    type: ActionType.SET_INITIALIZED,

})



//ThunkCreator

export const initializerApp = (): ThunkAction<void, AppRootStateType, unknown, any> => (dispatch) => {
    const promise = dispatch(getAuthUserDate())


    Promise.all([promise]).then( () => {
         dispatch(setInitializerSucceed())
    })
}


const AppReducer = (state = initialState, action: Action<any>) => {
    switch (action.type) {
        case ActionType.SET_INITIALIZED :{
    return {
        ...state, initialized: true
    }
        }


    }
    return state
}




export default AppReducer