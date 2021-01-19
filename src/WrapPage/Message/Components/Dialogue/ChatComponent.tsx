import React from 'react'
import {newMessProps} from "../../../../Store/Reducer with Include Selector/DialoguePageRedirect/DialoguePage.Reducer";

interface Props {
    chatField: Array<newMessProps>


}

const ChatComponent: React.FC <Props> = ({ chatField})=> {


    return <React.Fragment>

        {chatField.length === 0 ?
            <p>No messages yet</p>
            :
            <div>
                {
                    chatField.map(mess => {
                        return (<div key={mess.id}>
                            <p>{mess.text}</p>
                        </div>)
                    })
                }
            </div>
        }
    </React.Fragment>

}


export default ChatComponent