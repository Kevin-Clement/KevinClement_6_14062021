// Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les sauces
// Dans le routeur on ne veut QUE la logique de routing, ainsi la logique métier sera enregistrée dans le controller sauce.js

const express = require('express');
const router = express.Router();
// Ajout des middleweares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// On importe le controller
const saucesCtrl = require('../controllers/sauces');

// Création des différentes ROUTES de l'API en leurs précisant dans l'ordre, leurs middlewares et controllers
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/:id/like', auth, saucesCtrl.likeDislike)

module.exports = router;