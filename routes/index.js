var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Express',
  	message: 'Hello World, Pumpkin',
  	response: 'I love you, Honeybunny'
  });
});

/* GET all users page */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e, docs) {
		res.render('userlist', {
			'userlist' : docs
		});
	});
});

/* GET new user page */
router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add New User'});
});

/* POST to Add User service */
router.post('/adduser', function(req, res) {
	// Set internal DB variable
	var db = req.db;

	// Get form values
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	// Set collection
	var collection = db.get('usercollection');

	//Submit to DB
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function(err, doc) {
		if (err) {
			res.send("There was a problem adding info to DB");
		} else {
			res.redirect('userlist');
		}
	});
});


module.exports = router;
