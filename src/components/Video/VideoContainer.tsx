import {ChangeEvent, FC, memo, KeyboardEvent, useEffect, useState, useCallback} from "react";
import {Button, Input} from "antd"
import 'antd/dist/antd.css'
import style from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";

import {selectError, selectIsFetching, selectMoviesSearch} from "../../redux/Movies/movies-selector";
import DescOfSearch from "./DescOfSearch";
import {getMoviesTC, nextPageTC} from "../../redux/Movies/movies-reducer";
import Preloader from "../common/Preloader/Preloader";


const VideoContainer: FC = memo(() => {

    const searchingMovies = useSelector(selectMoviesSearch)
    const error = useSelector(selectError)
    const fetching = useSelector(selectIsFetching)

    const [searchName, setSearchName] = useState('');
    const [page, setPages] = useState<number>(2)
    const [disabled, setDisabled] = useState<boolean>(true)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(nextPageTC(1, searchName))


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


    const onSearchMoviesHandler = useCallback(() => {
        if (searchName.trim() !== '') {
            if (searchName !== '') {
                setDisabled(false)
                dispatch(getMoviesTC(searchName))

            }
        }
    },[searchName])




    const onChangeSearchName = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.currentTarget.value)
    }
    const onKeyPressHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (searchName !== '') {
            setDisabled(false)
            if (event.charCode === 13) {
                dispatch(getMoviesTC(searchName))
            }
        }

    }, [searchName])


    return (<div>

        <h3>Search by name:</h3>
        <span>
            <Input style={{padding: '0 24px', maxHeight: 280, maxWidth: 550}}
                   type="text" value={searchName}
                   onChange={onChangeSearchName}
                   onKeyPress={onKeyPressHandler}/>
            <Button onClick={onSearchMoviesHandler}
                    disabled={disabled}>Search</Button>
        </span>

        <div className = {style.container_desc}>
            {fetching ? <Preloader/> : null}
            {
                searchingMovies?.map((el) => {
                    return (<div  key = {el.imdbID} className={style.desc_items}>
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