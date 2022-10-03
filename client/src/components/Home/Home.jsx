import {React} from 'react'
import { useEffect, useState } from 'react' 
import {useDispatch, useSelector} from 'react-redux'
import { getAllGenres,
  getAllVideogames,
  filterVideogamesByGenres,
  filterByCreated,
  filterByAscDesc,
  filterByRaiting } from '../../redux/actions' 
import { Link } from 'react-router-dom'
import VideogameCard from '../VideogameCard/VideogameCard'
import Loading from "../Loading/Loading";
import Paginated from '../Paginated/Paginated'


export default function Home(){

  const dispatch = useDispatch()                  // constante que despacha las acciones

  // arreglo del estado global
  const allVideogames = useSelector((state)=> state.videogames)       //clase, mapStateToProps, hooks trae en la constante todo lo que esta en el estado de videogames
  //console.log('Todoslos juegos', allVideogames);

  const allGenres = useSelector((state)=> state.genres)

  // ------- PAGINACION-------
  // pagina actual siempre va ser uno, siempre va a empezar en la primera
  // estados locales
  const [currentPage, setCurrentPage] = useState(1)
  // limite de videojuegos por pagina
  const [videogamesLimitPage, setVideogamesLimitPage] = useState(15)
  
  const indexOfLastMovie = currentPage * videogamesLimitPage
  const indexOfFristMovie = indexOfLastMovie - videogamesLimitPage
  // personajes que se van a ir renderizando
  const currentMovie = allVideogames.slice(indexOfFristMovie, indexOfLastMovie) 
  console.log("currentmovie: ",currentMovie )
  // paginado que resive el numero de la pagina y asi ayuda con el renderizado
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //---------------------------------

  const [oder, setOrder] = useState('')

  /* llena el estado cuando se monta un componente */
  useEffect(()=>{
    dispatch(getAllVideogames())
    dispatch(getAllGenres())
  }, [dispatch])

  const handlerClick = (event) =>{
    event.preventDefault()
    dispatch(getAllVideogames())          // para que se resetee
  }

  const handleChangeFilterGenres = (event)=> {
    event.preventDefault()
    dispatch(filterVideogamesByGenres(event.target.value))        // event.target.value toma el value de la option que haya clicleado el ususario
  }

  const handleChangeFilterCreated = (event)=> {
    event.preventDefault()
    dispatch(filterByCreated(event.target.value))        // event.target.value toma el value de la option que haya clicleado el ususario
  }

  const handleChangeFilterAscDesc = (event)=> {
    event.preventDefault()
    dispatch(filterByAscDesc(event.target.value))        // event.target.value toma el value de la option que haya clicleado el ususario
    setCurrentPage(1)
    setOrder(`Ordenado ${event.target.value}`)            // es para que renderice y haga el filtrado 
  }

  const handleChangeFilterRating = (event)=> {
    event.preventDefault()
    dispatch(filterByRaiting(event.target.value))        // event.target.value toma el value de la option que haya clicleado el ususario
  }

  return(
    allVideogames.length === 0 ?
      <Loading/>
      :
      <div className='container p-3'>
          <div className='row'>

                <div className="input-group mb-3 col align-self-start">
                  <button className="btn btn-outline-success" onClick={e => handlerClick(e)}>
                    Cargar videjuegos
                  </button>
                </div>
                <div className="input-group mb-3 col align-self-start">
                  <label className="input-group-text" htmlFor="inputGroupSelect01" value="asc">↓ ↑</label>
                  <select className="form-select" id="inputGroupSelect01" onChange={e=> handleChangeFilterAscDesc(e)}>
                    <option value="asc">A - Z ↑</option>
                    <option value="desc">Z - A ↓</option>
                  </select>
                </div>

                <div className="input-group mb-3 col align-self-start">
                  <label className="input-group-text" htmlFor="inputGroupSelect01" value="allRaiting">Raiting</label>
                  <select className="form-select" id="inputGroupSelect01" onChange={e=> handleChangeFilterRating(e)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <div className="input-group mb-3 col align-self-start">
                  <label className="input-group-text" htmlFor="inputGroupSelect01" value="allGenres">Generos</label>
                  <select className="form-select" id="inputGroupSelect01" onChange={e=> handleChangeFilterGenres(e)}>
                    {
                      allGenres?.map(e => <option key={e.id} value={e.name}>{e.name}</option>)
                    }
                  </select>
                </div>

                <div className="input-group mb-3 col align-self-start">
                  <label className="input-group-text" htmlFor="inputGroupSelect01" value="all">Juegos</label>
                  <select className="form-select" id="inputGroupSelect01" onChange={e=> handleChangeFilterCreated(e)}>
                    <option value="created">Creados</option>
                    <option value="api">Existentes</option>
                  </select>
                </div>
            <div className='col-12'>
              <div className='row p-3' >
                {/* allVideogames se trajo el estado global, por lo tanto mapeamos ese estado para pasar la info que queremos que aparezcan en las card */}
                {
                  currentMovie[0].error ? currentMovie[0].error :
                  currentMovie?.map( v => (

                    <VideogameCard
                      key= {v.id}
                      id= {v.id}
                      name = {v.name}
                      genres = {v.genres.map((g) => g.name === undefined ? g : g.name)}
                      img = {v.img}
                    />
                  )

                  )
                }
              </div>
            </div>
            <div className="mx-auto">
              <Paginated
                videogamesLimitPage={videogamesLimitPage}
                allVideogames={allVideogames.length}
                paginated={paginated}
              />
            </div>
          </div>
      </div>
  )
}