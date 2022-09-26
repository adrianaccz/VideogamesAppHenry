import React from "react";
import { deleteVideogame } from "../../redux/actions";
import styles from './styles.css'
import { Link } from 'react-router-dom';



export default function VideogameCard({id,name, genres, img}){


  return (
    <div className="col-md-4 pb-3" >
      <div className="card" >
        <i onClick={(()=> deleteVideogame(id))} className="bi bi-x button-delete"></i>
          <img className="card-img-top p-3 mt-1 image-card img-thumbnail" src={img} alt="Imagen no se encuentra" />
        <div className="card-body">
          <Link to={`/videogames/${id}`}>
            <div className="car-name mb-3">{name}</div>
          </Link>
          <span className="car-name ">{genres.map(g => <span className=" badge rounded-pill bg-secondary m-1">{`${g}`}</span>)}</span>
        </div>
      </div>
    </div>
  )
}