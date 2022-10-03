import React, { useState, useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import { createVideogame, getAllGenres, getAllVideogames } from '../../redux/actions';
import { Link, useHistory } from 'react-router-dom';


export function validate(videogame){
  let errors = {}
  const ExpReg="^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";

  if(!videogame.name.trim()){
    errors.name = 'Ingresa nombre del videojuego'
  }
  if(!videogame.description.trim()){
    errors.description = 'Ingresa una descripción'
  }
  if(videogame.plataforms.length === 0  || !videogame.plataforms){
    errors.plataforms = 'Ingresa al menos una plataforma'
  }
  if(videogame.genre.length === 0 || !videogame.genre){
    errors.genre = 'Ingresa al menos un genero'
  }
  if(videogame.rating === '' || videogame.rating < 1 || videogame.rating > 5){
    errors.rating = 'Rating tiene que ser del 1 al 5'
  }
  if(videogame.rating.match(ExpReg)){
    errors.rating = 'Valor ingresado debe ser númerico'
  }
  return errors
}

const CreateVideogame = () => {
  //creamos el dispatch
  const dispatch = useDispatch()

  //traeme el estado de genres
  const allGenres = useSelector((state)=> state.genres)

  const allVideogames = useSelector((state)=> state.videogames)
  //console.log("allVideogames desde created",allVideogames);

  // despues q me cree el juego me voy a home
  const history = useHistory()

  // --------------- plataformas ------------------
  let videogamesMap = allVideogames.map(p => p.plataforms)

  let allPlataforms = (videogamesMap.flat())
  allPlataforms = allPlataforms.filter((item,index)=>{
    return allPlataforms.indexOf(item) === index && item !== undefined;
  })
console.log("allPlataforms",allPlataforms)

  //-------------------------------------------

  // creamos el estado de videojuegos
  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    date_launch: '',
    rating: "",
    plataforms: [],
    genre: [],

  })

  //estado local de errores
  const [errors, setErrors] = useState({})

  //dispatch la accion para renderizar
  useEffect(()=>{
    dispatch(getAllGenres())
    dispatch(getAllVideogames())
  },[dispatch])

  //manejador de cambios de estado
  const handleChange = (e) => {
    //seteamos el videogame(input)
    setVideogame({...videogame, [e.target.name]: e.target.value })
    //seteo el error 
    setErrors(validate({...videogame, [e.target.name]: e.target.value}))
  }

  //boton que despacha la accion
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVideogame(videogame))
    alert("Videojuego creado")
    setVideogame({
      name: "",
      description: "",
      date_launch: '',
      rating: "",
      plataforms: [],
      genre: [],

    })
    history.push('/videogames')
  }

  const handleSelectGenres = (e)=> {
    setVideogame({
      ...videogame,
      genre : videogame.genre.includes(e.target.value)        // valido que no se ingrese el mismo genero 2 veces
      ? videogame.genre
      : [...videogame.genre, e.target.value]
    })
    setErrors(validate({...videogame, genre : [...videogame.genre, e.target.value]}))
  }

  const handleSelectPlataforms = (e)=> {
    setVideogame({
      ...videogame,
      plataforms : videogame.plataforms.includes(e.target.value)        // valido que no se ingrese la misma plataforma 2 veces
      ? videogame.plataforms
      : [...videogame.plataforms, e.target.value]
    })
    setErrors(validate({...videogame, [e.target.name]: e.target.value}))
  }

  const handleDelete = (e)=> {
    setVideogame({
      ...videogame,
      genre: videogame.genre.filter(g => g !== e),
      plataforms: videogame.plataforms.filter(g => g !== e)
    })
  }

  return (
    
    <div className="mb-5 mt-0 ">
      <h1 className=" fw-bold mb-5">Crea tu Video Juego</h1>
      <div className="card mb-5 col-8 mx-auto mt-5 border-info ">
        <form className='container pt-3' onSubmit={(e)=> handleSubmit(e)}>
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"> Nombre: </span>
              <input
                type="text"
                value={videogame.name}
                name= "name"
                onChange={(e) => handleChange(e)}
                className="form-control"
              />
            </div>
            {/* si existe mi estado de errores entonces renderizame una etiqueta p con el error */}
            {errors.name && (
              <p className="text-danger">{errors.name}</p>
            )}
            <div className="input-group mb-3">
            <span className="input-group-text"> Descripcion: </span>
              <textarea
                type="text"
                name="description"
                value={videogame.description}
                className="form-control"
                onChange={(e) => handleChange(e)}>
              </textarea>
            </div>
            {errors.description && (
              <p className="text-danger">{errors.description}</p>
            )}
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"> Imagen: </span>
              <input
                type="text"
                value={videogame.img}
                name= "img"
                onChange={(e) => handleChange(e)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"> Fecha de lanzamiento: </span>
              <input
                className="form-control"
                type="date"
                value={videogame.date_launch}
                name='date_launch'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"> Rating: </span>
              <input
                type="text"
                placeholder="1 al 5"
                pattern="[0-9]+"
                value={videogame.rating}
                name='rating'
                className="form-control"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.rating && (
              <p className="text-danger">{errors.rating}</p>
            )}
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01" >Plataformas </label>
              <select className="form-select" id="inputGroupSelect01" onChange={(e)=> handleSelectPlataforms(e)}>
                  {
                    allPlataforms?.map((p, i) => <option value={p} key={i}>{p}</option>)
                  }
              </select>
            </div>
            {errors.plataforms && (
              <p className="text-danger">{errors.plataforms}</p>
            )}
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">Generos</label>
              <select className="form-select" id="inputGroupSelect01" onChange={(e)=> handleSelectGenres(e)}>
                  {
                    allGenres?.map(g => <option key={g.id} value={g.name}>{g.name}</option>)
                  }
                </select>
            </div>
            {errors.genre && (
              <p className="text-danger">{errors.genre}</p>
            )}
          </div>
           {/* ----------- INFO DE LOS GENEROS Y PLATAFORMAS ESCOJIDAS------------ */}
          <div >
          {videogame.genre.map(e =>
            <span  className="badge bg-secondary m-1">
              {e}
              <i onClick={()=> handleDelete(e)} className="bi bi-x"></i>
            </span>
            )}
          </div>
          <div>
            {videogame.plataforms.map(e =>
              <span className="badge bg-secondary m-1">
                {e}
                <i onClick={()=> handleDelete(e)} className="bi bi-x"></i>
              </span>
              )}
          </div>
          {/* ----------------------------------------------------------------- */}
            <div className="d-grid gap-2 col-6 mx-auto ">
              <button className="btn btn-outline-success m-3 mb-0" type='submit'>
                Crear
              </button>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Link to={'/videogames'}>
              <button className="btn btn-outline-success m-3 mt-0">
                volver
              </button>
              </Link>
            </div>
        </form>


      </div>
    </div>
  )
}

export default CreateVideogame