import {combineReducers, createStore} from "redux";
import postWallReducer from "./postWall.reducer";
import friendsReducer from "./FriendsPage.Reducer";


const reducer = combineReducers({
    postBlock: postWallReducer,
    friendsPage: friendsReducer
})



export let store = createStore(reducer);



export default store