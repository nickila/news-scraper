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
app.set('index', __dirname + '/views');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var results = [];
// Start routes here...
// var dbArticle;
// app.get("/", function (req, res) {
//     res.render("index", {dbArticle})
// })

app.get("/", function (req, res) {
    axios.get("https://www.nytimes.com/").then(function (response) {
        var $ = cheerio.load(response.data)
        $("h2 span").each(function (i, element) {
            var headline = $(element).text();
            var link = "https://www.nytimes.com";
            link = link + $(element).parents("a").attr("href");
            var summaryOne = $(element).parent().parent().siblings().children("li:first-child").text();
            var summaryTwo = $(element).parent().parent().siblings().children("li:last-child").text();

            if (headline && summaryOne && link) {
                results.push({
                    headline: headline,
                    summaryOne: summaryOne,
                    summaryTwo: summaryTwo,
                    link: link
                })

            }
        });
        db.Article.create(results)
            .then(function (dbArticle) {
                res.render("index", { dbArticle });
                console.log(dbArticle); //this is the one with the _id
            })
            .catch(function (err) {
                console.log(err);
            })
            app.get("/", function (req, res) {
                res.render("index")
            })
        //console.log(results) //this is just the stuff being loaded into the db (no _id)

        // res.render("index", { results });
    })
});

// app.put('/events/update/:id', function(req,res){
//     const data = req.body; 
//     db.events.update({_id: ObjectId(req.params.id)}, {$set: data},function(err, result){
//         if(err){
//             console.log(err);
//         }
//         res.send('updated successfully');
//     });
// });
app.get("/update/", function (req, res) {
    // res.send("Here I is!")
    console.log("##########################################");
    console.log("             *         *    ");
    console.log("                  U         ")
    console.log("##########################################");
    // var data = req.body;
    // console.log(data);
    // console.log(req.params);
    // $.ajax({
    //     type: "PUT",
    //     url: "/update/" + id,
    //     data: {saved: change}
    // }).then(function(response) {
    //     console.log(response);
    //     window.location.replace("/");
    // }).fail(function(response) {
    //     console.log("Not working")
    // })
    db.Article.updateOne({_id: req.params.id}, {$set: {saved: true}}, function(err, result) {
        if (err) {
            console.log(err);

        }
        res.send("Saved successfully!");
    })
    
    console.log(req);
    console.log(res);
    var savedArticle = {
        saved: true
    }

    db.Article.updateOne(savedArticle)
        .then(function (dbSaved) {
            console.log(dbSaved);

        })
        .catch(function (err) {
            console.log(err);
        })

    // db.Article.create(results)
    //     .then(function (dbArticle) {
    //         console.log(dbArticle);
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     })


})


app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
})
