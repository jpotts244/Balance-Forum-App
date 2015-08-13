var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('forum.db');
var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');

var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedBodyParser);
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.listen(3000, function(){
	console.log('Listening');
})

app.get("/", function (req, res){
	var html = fs.readFileSync("./index.html", "utf8");
	db.all('SELECT categories.type FROM categories', function (err, row){
		if (err){
			console.log(err);
		} else {
			console.log(row);
			var rendered = ejs.render(html, {categories: row});
			res.send(rendered);
		} 
	});
	
});

app.get("/categories/posts/new", function (req, res){
	var newPostForm = fs.readFileSync("./views/new-post.html", "utf8");
	res.send(newPostForm);
});

app.get("/categories/:id/posts", function (req, res){
	var id = req.params.id;
	console.log(id);
	// console.log(id);
	db.all("SELECT posts.title, posts.author, categories.type FROM posts INNER JOIN categories ON posts.categories_id = categories.id WHERE posts.categories_id=?", id, function (err, row){
		if (err){
			console.log(err);
		} else {
			console.log(row);
			var template = fs.readFileSync("./views/categoriesShow.html", "utf8");
			var html = ejs.render(template, {row: row});
			res.send(html);
		}
	})
})

app.get("/categories/:catId/posts/:postsId", function (req, res){
	var catId = req.params.catId;
	var postsId = req.params.postsId;
	console.log(catId);
	console.log(postsId);
	
	db.get("SELECT posts.title, posts.content, posts.author, posts.rating, categories.type FROM posts INNER JOIN categories ON posts.categories_id = categories.id WHERE categories.id=? AND posts.id=?", catId, postsId, function (err, row){
		if (err){
			console.log(err);	
		} else {
			console.log(row);
			var template = fs.readFileSync("./views/show-post.html", "utf8");
			var html = ejs.render(template, {post: row});
			res.send(html);
		}
	})
})

app.post("/categories/posts", function (req, res){
	var newPost = req.body;

})








