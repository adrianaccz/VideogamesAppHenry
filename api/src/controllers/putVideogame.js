const { videogameUpdate } = require("../services/updateVideogame");

const putVideogame = async(req, res) => {
  const { name, description, platforms, rating} = req.body
  const {id} = req.params

  try {
    let videogameUpdated = await videogameUpdate(id, name, description, platforms, rating)
    res.status(200).json(videogameUpdated)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports={
  putVideogame
}