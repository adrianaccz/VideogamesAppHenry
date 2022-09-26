import React, {useState} from 'react'
import { getNameVideogames } from '../../redux/actions';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

const SearchName = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  // despues q me cree el juego me voy a home
  const history = useHistory()

  const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getNameVideogames(name))
    setName('')
    history.push('/videogames')
  }

  return (
    <div className="d-flex">
        <input
        className="form-control me-2"
          type="text"
          placeholder='Buscar...'
          value={name}
          onChange={(e)=> handleInputChange(e)}/>
          <button
            className="btn btn-outline-success"
            type='submit'
            onClick={(e)=> handleSubmit(e)}>
              Buscar
          </button>
    </div>
  )
}

export default SearchName