import React from 'react'
import {connect} from "react-redux";
import SearchFriendsComponent from "./SearchFriendsComponent";
import {searchFriendType, setSearchFriendsAC} from "../../../../Store/MessagePage.Reducer";
import {Dispatch} from "redux";

const mapStateToProps = (state: {messagePage: {searchFriends: Array<searchFriendType> }}) => {
    return{
        searchFriends: state.messagePage.searchFriends
    }
}


const mapDispatchToProps = (dispatch : Dispatch) => {
    return{
        setSearch: (searchFriends: Array<searchFriendType>) => {
            dispatch(setSearchFriendsAC(searchFriends))
        },
    }
}


export default connect (mapStateToProps, mapDispatchToProps) (SearchFriendsComponent)