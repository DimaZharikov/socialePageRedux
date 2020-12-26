import React from 'react'
import {
    follow,
    friendsType,
    setCurrentPage,
    setFriend,
    toggleIsFetching,
    unFollow
} from "../../Store/FriendsPage.Reducer";

import axios from "axios";
import FriendsComponent from "./FriendsComponent";
import {connect} from "react-redux";

import Preloader from "../../common/preloader/Preloader";



interface Props {
    follow: (id: string) => void,
    unFollow: (id: string) => void,
    setFriend: (newFriends: friendsType) => void;
    friends: Array<friendsType>;
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
            {this.props.isFetching ? <Preloader/> : null}
            <FriendsComponent
                totalFriendCount={this.props.totalFriendCount}
                pageSize={this.props.pageSize}
                friends={this.props.friends}
                currentPage={this.props.currentPage}
                unFollow={this.props.unFollow}
                follow={this.props.follow}
                setFriend={this.props.setFriend}
                setCurrentPage={this.props.setCurrentPage}
                onPageChangeHandler={this.onPageChangeHandler}
            />
        </>
    }
}

const mapStateToProps = (state: { friendsPage: { friends: Array<friendsType>, pageSize: number, totalFriendCount: number, currentPage: number, isFetching: boolean } }) => {

    return {
        friends: state.friendsPage.friends,
        pageSize: state.friendsPage.pageSize,
        totalFriendCount: state.friendsPage.totalFriendCount,
        currentPage: state.friendsPage.currentPage,
        isFetching: state.friendsPage.isFetching
    }
}




export default connect(mapStateToProps, {
    follow,
    unFollow,
    setFriend,
    setCurrentPage,
    toggleIsFetching

})(FriendContainer)

