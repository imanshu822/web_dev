const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get(async function(req, res) {
        try {
        const foundArticles = await Article.find();
        res.send(foundArticles);
        } catch (err) {
        console.error(err);
        res.send(err);
        }
    })
    .post( async function(req, res){
        const newArticle = await new Article({
            title: req.body.title,
            content: req.body.content
        });
        try {
            await newArticle.save();
            res.send("Successfully added a new article.");
        } catch (err) {
            res.send(err);
        }
    })
    .delete( async function(req, res) {
        try {
        const result = await Article.deleteMany({});
        res.send(`Successfully deleted ${result.deletedCount} articles.`);
        } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
        }
    });
    app.route("/articles/:articleTitle")
    .get(async function(req, res){
        try {
            const foundArticle = await Article.findOne({title: req.params.articleTitle});
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.status(404).send("No articles matching that title was found.");
            }
        } catch(err){
            console.error(err);
        }
    })
    .put(async function(req, res){
        try {
            const foundArticle = await Article.findOneAndUpdate(
                {title: req.params.articleTitle},
                {title: req.body.title, content: req.body.content},
                {overwrite: true}
            );
            if (foundArticle) {
                res.send("Successfully updated article.");
            } else {
                res.status(404).send("No articles matching that title was found.");
            }
        } catch(err){
            console.error(err);
        }
    })
    .patch(async function(req, res){
        try {
            const foundArticle = await Article.findOneAndUpdate(
                {title: req.params.articleTitle},
                {content: req.body.content}
            );
            if (foundArticle) {
                res.send("Successfully updated article.");
            } else {
                res.status(404).send("No articles matching that title was found.");
            }
        } catch(err){
            console.error(err);
        }
    })
    .delete(async function(req, res){
        try {
            const foundArticle = await Article.deleteOne({title: req.params.articleTitle});
            if (foundArticle.deletedCount > 0) {
                res.send("Successfully deleted article.");
            } else {
                res.status(404).send("No articles matching that title was found.");
            }
        } catch(err){
            console.error(err);
        }
    });

app.listen(3000, function() {
    console.log("Server started on port 3000");
});