import React from 'react'
import {connect} from "react-redux";
import {
    ActionType, ItemPostType,
    onAddNewPostHandler,
    onChangeTextPost,
    onRemovePostCreater, setItemPostAC,
    StateProps
} from "../../../Store/postWall.reducer";
import PostWallComponent from "./PostWallComponent";
import {Dispatch} from "redux";



let mapStateToProps  = (state:StateProps ) => {
    return {
        itemsPost: state.itemsPost,
        messageForNewPost : state.messageForNewPost
    }
}

let mapDispatchToProps = (dispatch : Dispatch) => {
    return{
        onAddNewPostHandler: (content: string) => {
            dispatch(onAddNewPostHandler(content))
        },
        onChangeTextPost: (content:string) => {
            dispatch(onChangeTextPost(content))
        },
        onRemovePostCreater:(id:string) => {
            dispatch(onRemovePostCreater(id))
        },
        setItemPostAC: (newPosts: ItemPostType) => {
            dispatch(setItemPostAC(newPosts))
        }

    }
}


export default connect (mapStateToProps, mapDispatchToProps) (PostWallComponent)


