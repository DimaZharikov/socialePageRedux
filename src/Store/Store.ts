import {combineReducers, createStore} from "redux";
import friendsReducer from "./FriendsPage.Reducer";
import messagePageReducer from "./MessagePage.Reducer";
import profilePageReducer from "./Profile.Reducer";


const reducer = combineReducers({
    profilePage: profilePageReducer,
    friendsPage: friendsReducer,
    messagePage: messagePageReducer

})



export const store = createStore(reducer);

export type AppRootStateType = ReturnType<typeof reducer>

export default store

//@ts-ignore
window.store = store;