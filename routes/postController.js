// import su module express
const express = require('express');

// utiliser la methode router de express
const router = express.Router();

// import la la constante PostModel depuis son fichier
const { PostModel } = require('../models/post-model');

// import de ObjectId pour faire le put
const ObjectID = require('mongoose').Types.ObjectId;

// methode get
router.get('/', (req, res) => {
	PostModel.find((err, docs) => {
		// console.log(docs);
		if (!err) res.send(docs);
		else console.log(`error to get data: ${err}`);
	});
});

// methode post
router.post('/', (req, res) => {
	const newRecord = new PostModel({
		author  : req.body.author,
		message : req.body.message,
	});

	newRecord.save((err, docs) => {
		if (!err) {
			res.send(docs);
		}
		else {
			console.log(err);
		}
	});
});

// methode put
router.put('/:id', (req, res) => {
	if (!ObjectID.isValid(req.params.id)) {
		res.status(400).send(`ID pas connu: ${req.params.id}`);
	}
	else {
		const udpdateRecord = {
			author  : req.body.author,
			message : req.body.message,
		};

		PostModel.findByIdAndUpdate(
			req.params.id,
			{
				$set : udpdateRecord,
			},
			{
				new : true,
			},
			(err, docs) => {
				if (!err) {
					res.send(docs);
				}
				else {
					console.log(`update error: ${err}`);
				}
			},
		);
	}
});

// methode delete
router.delete('/', (req, res) => {
	if (!ObjectID.isValid(req.params.id)) {
		res.status(400).send('ID non connu : ' + err);
	}
	else {
		PostModel.findOneAndRemove(req.params.id, (err, docs) => {
			if (!err) {
				res.send(docs);
			}
			else {
				console.log(err);
			}
		});
	}
});

module.exports = router;
