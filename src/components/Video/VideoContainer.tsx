import {FC, useState, memo, ChangeEvent, useCallback} from "react";
import moviesAPI, {responseMoviesData} from "../../api/movies-api";
import {Button, Input}  from "antd"
import 'antd/dist/antd.css'
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../../redux/Movies/movies-reducer";
import {selectError, selectMoviesSearch} from "../../redux/Movies/movies-selector";
import {AppStateType} from "../../redux/redux-store";




const VideoContainer :FC  = memo(() =>  {

    const searchingMovies = useSelector(selectMoviesSearch)
    const error = useSelector (selectError)

    const [searchName, setSearchName] = useState('');
    const dispatch = useDispatch()


   const onSearchMoviesHandler = () => {
        dispatch (getMovies(searchName))
   }

   const onChangeSearchName = useCallback((event : ChangeEvent<HTMLInputElement>) => {
       setSearchName(event.currentTarget.value)
   },[setSearchName])

    return (<div>
        <h3>Search by name:</h3>
        <div>
            <Input style={{padding: '0 24px', maxHeight: 280, maxWidth: 550}}
                   type="text" value={searchName}
                   onChange={onChangeSearchName}/>
            <Button onClick={onSearchMoviesHandler}>Search</Button>
        </div>
                        <h1>{error && error}</h1>
        <div>
            {
                searchingMovies?.map(el => {
                    return (<div key = {el.imdbID}>
                        <div>
                            <img src={el.Poster} alt="poster"/>
                        </div>
                        <div>
                            <h2>{el.Title}</h2>
                            <h3>{el.Year}</h3>
                            <p>{el.Type}</p>
                        </div>
                    </div>)
                })
            }
        </div>
    </div>)
})







export default VideoContainer