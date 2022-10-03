import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"; 
import { getVideogameDetail, ClearCacheVideogame, getAllVideogames } from '../../redux/actions';
import { useEffect} from 'react' 
import { useParams } from "react-router-dom";
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import styles from './styles.css'

const VideogameDetail = (props) => {

  
  const dispatch = useDispatch()
  const { id } = useParams()
  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    rating: "",
    plataforms: [],
  })

  
  // --------------- plataformas y editar ------------------
  const [edition, setEdition] = useState(false)

  const allVideogames = useSelector((state)=> state.videogames)
    console.log("allVideogames desde details",allVideogames);
    let videogamesMap = allVideogames.map(p => p.plataforms)

    let allPlataforms = (videogamesMap.flat())
    allPlataforms = allPlataforms.filter((item,index)=>{
      return allPlataforms.indexOf(item) === index && item !== undefined;
    })
  console.log("allPlataforms",allPlataforms)
  
    //-------------------------------------------

  useEffect(()=>{
    dispatch(getVideogameDetail(id))
    dispatch(getAllVideogames())
    return () => {
      dispatch(ClearCacheVideogame())
    }
  }, [dispatch, id])


  const videogameDetail = useSelector((state)=> state.vidogameDetail)         // del reducer

  //console.log("videogames",videogameDetail)

  //edicion del editar

  const handleEdition = (e)=>{
    e.preventDefault()
    setEdition(true)
  }

  const handleDelete = (e)=> {
    setVideogame({
      ...videogame,
      plataforms: videogame.plataforms.filter(p => p !== e)
    })
  }

  return (
    Object.keys(videogameDetail).length === 0 ?
      <Loading/>
      :
      <div className="mb-5 mt-5">
        <div className="card mb-3 col-8 mx-auto mt-5 border-info ">
          <img src={videogameDetail.img} alt="Imagen no se encuentra" className="card-img-top"/>
          <div className="card-body">
            <h4 className="card-title title">{videogameDetail.name}</h4>
            <p className="card-text ">{videogameDetail.description}</p>
            <div className='container'>
              <div className='row'>
                <div className="col-6">
                  <h5 className="card-title title">Fecha de lanzamiento: </h5>
                  <p className="card-text">{videogameDetail.date_launch}</p>
                  <h5 className="card-title title">Plataformas: </h5>
                  <p className="card-text">{videogameDetail.plataforms.join(' - ')}</p>
                </div>
                <div className="col-6">
                  <h5 className="card-title title">Rating: </h5>
                  <p className="card-text">{videogameDetail.rating}</p>
                  <h5 className="card-title title">Generos: </h5>
                  <p className="card-text">{videogameDetail.genres.map((g) => g.name === undefined ? g : g.name).join(' - ')}</p>  
                </div>
              </div>
            </div>
              <Link to={'/videogames'}>
                <button className="btn btn-outline-success buttoms">Regresar</button>
              </Link>

              {/* -----------EDITAR----------------- */}
              <button onClick={(e)=> handleEdition(e)} className="btn btn-outline-success buttoms">{edition ? "Guardar" : "Editar"}</button>
          </div>
        {edition
        ? <div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"> Nombre: </span>
              <input
                //placeholder={videogameDetail.name}
                type="text"
                value={videogameDetail.name}
                name= "name"
                //onChange={(e) => handleChange(e)}
                className="form-control"
              />
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text"> Descripcion: </span>
              <textarea
                type="text"
                name="description"
                value={videogameDetail.description}
                //placeholder={videogameDetail.description}
                className="form-control"
                /* onChange={(e) => handleChange(e)} */>
              </textarea>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"> Rating: </span>
              <input
                type="text"
                placeholder="1 al 5"
                pattern="[0-9]+"
                value={videogameDetail.rating}
                name='rating'
                className="form-control"
                //onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01" >Plataformas </label>
              <select className="form-select" id="inputGroupSelect01" /* onChange={(e)=> handleSelectPlataforms(e)} */>
                  {
                    allPlataforms?.map((p, i) => <option value={p} key={i}>{p}</option>)
                  }
              </select>
            </div>
            <div>
            {videogameDetail.plataforms.map(e =>
              <span className="badge bg-secondary m-1">
                {e}
                <i onClick={()=> handleDelete(e)} className="bi bi-x"></i>
              </span>
              )}
          </div>
          </div>
        : false}
        </div>
      </div>
  )
}

export default VideogameDetail