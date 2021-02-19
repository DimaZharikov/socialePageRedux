import {ChangeEvent, FC, memo, useCallback, useEffect, useState} from "react";
import {Button, Input} from "antd"
import 'antd/dist/antd.css'
import {useDispatch, useSelector} from "react-redux";

import {selectError, selectIsFetching, selectMoviesSearch} from "../../redux/Movies/movies-selector";
import DescOfSearch from "./DescOfSearch";
import {getMoviesTC, nextPageTC} from "../../redux/Movies/movies-reducer";


const VideoContainer: FC = memo(() => {

    const searchingMovies = useSelector(selectMoviesSearch)
    const error = useSelector(selectError)
    const fetching = useSelector(selectIsFetching)

    const [searchName, setSearchName] = useState('');
    const [page, setPages] = useState<number>(2)
    const dispatch = useDispatch()

    useEffect(() => {
        if (searchName !== '') {
            dispatch(nextPageTC(1, searchName))
        }

    }, [])

    const onScrollHandler = (e: any) => {
        if ((e.target.documentElement.scrollHeight) - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            if (!fetching) {
                dispatch(nextPageTC(page, searchName))
                setPages((p) => {
                        return p + 1
                    }
                )
            }


        }
    }

    useEffect(() => {
        document.addEventListener('scroll', onScrollHandler)
        return function () {
            document.removeEventListener('scroll', onScrollHandler)
        }
    }, [onScrollHandler])


    const onSearchMoviesHandler = () => {

        dispatch(getMoviesTC(searchName))
    }

    const onChangeSearchName = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.currentTarget.value)
    }

    return (<div>
        <h3>Search by name:</h3>
        <span>
            <Input style={{padding: '0 24px', maxHeight: 280, maxWidth: 550}}
                   type="text" value={searchName}
                   onChange={onChangeSearchName}/>
            <Button onClick={onSearchMoviesHandler}>Search</Button>
        </span>
        <h1>{error && error}</h1>
        <div>
            {
                searchingMovies?.map(el => {
                    return (<div key={el.imdbID}>
                        <DescOfSearch
                            searchingBlock={el}
                        />
                    </div>)
                })
            }
        </div>
    </div>)
})


export default VideoContainer