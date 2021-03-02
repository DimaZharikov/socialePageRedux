import axios from "axios";


const key = '?apikey=995f97b1';

const moviesInstance = axios.create(
    {
        baseURL: `http://www.omdbapi.com/`,
        withCredentials: true
    }
)

export const moviesAPI = {
    searchFilmsByTitle(title: string) {
        return moviesInstance.get(`${key}&s=${title}`)
    },
    getFilmById(id: string){
        return moviesInstance.get (`${key}&i=${id}`)
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

export type responseMovieByTitle ={
    Title: string,
    Year: string,
   Rated: string,
   Released: string,
   Runtime: string,
   Genre: string,
   Director: string,
   Writer: string,
   Actors: string,
   Plot: string,
   Language: string,
   Country: string,
   Awards: string,
   Poster: string,
   Ratings: [
        {
            Source: string,
            Value: string
        },
        {
            Source: string,
            Value: string
        },
        {
            Source: string,
            Value: string
        }
    ],
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbID: string,
    Type: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: string
}


export default moviesAPI;