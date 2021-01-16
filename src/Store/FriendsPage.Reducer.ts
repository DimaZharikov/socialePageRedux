import {FriendsAPI, itemsBackPropsToFriends} from "./API/API";
import {Dispatch} from "redux";

export interface friendsType {
    name: string,
    id: string,
    uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string
    },
    status: string,
    followed: boolean

}


export interface stateType {
    friends: Array<friendsType>
    pageSize: number,
    totalFriendCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>

}

const initialState: stateType = {
    friends: [],
    pageSize: 5,
    totalFriendCount: 19,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}




export enum ActionType {
    ON_UNFOLLOW_AC = "ON-UNFOLLOW-AC",
    FOLLOW_AC = 'FOLLOW-AC',
    SET_FRIEND_AC = 'SET-FRIEND-AC',
    SET_CURRENT_PAGE = 'SET-CURRENT-PAGE',
    TOGGLE_IS_FETCHING = 'TOGGLIE_IS_FETCHING',
    TOGGlE_IN_FOLLOWING_PROGRESS = 'TOGGlE_IN_FOLLOWING_PROGRESS'

}
interface Action<T> {
    type: ActionType,
    payload: T
}


export const unFollow = (id: number): Action<number> => ({
    type: ActionType.ON_UNFOLLOW_AC,
    payload: id
});

export const follow = (id: number): Action<number> => ({
    type: ActionType.FOLLOW_AC,
    payload: id
});


export const setFriend = (newFriends: Array<itemsBackPropsToFriends>): Action<Array<itemsBackPropsToFriends>> => ({
    type: ActionType.SET_FRIEND_AC,
    payload: newFriends
});

export const setCurrentPage = (currentPage: number): Action<number> => ({
    type: ActionType.SET_CURRENT_PAGE,
    payload: currentPage
});

export const toggleIsFetching = (isFetching: boolean): Action<boolean> => ({
    type: ActionType.TOGGLE_IS_FETCHING,
    payload: isFetching
});


export const toggleFollowingProgress = (isFetching: boolean, friendsId: number): Action<{ isFetching: boolean; friendsId: number }> => ({
    type: ActionType.TOGGlE_IN_FOLLOWING_PROGRESS,
    payload: {isFetching, friendsId}
});


//thunk
export const getFriendsThunk = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        FriendsAPI.getUsers(pageSize, currentPage)
            .then((data) => {
                dispatch(toggleIsFetching(false))
                dispatch(setFriend(data))
            })
    }
};

export const followThunk = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        FriendsAPI. unFollow(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unFollow(id))
                }
                dispatch(toggleFollowingProgress(false, id))
            })
    }
}

 export const unfollowThunk = (friendsId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, friendsId))
        FriendsAPI.follow(friendsId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(follow(friendsId))
                }
                dispatch(toggleFollowingProgress(false, friendsId))
            })
    }
};


const friendsReducer = (state = initialState, action: Action<any>): stateType => {
    switch (action.type) {

        case ActionType.ON_UNFOLLOW_AC:
            return {
                ...state,
                friends: state.friends.map(fr => {

                    if (fr.id === action.payload) {
                        return {...fr, followed: false}
                    }
                    return fr
                })
            }

        case ActionType.FOLLOW_AC:
            return {
                ...state,
                friends: state.friends.map(fr => {

                    if (fr.id === action.payload) {
                        return {...fr, followed: true}
                    }
                    return fr
                })
            }


        case ActionType.SET_FRIEND_AC: {
            return {...state, friends: action.payload}
        }
        case ActionType.SET_CURRENT_PAGE: {
            return {...state, currentPage: action.payload}
        }

        case ActionType.TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.payload}
        }
        case ActionType.TOGGlE_IN_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.payload.isFetching ?
                    [...state.followingInProgress, action.payload.friendsId]
                    :
                    state.followingInProgress.filter((id: number) => id !== action.payload.friendsId)

            }
        }
    }
    return state
}


export default friendsReducer;