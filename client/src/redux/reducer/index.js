// importamos las actions types
import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_DETAILS,
  CREATE_VIDEOGAME,
  DELETE_VIDEOGAME,
  UPDATE_VIDEOGAME,
  GET_ALL_GENRES,
  FILER_BY_GENRES,
  FILTER_BY_ASC_DESC,
  FILTER_BY_CREATED,
  FILTER_BY_RAITING,
  CLEAR_CACHE_VIDEOGAME,
  GET_NAME_VIDEOGAMES,
  CLEAR_CACHE
} from "../actions";

// creamos el estado inicial
const initialState = {
  videogames: [],
  allVideogames: [],
  vidogameDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        // en mi estado, guarda en videogames todo lo que te estoy pasando en la action.payload (el json con todas los videojuegos)
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_ALL_GENRES:
      return {
        // en mi estado, guarda en videogames todo lo que te estoy pasando en la action.payload (el json con todas los videojuegos)
        ...state,
        genres: action.payload,
      };
    case GET_NAME_VIDEOGAMES:
      return{
        ...state,
        videogames: action.payload
      }
    case GET_VIDEOGAME_DETAILS:
      return {
        ...state,
        vidogameDetail: action.payload,
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
      };
    case DELETE_VIDEOGAME:
      return {
        ...state,
      };
    case FILER_BY_GENRES:
      const allVideogames = state.allVideogames;
      if (action.payload === "allGenres") {
        return {
          ...state,
          videogames: allVideogames,
        };
      }
      const filterByGenres = allVideogames.filter((g) =>
        g.genres.includes(action.payload)
      );
      console.log("filterByGenres", filterByGenres);
      if (filterByGenres.length === 0) {
        return {
          ...state,
          videogames: [{ error: "Genero no tiene juegos asociados" }],
        };
      }
      return {
        ...state,
        videogames: filterByGenres,
      };
    case FILTER_BY_ASC_DESC:
      const allVideogamesByAscDesc = state.videogames;

      let sortVideogames =
        action.payload === "asc"
          ? allVideogamesByAscDesc.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0;
            })
          : allVideogamesByAscDesc.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });
            console.log("sortVideogames",sortVideogames)

      return {
        ...state,
        videogames: sortVideogames,
      };
    case FILTER_BY_CREATED:
      const allVideogamesByCreated = state.allVideogames;
      const createdFilter =
        action.payload === "created" // si lo que viene en el value de cada opcion que esta dentro de los select en el componente
          ? allVideogamesByCreated.filter((el) => el.createdInDB)
          : allVideogamesByCreated.filter((el) => !el.createdInDB);
      return {
        ...state,
        videogames:
          action.payload === "all" ? allVideogamesByCreated : createdFilter,
      };
    case FILTER_BY_RAITING:
      const allVideogamesByRating = state.allVideogames;
      const filterByRating = allVideogamesByRating.filter((v) =>
      Math.trunc(v.rating) == action.payload
      );
      if (action.payload === "allRaiting") {
        return {
          ...state,
          videogames: allVideogamesByRating,
        };
      }
      console.log("filterByRating", filterByRating);
      if (filterByRating.length === 0) {
        return {
          ...state,
          videogames: [{ error: "Rating no tiene juegos asociados" }],
        };
      }
      return {
        ...state,
        videogames: filterByRating,
      };
    case CLEAR_CACHE_VIDEOGAME:
      return{
        ...state,
        vidogameDetail: {}
      }
    case CLEAR_CACHE:
      return {
      ...state,
      videogames: [],
      allVideogames: []
    }
    case UPDATE_VIDEOGAME:
      return {
        ...state,
        vidogameDetail: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
