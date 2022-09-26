import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"; 
import { getVideogameDetail, ClearCacheVideogame } from '../../redux/actions';
import { useEffect} from 'react' 
import { useParams } from "react-router-dom";
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import styles from './styles.css'

const VideogameDetail = (props) => {
  
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(()=>{
    dispatch(getVideogameDetail(id))
    return () => {
      dispatch(ClearCacheVideogame())
    }
  }, [dispatch, id])


  const videogameDetail = useSelector((state)=> state.vidogameDetail)         // del reducer

  console.log("videogames",videogameDetail)

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
                <button className="btn btn-outline-success">Regresar</button>
              </Link>
          </div>
        </div>
      </div>
  )
}

export default VideogameDetail