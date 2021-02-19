import {FC} from "react";
import {responseMoviesData} from "../../api/movies-api";


type descOfSearchProps  = {
    searchingBlock: responseMoviesData
}


const DescOfSearch : FC <descOfSearchProps> = ({
                                                   searchingBlock
                                               }) => {
    return <div>
        <div>
            <img src={searchingBlock.Poster} alt="there was Poster"/>
        </div>
        <div>
            <h2>{searchingBlock.Title}</h2>
            <h3>{searchingBlock.Year}</h3>
            <p>{searchingBlock.Type}</p>
        </div>
    </div>
}

export default DescOfSearch