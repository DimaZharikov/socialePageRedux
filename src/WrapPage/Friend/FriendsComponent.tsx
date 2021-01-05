import React from 'react'
import {friendsType} from "../../Store/FriendsPage.Reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {itemsBackPropsToFriends} from "../../Store/API/API";


interface Props {
    follow: (id: number) => void,
    unFollow: (id: number) => void,
    setFriend: (newFriends: Array<itemsBackPropsToFriends>) => void;
    friends: Array<itemsBackPropsToFriends>,
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
                                                src="https://img.icons8.com/color/12/000000/connection-status-on--v1.png" alt={'pictures'}/>
                                            : ''
                                        }
                                    </NavLink>
                                </div>
                                {item.followed ?
                                    <button onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0//follow/${item.id}`
                                            , {
                                                withCredentials: true,
                                                headers: {
                                                    "API-KEY": "5dff25b2-4fe3-496c-985e-2645be233da5"
                                                }
                                            })
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    unFollow(item.id)
                                                }
                                            })
                                    }}>
                                        Followed</button>

                                    :
                                    <button onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0//follow/${item.id}`,
                                            {}, {
                                                withCredentials: true,
                                                headers: {
                                                    "API-KEY": "5dff25b2-4fe3-496c-985e-2645be233da5"
                                                }
                                            })
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    follow(item.id)
                                                }
                                            })
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
