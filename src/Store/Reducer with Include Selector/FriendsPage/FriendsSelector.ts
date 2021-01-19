import {AppRootStateType} from "../../Store";

export const getFriends = (state: AppRootStateType) =>  {
    return state.friendsPage.friends
};
export const getPageSize = (state: AppRootStateType) =>  {
    return state.friendsPage.pageSize
};
export const getTotalFriendCount = (state: AppRootStateType) =>  {
    return state.friendsPage.totalFriendCount
};
export const getCurrentPage = (state: AppRootStateType) =>  {
    return state.friendsPage.currentPage
};
export const getIsFetching = (state: AppRootStateType) =>  {
    return state.friendsPage.isFetching
};
export const getFollowingInProgress = (state: AppRootStateType) =>  {
    return state.friendsPage.followingInProgress
};
