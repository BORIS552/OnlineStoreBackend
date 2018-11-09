var express = require('express');
var bodyParser = require('body-parser');
var productPath = require('./routes/controllers');
var serverConfig = require('./serverConfig');

var app = express();
var port = serverConfig.port();
var ip = serverConfig.ipAddr();

var fileUpload = require('express-fileupload');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'welcome to our Online Store module apis' });
});

router.post('/productUpload', productPath.postProduct);
router.get('/getProducts', productPath.getProducts);
router.get('/getProduct', productPath.getProduct);

router.post('/wishlistProduct', productPath.postWishlistProduct);
router.get('/getUserWishList', productPath.getUserWishList);
app.use('/api', router);
app.listen(port, ip);
console.log("IP=> "+ip+":"+port)