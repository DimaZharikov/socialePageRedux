import React from 'react'
import {
    followThunk,
    getFriendsThunk,
    setCurrentPage,
    toggleFollowingProgress,
    toggleIsFetching,
    unfollowThunk
} from "../../Store/Reducer with Include Selector/FriendsPage/FriendsPage.Reducer";


import FriendsPageComponent from "./FriendsPageComponent";
import {connect} from "react-redux";

import Preloader from "../../common/preloader/Preloader";
import {itemsBackPropsToFriends} from "../../Store/API/API";
import {compose} from "redux";


interface Props {

    friends: Array<itemsBackPropsToFriends>,
    pageSize: number,
    totalFriendCount: number,
    currentPage: number,
    setCurrentPage: (pageNumber: number) => void,
    toggleIsFetching: (isFetching: boolean) => void,
    isFetching: boolean,
    followingInProgress: any,
    toggleFollowingProgress: (isFetching: boolean, friendsId: number) => void,
    getFriendsThunk: (pageSize: number, currentPage: number) => void,
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void


}

class FriendContainer extends React.Component<Props> {

    componentDidMount() {
        this.props.getFriendsThunk(this.props.pageSize, this.props.currentPage)

    }

    onPageChangeHandler = (pageNumber: number) => {
        this.props.getFriendsThunk(this.props.pageSize, pageNumber)
    }

    render() {
        return <React.Fragment>
            {this.props.isFetching ? <Preloader/> : null}
            <FriendsPageComponent
                totalFriendCount={this.props.totalFriendCount}
                pageSize={this.props.pageSize}
                friends={this.props.friends}
                currentPage={this.props.currentPage}

                setCurrentPage={this.props.setCurrentPage}
                onPageChangeHandler={this.onPageChangeHandler}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                followThunk={this.props.followThunk}
                unfollowThunk={this.props.unfollowThunk}

            />
        </React.Fragment>
    }
}

const mapStateToProps = (state: {
    friendsPage: {
        friends: Array<itemsBackPropsToFriends>, pageSize: number,
        totalFriendCount: number, currentPage: number, isFetching: boolean, followingInProgress: Array<number>
    }

}) => {

    return {
        friends: state.friendsPage.friends,
        pageSize: state.friendsPage.pageSize,
        totalFriendCount: state.friendsPage.totalFriendCount,
        currentPage: state.friendsPage.currentPage,
        isFetching: state.friendsPage.isFetching,
        followingInProgress: state.friendsPage.followingInProgress
    }
}

//
// const mapStateToProps = (state: AppRootStateType) => {
//     return {
//         friends : selectFriend(state),
//         pageSize: selectPageSize(state),
//         totalFriendCount:  selectTotalFriendCount(state),
//         currentPage: selectCurrentPage(state),
//         IsFetching: selectIsFetching(state),
//         followingInProgress: selectFollowingInProgress(state)
//     }
// }



export default compose<React.ComponentType> (connect(mapStateToProps, {

    setCurrentPage,
    toggleIsFetching,
    toggleFollowingProgress,
    getFriendsThunk,
    followThunk,
    unfollowThunk})) (FriendContainer)


