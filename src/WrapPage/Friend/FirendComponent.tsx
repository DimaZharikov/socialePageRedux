import React from 'react'
import {NavLink} from "react-router-dom";
import {itemsBackPropsToFriends} from "../../Store/API/API";


interface Props {
    friends: itemsBackPropsToFriends,
    followingInProgress: any,
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void

}

const FriendComponent: React.FC<Props> = ({
                                              friends,
                                              followingInProgress,
                                              followThunk,
                                              unfollowThunk

                                          }) => {
    return (<div>
        <div>
            <div>
                <NavLink to={'/profile/' + friends.id}>
                    <img
                        src={friends.photos.small != null ? friends.photos.small : "https://img.icons8.com/ios-glyphs/100/000000/change-user-male.png"}
                        alt=""/>
                    {friends.status ?
                        <img
                            src="https://img.icons8.com/color/12/000000/connection-status-on--v1.png"
                            alt={'pictures'}/>
                        : ''
                    }
                </NavLink>
            </div>
            {friends.followed ?
                <button disabled={followingInProgress.some(((id: number) => id === friends.id))}
                        onClick={() => {
                            followThunk(friends.id)
                        }}>
                    Followed</button>

                :
                <button disabled={followingInProgress.some(((id: number) => id === friends.id))}
                        onClick={() => {
                            unfollowThunk(friends.id)
                        }}


                >Unfollowed</button>
            }
        </div>
        <div>
            <div>
                <h3>{friends.name} {friends.uniqueUrlName}</h3>
                <h4>{friends.status}</h4>
            </div>

        </div>
    </div>)
}

export default FriendComponent