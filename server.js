var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models")

var PORT = 3000;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var results = [];
// Start routes here...
// app.get("/scrape", function (req, res) {
//     axios.get("https://www.nytimes.com/").then(function (response) {
//         var $ = cheerio.load(response.data)
//         $("div.css-omcqsq").each(function (i, element) {
//             var author = $(element).children().text();
//             var headline = $(element).siblings().text();
//             results.push({
//                 author: author,
//                 headline: headline
//             });
//             db.Article.create(results)
//                 .then(function (dbArticle) {
//                     console.log(dbArticle);
//                 })
//                 .catch(function (err) {
//                     console.log(err);
//                 })

//         });

//         res.json(results)
//         console.log(results);
//     })
// });

app.get("/newscrape", function (req, res) {
    axios.get("https://www.nytimes.com/").then(function (response) {
        var $ = cheerio.load(response.data)
        $("h2 span").each(function (i, element) {
            var headline = $(element).text();
            var link = $(element).parents("a").attr("href");
            var subtitle = $(element).parent().parent().siblings().children().text();
            //var headline = $(element).children("h2").text();
            // var img = $(element).children().children().children().children("img").attr("src");
            // if (photoText && link && subtitle) {
            // var headline = $(element).children().text();
            // var headline = $(element).siblings().text();
            // results.push({
            //     link: link,
            //     photoText: photoText,
            //     subtitle: subtitle,
            //     headline: headline
            //     // });

            // })
            // db.Article.create(results)
            //     .then(function (dbArticle) {
            //         console.log(dbArticle);
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     })
            console.log(headline);
            
            console.log(subtitle);
            console.log(link);
            console.log("_________");
            
        });

        // res.json(results)
        // console.log(results);
    })
});

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
})
