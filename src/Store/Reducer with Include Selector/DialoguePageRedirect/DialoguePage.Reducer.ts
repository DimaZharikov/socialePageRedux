import {v1} from "uuid";

export interface newMessProps {
    id: string,
    text: string
}


export interface stateProps {
    chatField: Array<newMessProps>

}

const initialState: stateProps = {
    chatField: [    ],
}

export enum ActionType {
    ADD_CHAT_MESSAGE= 'route_dialogue/userId?'
}


interface Action<T> {
    type: ActionType,
    payload: T
}

export const addNewMessage = (dialogueBody:  string): Action<string> => ({
    type: ActionType.ADD_CHAT_MESSAGE,
    payload: dialogueBody
})


const dialoguePageReducer = (state = initialState, action: Action<any>) => {
    switch (action.type) {
        case ActionType.ADD_CHAT_MESSAGE: {
            const newMess: newMessProps ={
                id: v1(),
                text: action.payload
            }
            return {
                ...state, chatField: [newMess, ...state.chatField]
             }


        }
    }
    return state
}
export default dialoguePageReducer