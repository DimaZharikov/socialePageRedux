import axios from 'axios';
import React, {ChangeEvent} from 'react'
import {friendsType} from "../../Store/FriendsPage.Reducer";


interface Props {
    follow: (id: string) => void,
    unFollowAC: (id: string) => void,
    setFriend: (newFriends: friendsType) => void;
    friends: Array<friendsType>,
    pageSize: number,
    totalFriendCount: number,
    currentPage: number,
    setCurrentPage: (pageNumber: number) => void


}

class FriendComponent extends React.Component<Props> {


    componentDidMount() {
        if (this.props.friends.length === 0) {

            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then
            (response => {
                this.props.setFriend(response.data.items)
            })
        }
    }

    onPageChangeHandler = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then
        (response => {
            this.props.setFriend(response.data.items)
        })
    }

    render() {
        debugger
        const pageCount = Math.ceil(this.props.totalFriendCount / this.props.pageSize)
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

                            <span onClick={() => this.onPageChangeHandler(p)}>{p}</span>
                        )
                    })
                }
            </div>


            {
                this.props.friends.map(items => {
                    return (

                        <div key={items.id}>
                            <div>
                                <div>
                                    <img
                                        src={items.photos.small != null ? items.photos.small : "https://img.icons8.com/ios-glyphs/100/000000/change-user-male.png"}
                                        alt=""/>
                                    {items.status ?
                                        <img src="https://img.icons8.com/color/12/000000/connection-status-on--v1.png"/>
                                        : ''
                                    }

                                </div>
                                {items.followed ?
                                    <button onClick={() => this.props.unFollowAC(items.id)}>Followed</button>
                                    :
                                    <button onClick={() => this.props.follow(items.id)}>Unfollowed</button>
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
        </div>)
    }


}


export default FriendComponent;