import { combineReducers, createStore, applyMiddleware} from "redux";
import friendsReducer from "./FriendsPage.Reducer";
import messagePageReducer from "./MessagePage.Reducer";
import profilePageReducer from "./Profile.Reducer";
import AuthReducer from "./Auth.Reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';


const reducer = combineReducers({
    authentication: AuthReducer,
    profilePage: profilePageReducer,
    friendsPage: friendsReducer,
    messagePage: messagePageReducer

})




const middleware = applyMiddleware(thunkMiddleware)

export const store = createStore(reducer, composeWithDevTools(middleware));



export type AppRootStateType = ReturnType<typeof reducer>

export default store

//@ts-ignore
window.store = store;