import {v1} from "uuid";


export type ItemPostType = {
    id: string,
    person:{name: string, secondName: string},
    imgLikes: string,
    ImgPerson: string,
    imgShare: string,
    imgBtnDeletePost: string,
    time: string,
    content: string,
    counterLikes: number

}

export interface StateProps{
    messageForNewPost : string,
    itemsPost : Array <ItemPostType>
}


let ininitaialState: StateProps = {

    messageForNewPost: '',
    itemsPost: [
        {
            id: v1(),
            person: {name: 'Dima ', secondName: 'Zharikov'},
            imgLikes: "https://img.icons8.com/material-outlined/48/000000/filled-like.png",
            counterLikes: 0,
            ImgPerson: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
            imgShare: "https://img.icons8.com/metro/52/000000/forward-arrow.png",
            imgBtnDeletePost: "https://img.icons8.com/ios/50/000000/delete-message.png",
            time: '12:13',
            content: 'AnyMessagePost'
        }
    ]
}



export interface Action<T> {
    type: string,
    payload: T
}

export enum ActionType {
    ADD_NEW_POST = 'ADD-NEW-POST-ITEM',
    ON_CHANGE_NEW_POST_TEXT = "ON-CHANGE-NEW-POST-TEXT",
    ON_REMOVE_POST_HANDLER = "REMOVE-POST",
    SET_POST_ITEM_AC = "SET-POST-ITEM-AC"
}


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

export const setItemPostAC = (NewPosts: ItemPostType): Action<ItemPostType>=> ({
    type: ActionType.SET_POST_ITEM_AC,
    payload: NewPosts
})

const postWallReducer = (state = ininitaialState, action: Action<ActionType>) => {


    switch (action.type) {

        case ActionType.ADD_NEW_POST: {
            const newPost: ItemPostType = {
                id: v1(),
                person: {name: 'Dima', secondName: 'Zharikov'},
                imgLikes: "https://img.icons8.com/material-outlined/48/000000/filled-like.png",
                counterLikes: 0,
                ImgPerson: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
                imgShare: "https://img.icons8.com/metro/52/000000/forward-arrow.png",
                imgBtnDeletePost: "https://img.icons8.com/ios/50/000000/delete-message.png",
                time: '12:13',
                content: action.payload
            }
            state.itemsPost.unshift(newPost)
        }
            return state

        case ActionType.ON_CHANGE_NEW_POST_TEXT: {
            state.messageForNewPost = action.payload
            return state
        }


        case ActionType.SET_POST_ITEM_AC:{
            return {...state, itemsPost: [state.itemsPost,action.payload]}


        }

        case ActionType.ON_REMOVE_POST_HANDLER: {
            return {
                ...state,
                itemsPost: state.itemsPost.filter(itms=> {
                    if(itms.id !== action.payload){
                        return {...itms, state}
                    }
                    return itms
                })

            }
        }



    }
    return state
}


export default postWallReducer