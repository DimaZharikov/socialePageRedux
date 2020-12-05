import React from 'react'
import {connect} from "react-redux";
import {
     ItemPostType,
    onAddNewPostHandler,
    onChangeTextPost,
    onRemovePostCreater, setItemPostAC,

} from "../../../Store/postWall.reducer";
import PostWallComponent from "./PostWallComponent";
import {Dispatch} from "redux";



let mapStateToProps  = (state:{postBlock:{itemsPost: Array <ItemPostType>,messageForNewPost: string } } ) => {
    return {
        itemsPost: state.postBlock.itemsPost,
        messageForNewPost : state.postBlock.messageForNewPost
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


