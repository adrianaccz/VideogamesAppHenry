const { getPlataforms } = require("../services/getPlataforms")

const plataforms = async(req, res) =>{
  
  try {
    let plataforms = await getPlataforms()
     return res.status(200).json(plataforms)
      } catch (error) {
      return res.status(404).send(error)
  }
}

module.exports={
  plataforms
}