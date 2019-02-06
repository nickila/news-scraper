$(document).ready(function () {

    $("#scrapeBtn").on("click", function (event) {
        event.preventDefault();
       
        $.get("/newscrape", function (data) {
            location.reload();

        });
    });
    // $("#save-article").on("click", function (event) {
    //     event.preventDefault();
    //     console.log("save it")
        // console.log(value);
        // var id = this._id;
        //     console.log(id);
        // var savedArticle = {
        //     burger_name: $("#ca").val().trim()
        // };

        // $.ajax("/savedarticle", {
        //     type: "POST",
        //     data: savedArticle
        // }).then(
        //     function () {
        //         location.reload();
        //     }
        // );
    //});

    $("#save-article").on("submit", function (event) {
        event.preventDefault();
        console.log("save it!");
        //console.log(value);
        var id = this.id;

        var newSaved = true;
        console.log(id);
        var newSavedState = {
            saved: newSaved
        };
        console.log(newSaved)
        $.ajax("/update" + id, {
            type: "PUT",
            data: newSavedState

        }).then(
            function () {
                $(document).ajaxStop(function () {
                    window.location.reload();
                });
            }
        );
    });







});
