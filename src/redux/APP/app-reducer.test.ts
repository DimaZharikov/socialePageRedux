import appReducer, {actions, initialState} from "./app-reducer"


let state : typeof initialState;


beforeEach(()=> {
    state ={
        initialized: false
    }
});

test('initialized should be changed on true', ()=> {
    const newState = appReducer(state, actions.initializedSuccess())
    expect(newState.initialized).toBeTruthy()
})