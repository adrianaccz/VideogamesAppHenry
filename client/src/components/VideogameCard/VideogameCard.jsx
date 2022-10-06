import React, {useEffect} from "react";
import { deleteVideogame, getAllVideogames, ClearAllVideogamesCache, ClearCacheVideogame } from "../../redux/actions";
import styles from './styles.css'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'


export default function VideogameCard({id,name, genres, img}){
  const dispatch = useDispatch()

  const handleDelete = (id)=>{
    dispatch(ClearCacheVideogame())  // agregado
    dispatch(deleteVideogame(id))
    dispatch(ClearAllVideogamesCache())
    dispatch(getAllVideogames())
    alert("Video Juego eliminado con exito!!")
  }


  return (
    <div className="col-md-4 pb-3" >
      <div className="card" >
        <button type="button" onClick={(()=> handleDelete(id))} className="btn btn-outline-danger button-delete">x</button>
          <img className="card-img-top p-3 mt-1 image-card img-thumbnail" src={img} alt="Imagen no se encuentra" />
        <div className="card-body">
          <Link to={`/videogames/${id}`}>
            <div className="car-name mb-3">{name}</div>
          </Link>
          <span className="car-name ">{genres.map((g, i) => <span key={i} className=" badge rounded-pill bg-secondary m-1">{`${g}`}</span>)}</span>
        </div>
      </div>
    </div>
  )
}