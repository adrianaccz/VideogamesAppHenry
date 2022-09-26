const { Router } = require('express');
const { videogamesController } = require('../controllers/deleteVideogame');
const { genres } = require('../controllers/getGenres');
const { plataforms } = require('../controllers/getPlataforms');
const { videogameID } = require('../controllers/getVideogameID');
const { videogames } = require('../controllers/getVideogames');
const { createVideogames } = require('../controllers/postVideoGames');
const { putVideogame } = require('../controllers/putVideogame');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', videogames)
router.get('/videogames/:id',videogameID)
router.post('/videogames', createVideogames)
router.get('/genres', genres)
router.delete('/videogames/:id', videogamesController)
router.put('/videogames/:id', putVideogame)
router.get('/plataforms', plataforms)

module.exports = router;
