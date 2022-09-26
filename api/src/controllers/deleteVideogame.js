const { deleteVideogame } = require("../services/deleteVideogames");

const videogamesController = async(req, res) => {
  const {id} = req.params
  const getvideogame = await deleteVideogame(id)
  try {
    return res.status(200).json(getvideogame)
  } catch (error) {
    throw res.status(404).send('Juego no encontrado!!')
  }
}

module.exports={
  videogamesController
}