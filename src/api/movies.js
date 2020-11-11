import {API_HOST, API_KEY} from '../utils/constants';


export function getMovieByIdApi(idMovie, LANG) {
    const url= `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`
    return fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((result)=>{
        return result;
    });
}

export function getVideoMovieApi(idMovie,LANG){
    const url=`${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`;
    console.log(url);
    return fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((result)=>{
        return result;
    });
}

export function getPopularMoviesApi(page=1, LANG) {
    const url=`${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;
    return fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((result)=>{
        return result;
    });
}

export function getTopRatedMoviesApi(page=1, LANG) {
    const url=`${API_HOST}/movie/top_rated?api_key=${API_KEY}&language=${LANG}&page=${page}`;
    return fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((result)=>{
        return result;
    });
}