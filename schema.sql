CREATE TABLE categories (
	id integer PRIMARY KEY AUTOINCREMENT,
	type text
);

CREATE TABLE posts (
	id integer PRIMARY KEY AUTOINCREMENT, 
	title text, 
	content text,
	author text,
	rating integer,
	categories_id text
);

CREATE TABLE comments (
	id integer PRIMARY KEY AUTOINCREMENT,
	message text,
	username text,
	posts_id integer
);

INSERT INTO categories (type) VALUES ('General');
INSERT INTO categories (type) VALUES ('Stress Prevention');
INSERT INTO categories (type) VALUES ('Recipes');
INSERT INTO categories (type) VALUES ('Yoga');
INSERT INTO categories (type) VALUES ('The Alexander Technique');

INSERT INTO posts (title, content, author, rating, categories_id) VALUES ('Smoothie Recipies for Joint Health', 'Hey guys, anyone know of any good smoothie recipes? I just bought a blender--LETS DO THIS', 'meow22', 0, 3);
INSERT INTO posts (title, content, author, rating, categories_id) VALUES ("Use your bones", "What's up with muscle tension, am I right?", "2kewl4skwel", 0, 5);
INSERT INTO posts (title, content, author, rating, categories_id) VALUES ("Healthy Snack Alternatives", "Hey everyone, white cheddar popcorn is my go to snack food ALWAYS but I am trying a more paleo diet- any recommendations for a healthy but bangin' alternative?", "AIIIJACQUI", 0, 3);
INSERT INTO posts (title, content, author, rating, categories_id) VALUES ('testytesttest', 'dude', 'omggggg', 0, 2);
INSERT INTO posts (title, content, author, rating, categories_id) VALUES ('thisismadness', 'ineedtosleep', 'yahhhhhh', 0, 4);

INSERT INTO comments (message, username, posts_id) VALUES ('Hey @AIIIJACQUI, preach it gurl. Do you think it is possible to find something comparable to that level of deliciousness? #whitecheddar, keep me posted!', 'theOtherWhiteCheese', 3);
INSERT INTO comments (message, username, posts_id) VALUES ('Hey, this is pretty jazzy #ballin', 'TheRealSlimShady', 1);
INSERT INTO comments (message, username, posts_id) VALUES ('yoyo', 'workin9to5', 2);
INSERT INTO comments (message, username, posts_id) VALUES ('im all about this', 'workin9to5', 4);
INSERT INTO comments (message, username, posts_id) VALUES ('stopthehate', 'workin9to1130', 5);








