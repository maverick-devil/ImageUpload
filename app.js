const express = require('express');
const multer = require('multer');
const path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req,file,callback){
		callback(null,''+Date.now());
	}
});

//Init Upload

const upload = multer({
	storage: storage
}).single('image');


app.use(bodyParser.json({limit:"10mb"}));
app.use(bodyParser.urlencoded({
	parameterLimit: 10000,
	extended: true 
}))

app.post('/upload',function(req,resp) {
	console.log(req.body);
	var imagebuf = Buffer.from(req.body.image, 'base64');
	fs.writeFileSync('image.jpg',imagebuf);
	upload(req,resp,function(err) {
		if(err){
			console.log("Error");
			resp.send({'result':'Error'});
		}
		else{
			console.log(imagebuf.toJSON());
			resp.send({result:'Success'});
		}
	})
});


app.listen(port,function() {
	console.log("Server running on Port "+port);
});