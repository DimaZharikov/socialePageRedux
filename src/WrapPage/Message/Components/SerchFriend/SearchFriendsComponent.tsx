import React, {ChangeEvent, useCallback, useState} from 'react'
import {searchFriendType} from "../../../../Store/MessagePage.Reducer";
import {TextField} from "@material-ui/core";


interface props {

    onFilterFriends: (name: string) => void,
    searchFriends : Array<searchFriendType>,
    setSearch: (searchFriends : Array<searchFriendType>)=> void
}

const SearchFriendsComponent: React.FunctionComponent <props> = ({onFilterFriends,searchFriends,setSearch}) => {

    const [isCollapsedFriend, setIsCollapsedFriend] = useState<boolean>(false)



    const ShowCollapsedFriend = useCallback(()=> setIsCollapsedFriend(!isCollapsedFriend),[isCollapsedFriend] )
    const onSearchChangeFilterKeyPress = useCallback((event: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) =>{

       onFilterFriends(event.currentTarget.value)
    },[])

    return(<div>
        <div>
            <div>
                <TextField onClick={ShowCollapsedFriend}
                            onBlur={()=>setIsCollapsedFriend(false)}
                           onChange = {(event)=> onSearchChangeFilterKeyPress(event)}
                            id="standard-secondary" label="Faster search Friends" color="primary" />
            </div>


        </div>

        {
            isCollapsedFriend && searchFriends.map( items => {
                return (
                    <div key = {items.id}>
                        <img src={items.img} alt="There was y Friend"/>
                        <p>{items.name}</p> <p>{items.secondName}</p>
                    </div>)
            })
        }
    </div>)
}

export default SearchFriendsComponent