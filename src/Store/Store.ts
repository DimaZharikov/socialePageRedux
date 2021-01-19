import { combineReducers, createStore, applyMiddleware} from "redux";
import friendsReducer from "./Reducer with Include Selector/FriendsPage/FriendsPage.Reducer";
import messagePageReducer from "./Reducer with Include Selector/MessagePage/MessagePage.Reducer";
import profilePageReducer from "./Reducer with Include Selector/ProfilePage/Profile.Reducer";
import AuthReducer from "./Reducer with Include Selector/AuthRedirectWithHaederPage/Auth.Reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import dialoguePageReducer from "./Reducer with Include Selector/DialoguePageRedirect/DialoguePage.Reducer";
import AppReducer from "./Reducer with Include Selector/App/App.Reducer";

const reducer = combineReducers({
    App: AppReducer,
    authentication: AuthReducer,
    profilePage: profilePageReducer,
    friendsPage: friendsReducer,
    messagePage: messagePageReducer,
    dialoguePage: dialoguePageReducer,
    form: formReducer

})




const middleware = applyMiddleware(thunkMiddleware)

export const store = createStore(reducer, composeWithDevTools(middleware));



export type AppRootStateType = ReturnType<typeof reducer>

export default store

//@ts-ignore
window.store = store;