import React, {FunctionComponent} from 'react'
import {messageItemType, searchFriendType} from "../../Store/MessagePage.Reducer";

interface props {
    searchFriends : Array<searchFriendType>,
    setSearch: (searchFriends : Array<searchFriendType>)=> void


    messageItems: Array<messageItemType>,
    onRemoveDialogueItemsAC: (id: string) => void
    setMessage: (messageItems: Array<messageItemType>)=> void

}


const MessageComponent: FunctionComponent <props> = (props: props) => {
    return ( <div>

    </div>)
}

export default MessageComponent

