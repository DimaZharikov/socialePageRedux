import React from 'react'
import {NavLink, Redirect} from "react-router-dom";
import {itemsBackPropsToFriends} from "../../Store/API/API";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Store/Store";
import {stateProps as authProps} from "../../Store/Reducer with Include Selector/AuthRedirectWithHaederPage/Auth.Reducer";

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
const FriendsComponent: React.FunctionComponent<Props> = React.memo((
    {

        friends,
        pageSize,
        totalFriendCount,
        onPageChangeHandler,
        followingInProgress,
        followThunk,
        unfollowThunk,

    }) => {


    const auth = useSelector<AppRootStateType,authProps>(state => state.authentication);
    if (!auth.isAuth) return <Redirect  to = {'/logIn'} />

    const pageCount = Math.ceil(totalFriendCount / pageSize)
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }


    return (<div>
            <div>
                {/*for span will be active Classes. It will : className= { this.props.currentPage === p && style.selectedPage}*/}
                {
                    pages.map(p => {
                        return (
                            <span onClick={() => onPageChangeHandler(p)}>{p}</span>
                        )
                    })
                }
            </div>

            {
                friends.map(item => {
                    return (
                        <div key={item.id}>
                            <div>
                                <div>
                                    <NavLink to={'/profile/' + item.id}>
                                        <img
                                            src={item.photos.small != null ? item.photos.small : "https://img.icons8.com/ios-glyphs/100/000000/change-user-male.png"}
                                            alt=""/>
                                        {item.status ?
                                            <img
                                                src="https://img.icons8.com/color/12/000000/connection-status-on--v1.png"
                                                alt={'pictures'}/>
                                            : ''
                                        }
                                    </NavLink>
                                </div>
                                {item.followed ?
                                    <button disabled={followingInProgress.some(((id: number) => id === item.id))}
                                            onClick={() => {
                                                followThunk(item.id)
                                            }}>
                                        Followed</button>

                                    :
                                    <button disabled={followingInProgress.some(((id: number) => id === item.id))}
                                            onClick={() => {
                                                unfollowThunk(item.id)
                                            }}


                                    >Unfollowed</button>
                                }
                            </div>
                            <div>
                                <div>
                                    <h3>{item.name} {item.uniqueUrlName}</h3>
                                    <h4>{item.status}</h4>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
})

export default FriendsComponent;
