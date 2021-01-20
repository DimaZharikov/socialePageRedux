import {v1} from "uuid";
import {Dispatch} from "redux";
import {ProfileAPI} from "../../API/API";

export type profileType = {
    "aboutMe": string,
    "contacts": {
        "facebook": string | null,
        "website": string | null,
        "vk": string | null,
        "twitter": string | null,
        "instagram": string | null,
        "youtube": string | null,
        "github": string | null,
        "mainLink": string | null
    },
    "lookingForAJob": boolean,
    "lookingForAJobDescription": boolean,
    "fullName": string,
    "userId": number | null,
    "photos": {
        "small": string,
        "large": string

    },

}
export type ItemPostType = {
    id: string,
    fullName: string
    imgLikes: string,
    ImgPerson: string,
    imgShare: string,
    imgBtnDeletePost: string,

    content: string,
    counterLikes: number

}


export interface StateProps {
    profile: profileType | null,
    status: string,
    messageForNewPost: string,
    itemsPost: Array<ItemPostType>
    isFetching: boolean,
}


let ininitaialState: StateProps = {
    status: '',
    profile: {
        aboutMe: 'Learning Front - end Dev.',
        contacts: {
            facebook: null,
            website: null,
            vk: 'https://vk.com/zharikov_d_n',
            twitter: null,
            instagram: 'instagram.com',
            youtube: null,
            github: 'https://github.com/DimaZharikov',
            mainLink: 'https://www.linkedin.com/feed/',
        },
        lookingForAJob: true,
        lookingForAJobDescription: false,
        fullName: 'Dmitriy Zharikov',
        userId: 13058,
        photos: {
            small: 'https://vk.com/zharikov_d_n?z=photo202353636_457239931%2Falbum202353636_0%2Frev',
            large: 'https://sun9-58.userapi.com/impf/c855220/v855220867/b2242/wUwnR4i_HII.jpg?size=810x1080&quality=96&sign=065f3587fc85d86539273319b7af1f47&type=album'

        },

    },
    messageForNewPost: '',
    itemsPost: [
        {
            id: v1(),
            fullName: 'AnyName of Users',
            imgLikes: "https://img.icons8.com/material-outlined/48/000000/filled-like.png",
            counterLikes: 0,
            ImgPerson: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
            imgShare: "https://img.icons8.com/metro/52/000000/forward-arrow.png",
            imgBtnDeletePost: "https://img.icons8.com/ios/50/000000/delete-message.png",

            content: 'AnyMessagePost'
        }
    ],
    isFetching: true,
}


export interface Action<T> {
    type: string,
    payload: T
}

// enum string configuration: namePages/{name of component}/actionType
export enum ActionType {
    //ProfileEnumType
    SET_PROFILE_USERS = "https://social-network.samuraijs.com/api/1.0/profile/{getResponse in ProfileComponent}/SET_PROFILE_USERS",

    SET_STATUS = 'SET-STATUS',


    // PostsEnumType
    ADD_NEW_POST = 'profilePage/{PostWallConteiner}/ADD-NEW-POST-ITEM',
    ON_CHANGE_NEW_POST_TEXT = "profilePage/{PostWallConteiner}/ON-CHANGE-NEW-POST-TEXT",
    ON_REMOVE_POST_HANDLER = "profilePage/{PostWallConteiner}/REMOVE-POST",
    SET_POST_ITEM_AC = "profilePage/{PostWallConteiner}/SET-POST-ITEM-AC",

    //Settings
    TOGGLE_IS_FETCHING = 'GlobalConfiguration/TOGGLIE_IS_FETCHING',
}

//ProfileActionCreater


const profilePageReducer = (state = ininitaialState, action: Action<ActionType>) => {

    switch (action.type) {
        //setStatus
        case ActionType.SET_STATUS: {
            return {
                ...state,
                status: action.payload
            }
        }


        //ProfileCase
        case ActionType.SET_PROFILE_USERS: {
            return {...state, profile: action.payload}
        }

        // PostsCase
        case ActionType.ADD_NEW_POST: {
            const newPost: ItemPostType = {
                id: v1(),
                fullName: "AnyName of Users",
                imgLikes: "https://img.icons8.com/material-outlined/48/000000/filled-like.png",
                counterLikes: 0,
                ImgPerson: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
                imgShare: "https://img.icons8.com/metro/52/000000/forward-arrow.png",
                imgBtnDeletePost: "https://img.icons8.com/ios/50/000000/delete-message.png",

                content: action.payload
            }
            return {...state, itemsPost: [newPost, ...state.itemsPost]}
            // state.itemsPost.unshift(newPost)
        }
        case ActionType.ON_CHANGE_NEW_POST_TEXT: {

            return {...state, messageForNewPost: action.payload}
        }
        case ActionType.SET_POST_ITEM_AC: {
            return {...state, itemsPost: [state.itemsPost, action.payload]}
        }
        case ActionType.ON_REMOVE_POST_HANDLER: {
            return {
                ...state,
                itemsPost: state.itemsPost.filter(t => t.id !== action.payload)
            }
        }

        //settingsCase
        case ActionType.TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.payload}
        }


    }
    return state
}

export const setUserProfile = (profile: profileType): Action<profileType> => ({
    type: ActionType.SET_PROFILE_USERS,
    payload: profile
})


//PostActionCreater
export const onAddNewPostHandler = (content: string): Action<string> => ({
    type: ActionType.ADD_NEW_POST,
    payload: content
})

export const onChangeTextPost = (content: string): Action<string> => ({
    type: ActionType.ON_CHANGE_NEW_POST_TEXT,
    payload: content
})

export const onRemovePostCreater = (id: string): Action<string> => ({
    type: ActionType.ON_REMOVE_POST_HANDLER,
    payload: id
})

export const setItemPostAC = (NewPosts: ItemPostType): Action<ItemPostType> => ({
    type: ActionType.SET_POST_ITEM_AC,
    payload: NewPosts
})


//Status
export const setStatus = (status: string): Action<string> => ({
    type: ActionType.SET_STATUS,
    payload: status
})

//settingsActionCreater
export const toggleIsFetching = (isFetching: boolean): Action<boolean> => ({
    type: ActionType.TOGGLE_IS_FETCHING,
    payload: isFetching
})


//thunk
export const getUserProfile = (userId: string) => {
    return async (dispatch: Dispatch) => {
        const response = await ProfileAPI.getProfile(userId);
        dispatch(setUserProfile(response.data))
    }
}

export const getStatus = (userId: string) => {
    return async (dispatch: Dispatch) => {
        const response = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: Dispatch) => {
        const response = await  ProfileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }

    }
}

export default profilePageReducer