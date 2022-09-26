import React from "react";
import {Link} from 'react-router-dom'
import styles from './styles.css'


/* Pagina de inicio que lo unico que hace es q te lleva al home donde se despliega todas las peliculas */
export default function LandingPage(){
  return(
    <div >
      <div className="col-6 pt-5">
        <h1>Bienvenidos a Videogame APP</h1>
        <Link to='/videogames'>
          <div className="d-grid mx-auto col-6 bottom-50">
            <button className="btn btn-outline-light btn-ingresar mt-5 ">Ingresar a Juegos</button>
          </div>
        </Link>
      </div>
    </div>
  )
}