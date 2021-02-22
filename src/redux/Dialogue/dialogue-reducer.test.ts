import dialogsReducer, {actions,DialogType, initialState, MessageType} from './dialogs-reducer'

let state : typeof initialState


beforeEach(() => {
   state ={
       dialogs: [
           {id: 1, name: 'Dimych'},
           {id: 2, name: 'Andrew'},
          ] as Array<DialogType>,
       messages: [
           {id: 1, message: 'Hi'},
           {id: 2, message: 'How is your it-kamasutra?'},
       ] as Array<MessageType>
   }

})


test ('messages should me add', () => {
    let newState = dialogsReducer(state, actions.sendMessage('newMessage'))
    const key = Object.keys(newState)
    const newKey = key.find( k => k != '1' && k != '2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect (key.length).toBe(2)

})