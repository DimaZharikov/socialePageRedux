import React from 'react'
import {connect} from "react-redux";

import {followAC, friendsType, setFriendAC,  unFollowAC} from "../../Store/FriendsPage.Reducer";
import FriendComponent from "./FriendComponent";
import {Dispatch} from "redux";



    const mapStateToProps = (state: {friendsPage:{friends: Array<friendsType>}}) => {

    return {
        friends: state.friendsPage.friends
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return{
        follow: (userId: string) => {
           dispatch(followAC(userId))
        },

        unFollowAC: (userId: string) => {
            dispatch(unFollowAC(userId))
        },

        setFriend: (newFriends: friendsType) => {
            dispatch(setFriendAC(newFriends))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (FriendComponent)