$(document).ready(function () {


    $("#scrapeBtn").on("click", function (event) {
        event.preventDefault();
        $.getJSON("/newscrape", function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#articles").append("<h1>" + data[i].headline + "</h1><ul><li class='summary'>" + data[i].summaryOne + "</li><li>" + data[i].summaryTwo + "</ul><a href='https://www.nytimes.com" + data[i].link + "'>Full Story</a>");
                // console.log(data[i].link); 
                // console.log(data[i].subtitle)
                // console.log(data[i].headline)


            }

        });
    });

});