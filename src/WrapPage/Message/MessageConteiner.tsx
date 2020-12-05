import React from 'react';
import {connect} from "react-redux";
import {
    messageItemType,
    onRemoveDialogueItemsAC,
    searchFriendType, setMessageItemsAC,
    setSearchFriendsAC
} from "../../Store/MessagePage.Reducer";
import {Dispatch} from "redux";
import MessageComponent from "./MessageComponent";




let mapStateToProps = (state:{messagePage:{
        searchFriends: Array<searchFriendType>,
        messageItems: Array<messageItemType>
    }} ) => {
    return {
        searchFriends: state.messagePage.searchFriends,
        messageItems: state.messagePage.messageItems
    }
}


let mapDispatchToProps = (dispatch : Dispatch) => {
    return{
        onRemoveDialogueItemsAC: (id: string) => {
            dispatch(onRemoveDialogueItemsAC(id))
        },

        setSearch: (searchFriends: Array<searchFriendType>) => {
            dispatch(setSearchFriendsAC(searchFriends))
        },
        setMessage: (messageItems: Array<messageItemType>) => {
            dispatch(setMessageItemsAC(messageItems))
        }


    }
}

export default connect (mapStateToProps, mapDispatchToProps) (MessageComponent)