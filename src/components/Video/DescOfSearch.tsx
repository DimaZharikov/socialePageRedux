import React, {FC} from "react";
import {responseMoviesData} from "../../api/movies-api";
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getMovieByID} from "../../redux/Movies/moviesById-reducer";
import style from './styles.module.scss';

type descOfSearchProps = {
    searchingBlock: responseMoviesData
}


const DescOfSearch: FC<descOfSearchProps> = ({
                                                 searchingBlock
                                             }) => {

    const dispatch = useDispatch()
    const onChangePageByIdHandler = () => {
        dispatch(getMovieByID(searchingBlock.imdbID))
    }
    return <div className = {style.desc_item}>
        <div>
            <img src={searchingBlock.Poster} alt="there was Poster"/>
        </div>
        <div>
            <NavLink   to={`/movieByTitle/${searchingBlock.imdbID}`} onClick={onChangePageByIdHandler}>
                <h2 >{searchingBlock.Title}</h2>
            </NavLink>
        </div>
        <span>
            <h3>{searchingBlock.Year}</h3><p>{searchingBlock.Type}</p>
        </span>
    </div>
}

export default DescOfSearch