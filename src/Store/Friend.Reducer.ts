import {v1} from "uuid";


export interface friendsType {
    id: string,
    followed: boolean,
    online: boolean
    avatar: string,
    name: string,
    secondName: string,
    status: string,
    location: { city: string, country: string }
}

export interface stateType {
    friends: Array<friendsType>
}

const initialState: stateType = {
    friends: [
        {
            id: v1(),
            followed: true,
            online: false,
            avatar: "https://img.icons8.com/ios-filled/50/000000/change-user-male.png",
            name: 'Dmitriy', secondName: 'Brauned',
            status: 'Any text from Status',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: v1(),
            followed: true,
            online: false,
            avatar: "https://img.icons8.com/ios-filled/50/000000/change-user-male.png",
            name: 'Janya', secondName: 'Belousova',
            status: 'Any text from Status',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: v1(),
            followed: true,
            online: true,
            avatar: "https://img.icons8.com/ios-filled/50/000000/change-user-male.png",
            name: 'Janya', secondName: 'Belousova',
            status: 'Any text from Status',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: v1(),
            online: true,
            followed: true,
            avatar: "https://img.icons8.com/ios-filled/50/000000/change-user-male.png",
            name: 'Nikita', secondName: 'Bragin',
            status: 'Any text from Status',
            location: {city: 'Bratsk', country: 'Russian Fediration'}
        },
        {
            id: v1(),
            followed: true,
            online: false,
            avatar: "https://img.icons8.com/ios-filled/50/000000/change-user-male.png",
            name: 'Nikita', secondName: 'Bragin',
            status: 'Any text from Status',
            location: {city: 'Bratsk', country: 'Russian Fediration'}
        },
    ]
}

interface Action<T> {
    type: ActionType,
    payload: T
}


export enum ActionType {
    ON_UNFOLLOW_AC = "ON-UNFOLLOW-AC",
    FOLLOW_AC = 'FOLLOW-AC',
    SET_FRIEND_AC = 'SET-FRIEND-AC',
    IS_ONLINE = 'IS_ONLINE'
}


export const unFollowAC = (id: string): Action<string> => ({
    type: ActionType.ON_UNFOLLOW_AC,
    payload: id
})

export const followAC = (id: string): Action<string> => ({
    type: ActionType.FOLLOW_AC,
    payload: id
})



export const setFriendAC = (newFriends: friendsType): Action<friendsType> => ({
    type: ActionType.SET_FRIEND_AC,
    payload: newFriends
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
            return {...state, friends: [...state.friends, action.payload]}
        }
    }
    return state
}


export default friendsReducer;