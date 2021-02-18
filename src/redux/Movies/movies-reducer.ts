import {ThunkDispatch} from "redux-thunk";
import moviesAPI, {responseMoviesData} from "../../api/movies-api";
import {AppStateType} from "../redux-store";


export type moviesType = {
    data: responseMoviesData[] | null,
    error?: string


}


const initialState: moviesType = {
    data: null,


}


//Type
export enum ActionType {
    SET_SEARCH_MOVIES = "SN/MOVIES/SET_SEARCH_MOVIES",
    SET_ERROR = "SN/MOVIES/SET_ERROR"

}


//actions

interface Action<T> {
    type: ActionType,
    payload: T

}

export const setMovies = (movies: Array<responseMoviesData>): Action<Array<responseMoviesData>> => ({
    type: ActionType.SET_SEARCH_MOVIES,
    payload: movies
})

export const setError = (error: string | undefined): Action<string | undefined> => ({
    type: ActionType.SET_ERROR,
    payload: error
})

//thunk

export const getMovies = (title: string) => async (dispatch: ThunkDispatch<AppStateType, {}, TypeActions>) => {
     let res = await moviesAPI.searchFilmsByTitle(title)
    console.log(res)
        if (res.data.Response === 'true') {

            dispatch(setMovies(res.data.Search))
        } else (setError(res.data.Error))


}


const MoviesReducer = (state = initialState,
                       action: Action<responseMoviesData[] & string>): moviesType => {
    switch (action.type) {
        case ActionType.SET_SEARCH_MOVIES:
            return {
                ...state, data: action.payload
            };
            debugger
        case ActionType.SET_ERROR:
            return {...state, error: action.payload}

        default:
            return state
    }

}

type  TypeActions = ReturnType<typeof setMovies> | ReturnType<typeof setError>

export default MoviesReducer

