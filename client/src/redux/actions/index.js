import axios from "axios";

//ACTIONS TYPE
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const GET_VIDEOGAME_DETAILS = 'GET_VIDEOGAME_DETAILS';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const DELETE_VIDEOGAME = 'DELETE_VIDEOGAME';
export const UPDATE_VIDEOGAME = 'UPDATE_VIDEOGAME';
export const FILER_BY_GENRES = 'FILER_BY_GENRES';
export const FILTER_BY_ASC_DESC = 'FILTER_BY_ASC_DESC';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const FILTER_BY_RAITING = 'FILTER_BY_RAITING';
export const CLEAR_CACHE_VIDEOGAME = 'CLEAR_CACHE_VIDEOGAME';
export const GET_NAME_VIDEOGAMES = 'GET_NAME_VIDEOGAMES';
export const CLEAR_CACHE = 'CLEAR_CACHE';

//ACTIONS

// cada actions va a retornar una funcion asincrona que tendra como parametro el dispatch, que despacha la accion requerida
export const getAllVideogames = () => {
  return async function(dispatch){
    try {
      const json = await axios.get('http://localhost:3001/videogames')
      return dispatch({type: GET_ALL_VIDEOGAMES, payload: json.data})
    } catch (error) {
      throw error
    }
  }
}

export const getAllGenres = () => {
  return async function(dispatch){
    try {
      const json = await axios.get('http://localhost:3001/genres')
      return dispatch({type: GET_ALL_GENRES, payload: json.data})
    } catch (error) {
      throw error
    }
  }
}

export const getNameVideogames = (name)=> {                //name === payload
  return async function(dispatch){
    try {
      const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
      return dispatch({type: GET_NAME_VIDEOGAMES, payload: json.data})
    } catch (error) {
      throw error
    }
  }
}

export const getVideogameDetail = (id) => {
  return async function(dispatch){
    try {
      const json = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({type: GET_VIDEOGAME_DETAILS, payload: json.data})
    } catch (error) {
      throw error
    }
  }
}

export const createVideogame = (payload) => {
  return async function(dispatch){
    try {
      const response = await axios.post('http://localhost:3001/videogames', payload)
      //console.log(response)
      return response
    } catch (error) {
      throw error
    }
  }
}

export const deleteVideogame = (id) => {
  return async function(dispatch){
    try {
      await axios.delete(`http://localhost:3001/videogames/${id}`)
      return dispatch({type: DELETE_VIDEOGAME})
    } catch (error) {
      throw error
    }
  }
}

export const updateVideogame = (id, payload) => {
  return async function(dispatch){
    try {
      const json = await axios.put(`http://localhost:3001/videogames/edit/${id}`, payload)
      return dispatch({type: UPDATE_VIDEOGAME, payload: json.data})
    } catch (error) {
      throw error
    }
  }
}

export const filterVideogamesByGenres = (payload) => {
  console.log("payload filter by genres", payload);
  return{
    type: FILER_BY_GENRES,
    payload
  }
}

export const filterByAscDesc = (payload)=> {
  return{
    type: FILTER_BY_ASC_DESC,
    payload
  }
}

export const filterByCreated = (payload)=> {
  return{
    type: FILTER_BY_CREATED,
    payload
  }
}

export const filterByRaiting = (payload)=> {
  return{
    type: FILTER_BY_RAITING,
    payload
  }
}

export const ClearCacheVideogame = () => {
  return{
    type: CLEAR_CACHE_VIDEOGAME,
  }
}

export const ClearAllVideogamesCache = () => {
  return{
    type: CLEAR_CACHE,
  }
}

