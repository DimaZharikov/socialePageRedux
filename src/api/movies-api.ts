import axios from "axios";


const key = '?apikey=995f97b1';

const moviesInstance = axios.create(
    {
        baseURL: `http://www.omdbapi.com/`,
    }
)

export const moviesAPI = {
    searchFilmsByTitle(title: string) {
        return moviesInstance.get(`${key}&s=${title}`)
    },
    nextPage(page : number, title: string) {
        return moviesInstance.get(`${key}&s=${title}&page=${page}`  )
    },
}



export type  responseMoviesData= {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string
}


export default moviesAPI;