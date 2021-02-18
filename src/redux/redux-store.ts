import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./Profile/profile-reducer";
import dialogsReducer from "./Dialogue/dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./User/users-reducer";
import authReducer from "./Auth/auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./APP/app-reducer";
import chatReducer from './Chat/chat-reducer'
import MoviesReducer from "./Movies/movies-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    movies:MoviesReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,

})

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store
