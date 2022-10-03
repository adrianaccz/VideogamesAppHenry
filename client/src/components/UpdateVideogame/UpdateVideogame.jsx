import React from 'react'
import { useDispatch, useSelector } from "react-redux"; 
import { useEffect} from 'react' 
import { getAllVideogames } from '../../redux/actions';
const UpdateVideogame = () => {
  const dispatch = useDispatch()
  const allVideogames = useSelector((state)=> state.videogames)

  useEffect(()=>{
        // esto porque cuando se crea un juego y vuelve a la pagina queda unos segundos sin el juego y luego carga
    dispatch(getAllVideogames())
   
  }, [dispatch])
  console.log('allvideogames desde update: ',allVideogames);
  return (
    <div>UpdateVideogame</div>
  )
}

export default UpdateVideogame