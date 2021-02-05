import {v1} from "uuid";
import {ProfileAPI} from "../../API/API";
import {AppRootStateType} from "../../Store";
import {ThunkDispatch} from 'redux-thunk'
import {stopSubmit} from "redux-form";


export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string | null
    large: string | null
}
export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
    aboutMe: string
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
    profile: null as profileType | null,
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
    SET_PHOTO_USERS = "https://social-network.samuraijs.com/api/1.0/profile/{PutResponse in ProfileComponent}/SET_PHOTO_USERS",
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


const profilePageReducer = (state = ininitaialState, action: Action<any>): StateProps => {

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
        case ActionType.SET_PHOTO_USERS: {
            return {...state, profile: {...state.profile, photos: action.payload} as profileType}
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



type setUserProfileType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: profileType): Action<profileType> => ({
    type: ActionType.SET_PROFILE_USERS,
    payload: profile
})


//PostActionCreater
type onAddNewPostHandlerType = ReturnType<typeof onAddNewPostHandler>
export const onAddNewPostHandler = (content: string): Action<string> => ({
    type: ActionType.ADD_NEW_POST,
    payload: content
})

type onChangeTextPostType = ReturnType<typeof onChangeTextPost>
export const onChangeTextPost = (content: string): Action<string> => ({
    type: ActionType.ON_CHANGE_NEW_POST_TEXT,
    payload: content
})

type onRemovePostCreaterType = ReturnType<typeof onRemovePostCreater>
export const onRemovePostCreater = (id: string): Action<string> => ({
    type: ActionType.ON_REMOVE_POST_HANDLER,
    payload: id
})

type setItemPostACType = ReturnType<typeof setItemPostAC>
export const setItemPostAC = (NewPosts: ItemPostType): Action<ItemPostType> => ({
    type: ActionType.SET_POST_ITEM_AC,
    payload: NewPosts
})


//Status
type setStatusType = ReturnType<typeof setStatus>
export const setStatus = (status: string): Action<string> => ({
    type: ActionType.SET_STATUS,
    payload: status
})

//settingsActionCreater
type toggleIsFetchingType = ReturnType<typeof toggleIsFetching>
export const toggleIsFetching = (isFetching: boolean): Action<boolean> => ({
    type: ActionType.TOGGLE_IS_FETCHING,
    payload: isFetching
})

type savePhotoSuccessType = ReturnType<typeof savePhotoSuccess>
export const savePhotoSuccess = (photos: photosType): Action<photosType> => ({
    type: ActionType.SET_PHOTO_USERS,
    payload: photos
})




//thunk

export const getUserProfile = (userId: number) => {
    return async (dispatch: ThunkDispatch<AppRootStateType, {} , ReturnActionType>) => {
        const response = await ProfileAPI.getProfile(userId);
        dispatch(setUserProfile(response.data))
    }
}

export const getStatus = (userId: number) => {
    return async (dispatch: ThunkDispatch<AppRootStateType, {} , ReturnActionType>) => {
        const response = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: ThunkDispatch<AppRootStateType, {} , ReturnActionType>) => {
        const response = await ProfileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }

    }
}

export const savePhoto = (file: File) => async (dispatch: ThunkDispatch<AppRootStateType, {} , ReturnActionType>) => {
    const res = await ProfileAPI.savePhoto(file)
    if (res.data.resultCode === 0) {
        dispatch(savePhotoSuccess(res.data.photos))
    }
}


export const saveProfile = (profile : profileType) => async (dispatch: ThunkDispatch<AppRootStateType, {} , ReturnActionType>)  => {
    const userId = profile.userId
    const res = await ProfileAPI.setProfile(profile)
    if (res.data.resultCode  === 0) {
        if (userId != null) {
            await dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: res.data.messages[0] }))
        return Promise.reject(res.data.messages[0])
    }

}

//types
type ReturnActionType = setUserProfileType  | onAddNewPostHandlerType  | onChangeTextPostType |
    onRemovePostCreaterType | setItemPostACType |setStatusType | toggleIsFetchingType
    | savePhotoSuccessType;






export default profilePageReducer

