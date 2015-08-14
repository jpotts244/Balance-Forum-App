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
	db.all('SELECT * FROM categories', function (err, row){
		if (err){
			console.log(err);
		} else {
			console.log(row);
			var rendered = ejs.render(html, {categories: row});
			res.send(rendered);
		} 
	});
	
});

app.get("/categories/:id/posts", function (req, res){
	var id = req.params.id;

	db.get("SELECT * FROM categories WHERE id=?", id, function(err, row){
		var category = row;
		db.all("SELECT * FROM categories INNER JOIN posts ON posts.categories_id = categories.id WHERE posts.categories_id=?", id, function (err, row){
			if(err){
				console.log(err);
			} else {
				console.log(row);
				var template = fs.readFileSync("./views/categories_show.html", "utf8");
				var rendered = ejs.render(template, {posts: row, category: category});
				res.send(rendered);
			}
		});
	});

})

app.get("/categories/:id/posts/new", function (req, res){
	var newPostForm = fs.readFileSync("./views/categories_show.html", "utf8");
	res.send(newPostForm);
});


// app.get("/categories/:catId/posts/:postId", function (req, res){
// 	var catId = req.params.catId;
// 	var postId = req.params.postId;
// 	db.get("SELECT * FROM categories WHERE id=?", catId, function (err, row){
// 		var category = row;
	
// 	db.get("SELECT * FROM posts WHERE posts.id=? AND posts.categories_id=?", postId, catId, function (err, row){
// 		if (err){
// 			console.log(err);	
// 		} else {
// 			console.log(row);
// 			var template = fs.readFileSync("./views/show_post.html", "utf8");
// 			var html = ejs.render(template, {post: row, category: category});
// 			res.send(html);
// 		}
// 	})
// 	})
// })

app.get("/categories/:catId/posts/:postId", function (req, res){
	var catId = req.params.catId;
	var postId = req.params.postId;
	
	db.get("SELECT * FROM posts WHERE posts.categories_id=? and posts.id=?", catId, postId, function (err, row){
		if (err){
			console.log(err);
				
		} else {
			var parentPost = row;
			console.log(parentPost);
			db.all("SELECT * FROM posts INNER JOIN comments ON comments.posts_id = posts.id WHERE comments.posts_id=?", postId, function (err, row){
				if (err) {
					console.log(err);
				} else {
					console.log(row);
					var template = fs.readFileSync("./views/show_post.html", "utf8");
					var html = ejs.render(template, {parentPost: parentPost, comments: row});
					res.send(html);
				}
			})
		}
	})
})

app.post("/categories/:id/posts", function (req, res){
	var id = req.params.id;
	var newPost = req.body;
	db.run("INSERT INTO posts (title, content, author, rating, categories_id) VALUES (?,?,?,?,?)", newPost.title, newPost.content, newPost.author, 0, id, function (err){
		if(err){
			console.log(err);
		} else {
			res.redirect("/");
		}
	});

});

////FIX MEEEEE
// app.get("/categories/:catId/posts/:postId/comments", function (req, res){
// 	var catId = req.params.catId;
// 	var postId = req.params.postId;

// 	db.get("SELECT * FROM posts WHERE posts.categories_id=?", catId, function (err, row){
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			var parentPost = row;
// 			db.all("SELECT * FROM posts INNER JOIN comments ON comments.posts_id = posts.id WHERE comments.posts_id=?", postId, function (req, res){
// 				if (err){
// 					console.log(err);
// 				} else {
// 					console.log(row);
// 					// var template = fs.readFileSync("./views/show_post.html", "utf8");
// 					// var html = ejs.render(template, {parentPost: parentPost, row: row});
// 					// res.send(html);
// 				}
// 			})
// 		}

// 	})
// })








