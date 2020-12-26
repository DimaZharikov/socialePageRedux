import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import {ChangeFilterType, messageItemType} from "../../../../Store/MessagePage.Reducer";
import {NavLink} from "react-router-dom";

import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";




interface props {
    messageItems: Array<messageItemType>,
    onRemoveDialogueItemsAC: (id: string) => void,
    setMessage: (messageItems: Array<messageItemType>) => void
}

const MessageItemsComponent: React.FunctionComponent<props> = React.memo((props) => {
    console.log('changed')
// ChangeFiler --
    const [messages, setMessages] = useState<messageItemType[]>(props.messageItems);
    const [filter, setFilter]= useState<ChangeFilterType>('All');


        let filteredMessage = props.messageItems

    if (filter === 'Unread') {
        filteredMessage = filteredMessage.filter(m=> m.importantly === 'Unread');
    }

    if (filter === 'Important'){
        filteredMessage = filteredMessage.filter(m => m.importantly === 'Important')
    }




// -- ChangeFilter

    return <div>
        <div>
            <button onClick={()=> setFilter('All')} >All</button>
            <button onClick={()=> setFilter('Unread')} >Unread</button>
            <button onClick={()=> setFilter( 'Important')}>Important</button>
        </div>

        <div>
           {  filteredMessage.map((item) =>
               <div key={item.id}>
                       <div>
                           <div>
                               <img src={item.imgUrl} alt="avatar friend"/>
                           </div>
                           <div>
                               {item.profile_online ? 'online' : ''}
                           </div>
                       </div>

                       <div>
                           <div>
                               <div>
                                   {item.name}{item.secondName}
                               </div>
                               <div>
                                   {new Date().toLocaleTimeString()}
                                   <IconButton onClick={() => props.onRemoveDialogueItemsAC(item.id)}
                                               aria-label="delete" color="primary">
                                       <Delete/>
                                   </IconButton>
                               </div>
                           </div>
                           <div>
                               <NavLink exact to={`/WrapMessage${item.id}`}><p>{item.message}</p></NavLink>
                           </div>
                       </div>


                   </div>) }

       </div>

    </div>
})

export default MessageItemsComponent