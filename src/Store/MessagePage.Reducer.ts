import {v1} from "uuid";


export interface searchFriendType {
    id: string,
    img: string,
    name: string,
    secondName: string
    Profile_online: boolean
}


export interface messageItemType {
    id: string,
    name: string,
    secondName: string,
    message: string,
    imgUrl: string,
    time: string,
    profile_online: boolean,
    importantly: "All" | "Unread" | "Important"
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
            name: 'Name',
            secondName: 'SecondName',
            Profile_online: true
        },
        {
            id: v1(),
            img: "https://img.icons8.com/officel/32/000000/search-client.png",
            name: 'Name',
            secondName: 'SecondName',
            Profile_online: false
        }, {
            id: v1(),
            img: "https://img.icons8.com/officel/32/000000/search-client.png",
            name: 'Name',
            secondName: 'SecondName',
            Profile_online: true
        }, {
            id: v1(),
            img: "https://img.icons8.com/officel/32/000000/search-client.png",
            name: 'Name',
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
            time: "timeDate",

            profile_online: true,
            importantly: 'Unread'
        },
        {
            id: v1(),
            name: "Name",
            secondName: "SecondName",
            message: "Any Message From Person",
            imgUrl: "https://img.icons8.com/emoji/48/000000/neutral-person-medium-dark-skin-tone.png",
            time: "timeDate",

            profile_online: true,
            importantly: 'All'
        },
        {
            id: v1(),
            name: "Name",
            secondName: "SecondName",
            message: "Any Message From Person",
            imgUrl: "https://img.icons8.com/emoji/48/000000/neutral-person-medium-dark-skin-tone.png",
            time: "timeDate",

            profile_online: true,
            importantly: 'Important'
        },

    ]

}

interface Action<T> {
    type: ActionType
    payload: T
}

export enum ActionType {
    FILTER_MESSAGE_AC = "FILTER-MESSAGE-ACTION_CREATER",
    ON_REMOVE_DIALOGUE_ITEMS = "REMOVE-DIALOG-ITEMS",
    SET_SEARCH_FRIENDS_AC = "SET-SEARCH-FRIENDS-AC"
}


export const onFilterMessageHandler = (messageItems: messageItemType): Action<messageItemType> => ({
    type: ActionType.FILTER_MESSAGE_AC,
    payload: messageItems
})


export const onRemoveDialogueItemsAC = (id: string): Action<string> => ({
    type: ActionType.ON_REMOVE_DIALOGUE_ITEMS,
    payload: id
})


const MessagePageReducer = (state = initialState, action: Action<any>) => {
    switch (action.type) {
        case ActionType.ON_REMOVE_DIALOGUE_ITEMS: {
            return {
                ...state,
                messageItems: state.messageItems.filter(d =>
                     d.id !== action.payload
                    )
            }
        }

        case ActionType.SET_SEARCH_FRIENDS_AC: {
            return {...state, searchFriends: [...state.searchFriends, action.payload]}
        }
    }
    return state;
    }



export default MessagePageReducer;

