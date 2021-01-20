import React from 'react'
import {Redirect} from "react-router-dom";
import {itemsBackPropsToFriends} from "../../Store/API/API";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Store/Store";
import {stateProps as authProps} from "../../Store/Reducer with Include Selector/AuthRedirectWithHaederPage/Auth.Reducer";
import PaginatorComponent from "../../common/Paginator/PaginatorComponent";
import FriendComponent from "./FirendComponent";

interface Props {

    friends: Array<itemsBackPropsToFriends>,
    pageSize: number,
    totalFriendCount: number,
    currentPage: number,
    setCurrentPage: (pageNumber: number) => void
    onPageChangeHandler: (pageNumber: number) => void
    followingInProgress: any
    toggleFollowingProgress: (followingInProgress: boolean, friendsId: number) => void
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void

}

//setFriends - AC for .get from server searchFriends
const FriendsPageComponent: React.FunctionComponent<Props> = React.memo((
    {

        friends,
        pageSize,
        totalFriendCount,
        onPageChangeHandler,
        followingInProgress,
        followThunk,
        unfollowThunk,
        currentPage

    }) => {

    const auth = useSelector<AppRootStateType, authProps>(state => state.authentication);
    if (!auth.isAuth) return <Redirect to={'/logIn'}/>


    return (<div>
        <PaginatorComponent pageSize={pageSize}
                            totalFriendCount={totalFriendCount}
                            onPageChangeHandler={onPageChangeHandler}
                            currentPage={currentPage}
        />

        {
            friends.map(item => {
                return (<div key={item.id}>
                    <FriendComponent friends={item}
                                     followingInProgress={followingInProgress}
                                     followThunk={followThunk}
                                     unfollowThunk={unfollowThunk}
                    />

                </div>)
            })
        }

    </div>)

})

export default FriendsPageComponent;
