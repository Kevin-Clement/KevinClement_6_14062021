const express = require('express');
const mongoose = require('mongoose'); // Plugin Mongoose pour se connecter à la data base Mongo Db
const bodyParser = require('body-parser'); // Permet d'extraire l'objet JSON des requêtes POST

// Utilisation du module 'helmet' pour la sécurité en protégeant l'application de certaines vulnérabilités
const helmet = require("helmet"); // il sécurise nos requêtes HTTP et ajoute une protection XSS mineure
const path = require('path'); // Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier
const rateLimit = require("express-rate-limit");

const saucesRoutes = require('./routes/sauces'); // On importe la route dédiée aux sauces
const userRoutes = require('./routes/user'); // On importe la route dédiée aux utilisateurs

const app = express();

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

require('dotenv').config(); // utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement

mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 100 // limite chaque IP à 100 requêtes par windowMs
});


app.use(limiter);

app.use(bodyParser.json());

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;