import {v1} from "uuid";


export interface searchFriendType {
    id: string,
    img: string,
    name: string,
    secondName: string
    Profile_online: boolean
}

export type ChangeFilterType = 'All' | 'Unread' | 'Important';

export interface messageItemType {
    id: string,
    name: string,
    secondName: string,
    message: string,
    imgUrl: string,

    profile_online: boolean,
    importantly: ChangeFilterType
}




export interface messagePageType {

    searchFriends: Array<searchFriendType>,
    messageItems: Array<messageItemType>

}


const initialState: messagePageType = {

    searchFriends: [
        {
            id: v1(),
            img: "https://img.icons8.com/officel/32/000000/search-client.png",
            name: 'Jane',
            secondName: 'SecondName',
            Profile_online: true
        },
        {
            id: v1(),
            img: "https://img.icons8.com/officel/32/000000/search-client.png",
            name: 'Nikita',
            secondName: 'SecondName',
            Profile_online: false
        }, {
            id: v1(),
            img: "https://img.icons8.com/officel/32/000000/search-client.png",
            name: 'Pasha',
            secondName: 'SecondName',
            Profile_online: true
        }, {
            id: v1(),
            img: "https://img.icons8.com/officel/32/000000/search-client.png",
            name: 'Marina',
            secondName: 'SecondName',
            Profile_online: false
        },
    ],
    messageItems: [
        {
            id: v1(),
            name: "Name",
            secondName: "SecondName",
            message: "Any Message From Person",
            imgUrl: "https://img.icons8.com/emoji/48/000000/neutral-person-medium-dark-skin-tone.png",


            profile_online: true,
            importantly: 'Unread'
        },
        {
            id: v1(),
            name: "Name",
            secondName: "SecondName",
            message: "Any Message From Person",
            imgUrl: "https://img.icons8.com/emoji/48/000000/neutral-person-medium-dark-skin-tone.png",
            profile_online: true,
            importantly: 'All'
        },
        {
            id: v1(),
            name: "Name",
            secondName: "SecondName",
            message: "Any Message From Person",
            imgUrl: "https://img.icons8.com/emoji/48/000000/neutral-person-medium-dark-skin-tone.png",


            profile_online: false,
            importantly: 'Important'
        },

    ],


}

interface Action<T> {
    type: ActionType
    payload: T
}

// enum string configuration: namePages/{name of component}/actionType
export enum ActionType {

    SET_SEARCH_FRIENDS_AC = "message/{SearchFriendsConteiner}/SET-SEARCH-FRIENDS-AC",
    ON_SEARCH_FRIENDS_AC = "message/{SearchFriendsConteiner}/ON-SERACH-FRIENDS-AC",


    SET_MESSAGE_ITEMS_AC = "message/{MessageItemsConteiner}/SET-MESSAGE-ITEMS-AC",
    ON_REMOVE_DIALOGUE_ITEMS = "message/{MessageItemsConteiner}/REMOVE-DIALOG-ITEMS",



}

export const setSearchFriendsAC = (searchFriends: Array<searchFriendType>): Action<Array<searchFriendType>> => ({
    type: ActionType.SET_SEARCH_FRIENDS_AC,
    payload: searchFriends
})

export const onSearchFriendsAC = (name: string): Action<string> => ({
    type: ActionType.ON_SEARCH_FRIENDS_AC,
    payload: name
})


export const setMessageItemsAC = (messageItems: Array<messageItemType>) => ({
    type: ActionType.SET_MESSAGE_ITEMS_AC,
    payload: messageItems
})

export const onRemoveDialogueItemsAC = (id: string): Action<string> => ({
    type: ActionType.ON_REMOVE_DIALOGUE_ITEMS,
    payload: id
})


const messagePageReducer = (state = initialState, action: Action<any>) => {
    switch (action.type) {
        case ActionType.SET_SEARCH_FRIENDS_AC: {
            return {...state, searchFriends: [action.payload, ...state.searchFriends]}
        }
        case ActionType.ON_SEARCH_FRIENDS_AC: {
             if (action.payload !==''){
                return {
                    ...state,
                    searchFriends: state.searchFriends.filter(n => n.name.toLowerCase().includes(action.payload))
                }
            }
             return initialState
        }


        case ActionType.ON_REMOVE_DIALOGUE_ITEMS: {
            return {
                ...state,
                messageItems: state.messageItems.filter(d =>
                    d.id !== action.payload
                )
            }
        }
        case ActionType.SET_MESSAGE_ITEMS_AC: {
            return {...state, messageItems: [action.payload, ...state.messageItems]}
        }

    }
    return state;
}


export default messagePageReducer;
