import {AppStateType} from "../redux-store";


export const selectMoviesSearch = (state: AppStateType) => {
    return state.movies.data
}

export const selectError = (state: AppStateType) => {
    return state.movies.error
}
