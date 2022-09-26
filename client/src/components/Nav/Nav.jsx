import React, {useState} from 'react'
 import { Link } from 'react-router-dom';
import { getNameVideogames } from '../../redux/actions';
import { useDispatch } from "react-redux"; 
import SearchName from '../SearchName/SearchName';
import styles from './styles.css'

const Nav = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand ">
          <Link style={{ textDecoration: 'none' }} to={'/'}>
            VideogameApp
          </Link>
        </div>
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll mx-auto">
              <li className="nav-item">
                <div className="nav-link " > 
                <Link style={{ textDecoration: 'none' }} to={'/videogames/create'}>
                  <button className="btn btn-outline-success">Crear Video Juego</button> 
                </Link>
                </div>
              </li>
            </ul>
          

        <SearchName/>
      </div>
    </nav>
  )
}

export default Nav