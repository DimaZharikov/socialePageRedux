import MoviesReducer, {actions, initialState} from "./movies-reducer";
import {responseMoviesData} from "../../api/movies-api";


let state : typeof initialState


beforeEach(() => {
    state = {
        data: [] as responseMoviesData[],
        error: '' as string,
        isFetching: false as boolean
    }

})


test ('movies should be fined and added to state' , () => {
    const newState = MoviesReducer(state, actions.setMoviesAC([
        {imdbID: 'newId1', Poster: 'poster1 Img url', Title: 'newTittle1', Year: 'newYear1', Type: 'any Types1'},
        {imdbID: 'newId2', Poster: 'poster2 Img url', Title: 'newTittle2', Year: 'newYear2', Type: 'any Types2'},
        {imdbID: 'newId3', Poster: 'poster3 Img url', Title: 'newTittle3', Year: 'newYear3', Type: 'any Types3'},
    ]))

    expect(newState.data.length).toBe(3)
    expect(newState.data).toBeDefined()
    expect(newState.data).toEqual(newState.data)

})


test ('pages should be changed and changed moviesState', () => {
    const newState = MoviesReducer(state, actions.nextPageAC(2))

    expect (newState.data.length).toBe(0)
    expect (newState.data).toBeDefined()
    expect (newState.data).not.toBeFalsy()

})

test ('fetching must changed on true in calling', () => {
    const newState = MoviesReducer(state, actions.setFetchingAC(true))

    expect(newState.isFetching).toBeTruthy()
    expect(newState.isFetching).toBeDefined()

})

test ('error must be in state', () => {
    const newState = MoviesReducer(state, actions.setErrorAC('any Errors'))
    expect(newState.error).toBeDefined()
    expect(newState.error).toEqual("any Errors")
})