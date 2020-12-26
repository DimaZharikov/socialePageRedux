import React from 'react'
import SearchFriendsConteiner from "./Components/SerchFriend/SearchFriendsConteiner";
import MessageItemsConteiner from "./Components/MessageItems/MessageItemsConteiner";


interface Props {

}

const MessagePageAppComponent = (props: Props) => {
    return <>
        <SearchFriendsConteiner/>
        <MessageItemsConteiner/>
    </>
}



export default MessagePageAppComponent;