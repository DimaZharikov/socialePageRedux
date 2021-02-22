import authReducer, {actions, initialState} from "./auth-reducer";

let state : typeof initialState


beforeEach((()=> {
    state = {
        userId: null,
        email: null,
        login: null,
        isAuth: false,
        captchaUrl: null
    }
}))



test('userId , email, and login should set', () => {
    const newState = authReducer(state, actions.setAuthUserData(2, 'anyEmail@mail.com', 'newLog', true ) )
    expect(newState.login).toBeDefined()
    expect(newState.login?.length).toBe(6)
    expect(newState.login).toEqual('newLog')
    expect(newState.email).toBeDefined()
    expect(newState.email).toEqual('anyEmail@mail.com')
    expect(newState.userId).toBeDefined()
    expect(newState.userId).toEqual(2)
    expect(newState.isAuth).toBeTruthy()

})

test ('captcha should make if password will wrong any time', () => {
    const newState = authReducer(state, actions.getCaptchaUrlSuccess('captcha'))
    expect(newState.captchaUrl).toBeDefined()
    expect(newState.captchaUrl?.length).toBe(7)
})