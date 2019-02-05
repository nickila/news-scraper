$(document).ready(function () {

    $("#scrapeBtn").on("click", function (event) {
        event.preventDefault();
       
        $.get("/newscrape", function (data) {
            location.reload();
            
        });
    });
});
