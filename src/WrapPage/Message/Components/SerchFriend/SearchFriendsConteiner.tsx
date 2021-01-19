import React from 'react'
import {connect} from "react-redux";
import SearchFriendsComponent from "./SearchFriendsComponent";
import {

    onSearchFriendsAC,
    searchFriendType,
    setSearchFriendsAC
} from "../../../../Store/Reducer with Include Selector/MessagePage/MessagePage.Reducer";
import {Dispatch} from "redux";

const mapStateToProps = (state: {messagePage: {searchFriends: Array<searchFriendType> }, searchInput: string}) => {
    return{

        searchFriends: state.messagePage.searchFriends
    }
}


const mapDispatchToProps = (dispatch : Dispatch) => {
    return{
        setSearch: (searchFriends: Array<searchFriendType>) => {
            dispatch(setSearchFriendsAC(searchFriends))
        },
        onFilterFriends: (name: string) => {
            dispatch(onSearchFriendsAC(name))
        },


    }
}


export default connect (mapStateToProps, mapDispatchToProps) (SearchFriendsComponent)