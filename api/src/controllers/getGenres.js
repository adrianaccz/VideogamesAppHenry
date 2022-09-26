const { getGenres } = require("../services/getGenres")

const genres = async(req, res) =>{
  
  try {
    let genres = await getGenres()
     return res.status(200).json(genres)
      } catch (error) {
      return res.status(404).send(error)
  }
}

module.exports={
  genres
}