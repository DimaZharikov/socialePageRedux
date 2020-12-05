import React from 'react'
import {connect} from "react-redux";
import MessageItemsComponent from "./MessageItemsComponent";
import {messageItemType, onRemoveDialogueItemsAC, setMessageItemsAC} from "../../../../Store/MessagePage.Reducer";
import {Dispatch} from "redux";


let mapStateToProps = (state: {messagePage: {messageItems: Array<messageItemType>}}) => {
    return{
        messageItems: state.messagePage.messageItems
    }
}

let matDispatchToProps = (dispatch : Dispatch) => {
    return{
        onRemoveDialogueItemsAC: (id: string) => {
            dispatch(onRemoveDialogueItemsAC(id))
        },


        setMessage: (messageItems: Array<messageItemType>) => {
            dispatch(setMessageItemsAC(messageItems))
        }
    }
}



export default connect (mapStateToProps, matDispatchToProps) (MessageItemsComponent)