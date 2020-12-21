import React from 'react'
import {
    followAC,
    friendsType,
    setCurrentPageAC,
    setFriendAC,
    toggleIsFetchingAC,
    unFollowAC
} from "../../Store/FriendsPage.Reducer";
import {Dispatch} from "redux";
import axios from "axios";
import FriendsComponent from "./FriendsComponent";
import {connect} from "react-redux";
import preloader  from './../../img/Ellipsis-4.2s-197px.svg';
import Preloader from "../../common/preloader/Preloader";






const mapStateToProps = (state: { friendsPage: { friends: Array<friendsType>, pageSize: number, totalFriendCount: number, currentPage: number, isFetching: boolean } }) => {

    return {
        friends: state.friendsPage.friends,
        pageSize: state.friendsPage.pageSize,
        totalFriendCount: state.friendsPage.totalFriendCount,
        currentPage: state.friendsPage.currentPage,
        isFetching: state.friendsPage.isFetching
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
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
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}


interface Props {
    follow: (id: string) => void,
    unFollowAC: (id: string) => void,
    setFriend: (newFriends: friendsType) => void;
    friends: Array <friendsType>;
    pageSize: number,
    totalFriendCount: number,
    currentPage: number,
    setCurrentPage: (pageNumber: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    isFetching: boolean


}

class FriendContainer extends React.Component<Props> {


    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setFriend(response.data.items)
            })

    }

    onPageChangeHandler = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then
        (response => {
            this.props.toggleIsFetching(false)
            this.props.setFriend(response.data.items)

        })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
        <FriendsComponent
            totalFriendCount={this.props.totalFriendCount}
            pageSize={this.props.pageSize}
            friends={this.props.friends}
            currentPage={this.props.currentPage}
            unFollowAC={this.props.unFollowAC}
            follow={this.props.follow}
            setFriend={this.props.setFriend}
            setCurrentPage={this.props.setCurrentPage}
            onPageChangeHandler={this.onPageChangeHandler}
        />
            </>
    }
}

export  default connect (mapStateToProps,mapDispatchToProps) (FriendContainer)

