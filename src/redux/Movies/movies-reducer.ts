import moviesAPI, {responseMoviesData} from "../../api/movies-api";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {FormAction} from "redux-form";


const initialState = {
    data: [] as responseMoviesData[],
    error: '' as string,
    isFetching: false as boolean


}


export const actions = {
    setMoviesAC: (movies: Array<responseMoviesData>) => ({
        type: "SN/MOVIES/GET_MOVIES", movies
    } as const),
    nextPageAC: (page: number) => ({
        type: "SN/MOVIES/SET_PAGE", page
    } as const),
    setErrorAC: (error: string) => ({
        type: "SN/MOVIES/SET_ERROR", error
    } as const),
    setFetchingAC: (fetching: boolean) => ({
        type: "SN/MOVIES/SET_FETCHING", fetching
    } as const)

}

export const getMoviesTC = (title: string): ThunkType => async (dispatch) => {
    dispatch(actions.setFetchingAC(true))
    const res = await moviesAPI.searchFilmsByTitle(title)
    dispatch(actions.setMoviesAC(res.data.Search))
    dispatch(actions.setFetchingAC(false))

}


export const nextPageTC = (page: number, title: string): ThunkType => async (dispatch) => {
    const res = await moviesAPI.nextPage(page, title)
    dispatch(actions.nextPageAC(page))
    dispatch(actions.setMoviesAC(res.data.Search))
}


const MoviesReducer = (state = initialState,
                       action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/MOVIES/GET_MOVIES":
            return {...state, data: action.movies}
        case "SN/MOVIES/SET_PAGE":
            return {...state, data: [...state.data, ...state.data]}
        case "SN/MOVIES/SET_FETCHING":
            return {...state, isFetching: action.fetching}
        default:
            return state
    }

}


export default MoviesReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>