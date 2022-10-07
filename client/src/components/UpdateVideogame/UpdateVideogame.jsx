import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"; 
import { useEffect} from 'react' 
import { getVideogameDetail, ClearCacheVideogame, getAllVideogames, updateVideogame, ClearAllVideogamesCache } from '../../redux/actions';
import { useParams } from "react-router-dom";
import { Link, useHistory } from 'react-router-dom';
import Loading from "../Loading/Loading";

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
  if(videogame.rating === '' || videogame.rating < 1 || videogame.rating > 5){
    errors.rating = 'Rating tiene que ser del 1 al 5'
  }
  if(videogame.rating.match(ExpReg)){
    errors.rating = 'Valor ingresado debe ser númerico'
  }
  return errors
}

const UpdateVideogame = () => {
  
  const videogameDetail = useSelector((state)=> state.vidogameDetail)         // del reducer
  
  const history = useHistory()

  const dispatch = useDispatch()
  
  const { id } = useParams()

  const [errors, setErrors] = useState({})
  
  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    rating: "",
    plataforms: [],
  })

    //manejador de cambios de estado
    const handleChange = (e) => {
      //seteamos el videogame(input)
      setVideogame({...videogame, [e.target.name]: e.target.value })
      //seteo el error 
      setErrors(validate({...videogame, [e.target.name]: e.target.value}))
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateVideogame(id, videogame))
    setVideogame({
      name: "",
      description: "",
      rating: "",
      plataforms: [],
    })
    alert("Videojuego editado con exito")
    dispatch(ClearCacheVideogame(id))
    dispatch(ClearAllVideogamesCache())
    history.push('/videogames')
  }
  // --------------- plataformas ------------------

  const allVideogames = useSelector((state)=> state.videogames)
    //console.log("allVideogames desde details",allVideogames);
    let videogamesMap = allVideogames.map(p => p.plataforms)

    let allPlataforms = (videogamesMap.flat())
    allPlataforms = allPlataforms.filter((item,index)=>{
      return allPlataforms.indexOf(item) === index && item !== undefined;
    })
  //console.log("allPlataforms",allPlataforms)
  
    //-------------------------------------------

  useEffect(()=>{
    dispatch(getVideogameDetail(id))
    dispatch(getAllVideogames())
  }, [dispatch, id])


  const handleDelete = (e)=> {
    setVideogame({
      ...videogame,
      plataforms: videogame.plataforms.filter(p => p !== e)
    })
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

  return (
    Object.keys(videogameDetail).length === 0 ?
      <Loading/>
      :
      <div className="mb-5 mt-0 ">
      <h1 className=" fw-bold mb-5">Edita tu Videojuego</h1>
      <div className="card mb-5 col-8 mx-auto mt-5 border-info ">
        <form className='container pt-3' onSubmit={(e)=> handleSubmit(e)}>
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"> Nombre: </span>
              <input
                type="text"
                placeholder={videogameDetail.name}
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
                placeholder={videogameDetail.description}
                value={videogame.description}
                className="form-control"
                onChange={(e) => handleChange(e)}
              >
              </textarea>
            </div>
            {errors.description && (
              <p className="text-danger">{errors.description}</p>
            )}

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"> Rating: </span>
              <input
                type="text"
                placeholder={videogameDetail.rating}
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
              <select className="form-select" id="inputGroupSelect01" onChange={(e)=> handleSelectPlataforms(e)}
              >
                  {
                    allPlataforms?.map((p, i) => <option value={p} key={i}>{p}</option>)
                  }
              </select>
            </div>
            {errors.plataforms && (
              <p className="text-danger">{errors.plataforms}</p>
            )}
          </div>
           {/* ----------- INFO DE LOS GENEROS Y PLATAFORMAS ESCOJIDAS------------ */}
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
                Editar
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
  )}

export default UpdateVideogame