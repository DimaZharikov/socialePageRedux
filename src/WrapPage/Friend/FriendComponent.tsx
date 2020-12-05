import React, {FunctionComponent} from 'react'
import {friendsType, stateType} from "../../Store/FriendsPage.Reducer";

interface Props {
    follow: (id: string) => void,
    unFollowAC: (id: string) => void,
    setFriend: (newFriends: friendsType) => void
    friends: Array <friendsType>

}

const FriendComponent: FunctionComponent <Props>  = (props) => {




    return (<div>
            {
                props.friends.map(items => {
                    return (
                        <div key={items.id}>
                            <div>
                                <div>
                                    <img src={items.avatar} alt=""/>
                                    {items.online? <img src="https://img.icons8.com/color/12/000000/connection-status-on--v1.png"/> : '' }
                                </div>
                                {items.followed?
                                    <button onClick={ ()=> props.unFollowAC(items.id) }>Followed</button>
                                    :
                                    <button onClick={ ()=> props.follow(items.id) }>Unfollowed</button>
                                }
                            </div>
                            <div>
                                <div>
                                    <h3>{items.name} {items.secondName}</h3>
                                    <h4>{items.status}</h4>
                                </div>
                                <div>
                                    {items.location.country}
                                    {items.location.city}
                                </div>
                            </div>
                        </div>
                        )})
            }
        </div>

    )
}


export default FriendComponent;