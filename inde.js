//bodyParser pour afficher les donnee dans le body
const bodyParser = require('body-parser');

const express = require('express');

//utiliser express partout
const app = express();

//importer l connexion a la base de donnee dans le fichier main
require('./models/dataBaseConfig');

//importer postRouter ici pour le routage en middleware
const postsRouter = require('./routes/postController');

// const mongoose = require('mongoose');

// mongoose.set("useFindAndModify", false);

// le middleware body
app.use(bodyParser.json());

// le middleware sur une chemin special
app.use('/posts', postsRouter);

//
app.listen(5500, () => {
	console.log('server starting: 5500');
});
