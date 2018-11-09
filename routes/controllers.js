var mysql = require('mysql');
var url = require('url');

var conn = mysql.createConnection({
	host	 	:'localhost',
	user 		:'root',
	password	:'root',
	database	:'productsdb'
});

//connecting to mysql DB.
conn.connect(function(err){
	if(!err) {
		console.log("Database is connected........");
	} else {
		console.log("Error.. "+err);
	}
});

//posting products data.
exports.postProduct = function(req, res) {
	//console.log("req", req.body);
	
	conn.query('INSERT INTO products SET ?', req.body, function(error, results, fields) {
		if(error) {
			console.log("error_occured", error.code);
			res.send({
				"code":400,
				"failed":"error occured"
			});
		} else {
			console.log("The solution is:", results);
			res.send({
				"code":200,
				"success":"product inserted successfully"
			});
		}
	});
}

//get all products based on category
exports.getProducts = function(req, res) {
	var q = url.parse(req.url, true);
	var qdata = q.query;
	var cat;
	cat = qdata.category;
	console.log(cat);
	conn.query("SELECT * FROM products WHERE prod_category = ?", [cat], function(err, results, fields) {
		if(err){
			console.log("Error: "+ err.code);
			return;
		} 

		res.json(results);
	});
}

//get product by id
exports.getProduct = function(req, res) {
	var q = url.parse(req.url, true);
	var qdata = q.query;
	var id;
	id = qdata.prod_id;
	console.log(id);
	conn.query("SELECT * FROM products WHERE prod_id = ?", [id], function(err, results, fields){
		if(err){
			console.log("Error: "+ err.code);
			return;
		}
		res.json(results);
	});
}

//adding data to wishlist 
exports.postWishlistProduct = function(req, res) {
	 conn.query('INSERT INTO wishlist SET ?', req.body, function(error, results, fields) {
		if(error) {
			console.log("error_occured", error.code);
			res.send({
				"code":400,
				"failed":"error occured"
			});
		} else {
			console.log("The solution is:", results);
			res.send({
				"code":200,
				"success":"product inserted successfully"
			});
		}
	});
}

//fetching products from wishlist using mail id
exports.getUserWishList = function(req, res) {
	var q = url.parse(req.url, true);
	var qdata = q.query;
	var email;
	email = qdata.user_email;
	console.log(email);
	conn.query("SELECT prod_id FROM wishlist WHERE user_email = ?", [email], function(err, results, fields) {
		if(err){
			console.log("Error: "+ err.code);
			return;
		} 

		res.json(results);
	});
}