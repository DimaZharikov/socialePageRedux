import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {FormAction} from "redux-form/lib/actions";
import moviesAPI, {responseMovieByTitle, responseMoviesData} from "../../api/movies-api";


const initialState = {
    data: null as responseMovieByTitle | null


}


export const actions = {
    setMovieByIdAC: (movie: responseMovieByTitle) => ({
        type: "SN/MOVIE_ID_COMPONENT/setMovieByIdAC", movie
    } as const),

}

export const getMovieByID = (id: string) : ThunkType => async(dispatch) => {
    const res = await moviesAPI.getFilmById(id)
    console.log(res)
        dispatch(actions.setMovieByIdAC(res.data))

}



const MoviesByIdReducer = (state = initialState,
                       action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/MOVIE_ID_COMPONENT/setMovieByIdAC":
            return { ...state, data: action.movie}
        default:
            return state
    }

}


export default MoviesByIdReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>