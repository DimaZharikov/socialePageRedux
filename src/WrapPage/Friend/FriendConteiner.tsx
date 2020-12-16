import React from 'react'
import {connect, useDispatch} from "react-redux";

import {followAC, friendsType, setCurrentPageAC, setFriendAC, unFollowAC} from "../../Store/FriendsPage.Reducer";
import FriendComponent from "./FriendComponent";
import {Dispatch} from "redux";




    const mapStateToProps = (  state: { friendsPage: {friends: [], pageSize: number, totalFriendCount: number, currentPage: number }  } ) => {

    return {
        friends: state.friendsPage.friends,
        pageSize: state.friendsPage.pageSize,
        totalFriendCount: state.friendsPage.totalFriendCount,
        currentPage: state.friendsPage.currentPage
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
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (FriendComponent)