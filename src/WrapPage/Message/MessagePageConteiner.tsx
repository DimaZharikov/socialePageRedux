import React from 'react'
import SearchFriendsConteiner from "./Components/SerchFriend/SearchFriendsConteiner";
import MessageItemsConteiner from "./Components/MessageItems/MessageItemsConteiner";


interface props {

}

const MessagePageConteiner = (props: props) => {
    return(<div>
        <SearchFriendsConteiner />
        <MessageItemsConteiner />

    </div>)
}

export default MessagePageConteiner