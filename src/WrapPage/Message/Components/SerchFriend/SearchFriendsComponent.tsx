import React, {ChangeEvent, FunctionComponent, useState} from 'react'
import {searchFriendType} from "../../../../Store/MessagePage.Reducer";
import {IconButton, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


interface props {

    onFilterFriends: (name: string) => void,
    searchFriends : Array<searchFriendType>,
    setSearch: (searchFriends : Array<searchFriendType>)=> void
}

const SearchFriendsComponent: FunctionComponent <props> = (props) => {

    const [isCollapsedFriend, setIsCollapsedFriend] = useState<boolean>(false)



    const ShowCollapsedFriend = ()=> setIsCollapsedFriend(!isCollapsedFriend)
    const onSearchChangeFilterKeyPress = (event: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) =>{

        props.onFilterFriends(event.currentTarget.value)
    }





    return(<div>
        <div>
            <div>
                <TextField onClick={ShowCollapsedFriend}
                            onBlur={ShowCollapsedFriend}

                           onChange = {(event)=> onSearchChangeFilterKeyPress(event)}
                id="standard-secondary" label="Faster search Friends" color="primary" />
            </div>

                <div>
                    <IconButton color = 'primary' > <SearchIcon /> </IconButton>
                </div>


        </div>

        {
            isCollapsedFriend && props.searchFriends.map( items => {
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