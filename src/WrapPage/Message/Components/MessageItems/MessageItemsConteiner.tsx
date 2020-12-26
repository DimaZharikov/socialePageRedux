import React from 'react'
import {connect} from "react-redux";
import MessageItemsComponent from "./MessageItemsComponent";
import {messageItemType, onRemoveDialogueItemsAC, setMessageItemsAC} from "../../../../Store/MessagePage.Reducer";
import {Dispatch} from "redux";


const mapStateToProps = (state: {messagePage: {messageItems: Array<messageItemType>}}) => {
    return{
        messageItems: state.messagePage.messageItems
    }
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return{
        onRemoveDialogueItemsAC: (id: string) => {
            dispatch(onRemoveDialogueItemsAC(id))
        },


        setMessage: (messageItems: Array<messageItemType>) => {
            dispatch(setMessageItemsAC(messageItems))
        }
    }
}



export default connect (mapStateToProps, mapDispatchToProps) (MessageItemsComponent)