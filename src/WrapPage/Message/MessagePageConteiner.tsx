import React, {useState} from 'react'
import SearchFriendsConteiner from "./Components/SerchFriend/SearchFriendsConteiner";
import MessageItemsConteiner from "./Components/MessageItems/MessageItemsConteiner";
import {ChangeFilterType} from "../../Store/MessagePage.Reducer";



interface props {

}



const MessagePageConteiner = (props: props) => {



    return(<div>
        <SearchFriendsConteiner />

        <MessageItemsConteiner  />

    </div>)
}

export default MessagePageConteiner