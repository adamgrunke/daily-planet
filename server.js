const express = require('express');
const layouts = require('express-ejs-layouts');
const fs = require('fs'); // file system aka your local hard drive.

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(layouts);
app.use(express.static(__dirname + "/static"));



app.get('/', function(req, res) {
    res.send("we should add some nice landing page stuff here")
});

app.get('/articles', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    var articleData = JSON.parse(articles);
    res.render('articles/index', {articleData});
});

app.get('/articles/new', function(req, res){
    res.render('articles/new');
});

app.get('/articles/:id', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    var articleData = JSON.parse(articles);
    var id = parseInt(req.params.id);
    res.render('articles/show', {article: articleData[id]});
});

app.post('/articles/', function(req, res){
    let articles = fs.readFileSync('./articles.json');
    let articleData = JSON.parse(articles);
    let newArticle = {
        title: req.body.articleTitle,
        body: req.body.articleBody
    };
    articleData.push(newArticle);
    fs.writeFileSync('./articles.json', JSON.stringify(articleData));
    res.redirect('/articles');
});

app.listen(PORT || 3000);