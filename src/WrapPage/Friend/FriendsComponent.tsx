import React from 'react'
import {friendsType} from "../../Store/FriendsPage.Reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";


interface Props {
    follow: (id: string) => void,
    unFollow: (id: string) => void,
    setFriend: (newFriends: friendsType) => void;
    friends: Array<friendsType>,
    pageSize: number,
    totalFriendCount: number,
    currentPage: number,
    setCurrentPage: (pageNumber: number) => void
    onPageChangeHandler: (pageNumber: number) => void

}

//setFriends - AC for .get from server searchFriends
const FriendsComponent: React.FunctionComponent<Props> = React.memo((
    {
        follow,
        unFollow,
        friends,
        pageSize,
        totalFriendCount,
        onPageChangeHandler
    }) => {


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
                friends.map(items => {
                    return (
                        <div key={items.id}>
                            <div>
                                <div>
                                    <NavLink to={'/profile/' + items.id}>
                                        <img
                                            src={items.photos.small != null ? items.photos.small : "https://img.icons8.com/ios-glyphs/100/000000/change-user-male.png"}
                                            alt=""/>
                                        {items.status ?
                                            <img
                                                src="https://img.icons8.com/color/12/000000/connection-status-on--v1.png" alt={'pictures'}/>
                                            : ''
                                        }
                                    </NavLink>
                                </div>
                                {items.followed ?
                                    <button onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0//follow/${items.id}`
                                            , {
                                                withCredentials: true,
                                                headers: {
                                                    "API-KEY": "5dff25b2-4fe3-496c-985e-2645be233da5"
                                                }
                                            })
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    unFollow(items.id)
                                                }
                                            })
                                    }}>
                                        Followed</button>

                                    :
                                    <button onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0//follow/${items.id}`,
                                            {}, {
                                                withCredentials: true,
                                                headers: {
                                                    "API-KEY": "5dff25b2-4fe3-496c-985e-2645be233da5"
                                                }
                                            })
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    follow(items.id)
                                                }
                                            })
                                    }}


                                    >Unfollowed</button>
                                }
                            </div>
                            <div>
                                <div>
                                    <h3>{items.name} {items.uniqueUrlName}</h3>
                                    <h4>{items.status}</h4>
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
