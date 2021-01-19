import {AppRootStateType} from "../../Store";
import {createSelector} from "reselect";
import {itemsBackPropsToFriends} from "../../API/API";


export const selectFriend = (state: AppRootStateType) => {
    return state.friendsPage.friends.map(fr => fr.followed)
}
//
//
//
// export const selectGetFriends = createSelector(getFriendsSelector, (users: Array<itemsBackPropsToFriends> )=> {
//     getFriendsSelector.filter(u => true)
// })

export const selectPageSize = (state: AppRootStateType) =>  {
    return state.friendsPage.pageSize
};
export const selectTotalFriendCount = (state: AppRootStateType) =>  {
    return state.friendsPage.totalFriendCount
};
export const selectCurrentPage = (state: AppRootStateType) =>  {
    return state.friendsPage.currentPage
};
export const selectIsFetching = (state: AppRootStateType) =>  {
    return state.friendsPage.isFetching
};
export const selectFollowingInProgress = (state: AppRootStateType) =>  {
    return state.friendsPage.followingInProgress
};
