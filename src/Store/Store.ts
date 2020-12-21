import {combineReducers, createStore} from "redux";
import postWallReducer from "./postWall.reducer";
import friendsReducer from "./FriendsPage.Reducer";
import messagePageReducer from "./MessagePage.Reducer";


const reducer = combineReducers({
    postBlock: postWallReducer,
    friendsPage: friendsReducer,
    messagePage: messagePageReducer

})



export const store = createStore(reducer);

export type AppRootStateType = ReturnType<typeof reducer>

export default store

//@ts-ignore
window.store = store;