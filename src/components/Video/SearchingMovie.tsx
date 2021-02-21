import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {selectMovieById} from "../../redux/Movies/movies-selector";
import 'antd/dist/antd.css'
import style from './styles.module.scss'
import {getMovieByID} from "../../redux/Movies/moviesById-reducer";
import {Typography} from 'antd';

const {Title} = Typography;


const SearchingMovieDesc: FC = () => {

    const bodyMovieById = useSelector(selectMovieById)
    const dispatch = useDispatch()
    const {imdbID} = useParams<{ imdbID: string }>()

    useEffect(() => {
        dispatch(getMovieByID(imdbID))
    }, [])


    const RatingsMapped = bodyMovieById?.Ratings.map((items, index) => {
        return (<div key={index}>
            <Title level={4}>{items.Source} : {items.Value}</Title>
        </div>)
    })


    return (<div className={style.container}>
        <div>
            <img src={bodyMovieById?.Poster} alt="there was poster"/>
        </div>
        <div>
            <div>
                <Title level={1}> {bodyMovieById?.Title} - {bodyMovieById?.Country} ({bodyMovieById?.Year}) </Title>
                <Title level={3}>Genre: {bodyMovieById?.Genre}  </Title>
                <Title level={2}>Ratings : {RatingsMapped} </Title>
                <Title level={2}>Description : </Title>
                <ul>
                    <li><p>Released: {bodyMovieById?.Released}</p></li>
                    <li><p>Actors: {bodyMovieById?.Actors}</p></li>
                    <li><p>Runtime: {bodyMovieById?.Runtime}</p></li>
                    <li><p>Director:{bodyMovieById?.Director} </p></li>
                    <li><p>Plot:{bodyMovieById?.Plot} </p></li>
                    <li><p>Awards:{bodyMovieById?.Awards} </p></li>
                </ul>

            </div>


        </div>


    </div>)
}

export default SearchingMovieDesc



