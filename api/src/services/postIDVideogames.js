const {Videogame, Genre} = require('../db');

const createVideoGames = async(name, description, date_launch, rating, plataforms, createdInDB, genre, img)=> {

  //creo en la BD el juego con lo traido por body
  try {
    const videoGameCreated = await Videogame.create({
      name,
      description,
      date_launch,
      rating,
      plataforms,
      createdInDB,
      img
    })
    // encuentro el genero que ya habiamos guardado en la BD, comparandolo con el genero que viene del body
    const genreInDB = await Genre.findAll({
      where: {name : genre}
    })

    //console.log("METODOS*****:", videoGameCreated.__proto__)
    //console.log("genreInDB*****:", genreInDB)
    //se agrega con un mixin el genero
    videoGameCreated.addGenre(genreInDB)
    //console.log("videoGameCreated*****:", videoGameCreated)
    return videoGameCreated
  } catch (error) {
    throw error
  }
}

module.exports={
  createVideoGames
}