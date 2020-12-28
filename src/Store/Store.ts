import {combineReducers, createStore} from "redux";
import friendsReducer from "./FriendsPage.Reducer";
import messagePageReducer from "./MessagePage.Reducer";
import profilePageReducer from "./Profile.Reducer";
import AuthReducer from "./Auth.Reducer";
import { composeWithDevTools } from 'redux-devtools-extension';


const reducer = combineReducers({
    authentication: AuthReducer,
    profilePage: profilePageReducer,
    friendsPage: friendsReducer,
    messagePage: messagePageReducer

})

const composeEnhancers = composeWithDevTools();

export const store = createStore(reducer,
    composeEnhancers
);

export type AppRootStateType = ReturnType<typeof reducer>

export default store

//@ts-ignore
window.store = store;