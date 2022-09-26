const { getAllGames } = require("../services/getAllgames")

const videogames = async(req, res) =>{
    const {name} = req.query
    try {
        const totalGames = await getAllGames(name)
        if(name){
            let gameName = totalGames.filter(element =>
                element.name.toLowerCase().includes(name.toLowerCase())).splice(0,15)
                if(gameName.length){
                    res.status(200).send(gameName)
                }else{
                    return res.status(404).send('No existe el juego')
                }
        }else{
            res.status(200).send(totalGames)
        }
        } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports ={
    videogames
}