import React from 'react'
import {connect} from "react-redux";
import {
     ItemPostType,
    onAddNewPostHandler,
    onChangeTextPost,
    onRemovePostCreater, setItemPostAC,
} from "../../../Store/Reducer with Include Selector/ProfilePage/Profile.Reducer";
import PostWallComponent from "./PostWallComponent";
import {Dispatch} from "redux";



const mapStateToProps  = (state:{profilePage:{itemsPost: Array <ItemPostType>,messageForNewPost: string } } ) => {
    return {
        itemsPost: state.profilePage.itemsPost,
        messageForNewPost : state.profilePage.messageForNewPost
    }
}

const mapDispatchToProps = (dispatch : Dispatch) => {
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


