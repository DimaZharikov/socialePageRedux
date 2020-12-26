
export interface friendsType  {
    name: string,
    id: string,
    uniqueUrlName: string ,
    photos:{ small: string | null ,
            large: string },
    status: string ,
    followed: boolean

}

export interface stateType {
    friends: Array<friendsType>
    pageSize: number,
    totalFriendCount: number,
    currentPage: number,
    isFetching: boolean

}

const initialState: stateType = {
    friends: [ ],
    pageSize: 5,
    totalFriendCount: 19,
    currentPage: 1,
    isFetching: false,
}



interface Action<T> {
    type: ActionType,
    payload: T
}



export enum ActionType {
    ON_UNFOLLOW_AC = "ON-UNFOLLOW-AC",
    FOLLOW_AC = 'FOLLOW-AC',
    SET_FRIEND_AC = 'SET-FRIEND-AC',
    SET_CURRENT_PAGE = 'SET-CURRENT-PAGE',
    TOGGLE_IS_FETCHING = 'TOGGLIE_IS_FETCHING'

}


export const unFollow = (id: string): Action<string> => ({
    type: ActionType.ON_UNFOLLOW_AC,
    payload: id
})

export const follow = (id: string): Action<string> => ({
    type: ActionType.FOLLOW_AC,
    payload: id
})


export const setFriend = (newFriends: friendsType): Action<friendsType> => ({
    type: ActionType.SET_FRIEND_AC,
    payload: newFriends
})

export const setCurrentPage = (currentPage: number): Action<number> =>  ({
    type: ActionType.SET_CURRENT_PAGE,
    payload: currentPage
})

export const toggleIsFetching = (isFetching: boolean): Action<boolean> =>  ( {
    type: ActionType.TOGGLE_IS_FETCHING,
    payload: isFetching
})

const friendsReducer = (state = initialState, action: Action <any>): stateType => {
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
            return {...state, currentPage: action.payload }
        }
        case ActionType.TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.payload}
        }
    }
    return state
}




export default friendsReducer;