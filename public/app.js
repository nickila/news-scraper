$(document).ready(function () {

    $("#scrapeBtn").on("click", function (event) {
        event.preventDefault();

        $.get("/newscrape", function (data) {
            location.reload();

        });
    });

    $("#save-article").on("click", function (event) {
        event.preventDefault();
        console.log("save it!");
        var id = $(this).val();
        // var newSaved = true;
        // console.log(id);
        // var newSavedState = {
        //     saved: newSaved
        // };
        var change = prompt('Change to:', '');
        $.ajax({
            type: "PUT",
            url: "/update/" + id,
            data: {saved: change}
        }).then(function(response) {
            console.log(response);
            window.location.replace("/");
        }).fail(function(response) {
            console.log("Not working")
        })



        // function editEvent(){
        //     var change = prompt('Change to:', '');
    
        //         $.ajax({
        //             type:'PUT',
        //             url: '/events/update/'+$(this).data('id'),
        //             data: {event_name: change}
        //         }).done(function(response){
        //             console.log(response);
        //             window.location.replace('http://localhost:3030/');
        //         }).fail(function(response){
        //             console.log("Oops not working");
        //         });




        // $.ajax("/update:" + id, {
        //     type: "PUT",
        //     data: newSavedState

        // })
        // .then(
        //     function () {
        //         location.reload();
        //     });
        // var newSaved = true;
        // console.log(id);
        // var newSavedState = {
        //     saved: newSaved
        // };
        // console.log(newSaved)
        // $.ajax("/update:" + id, {
        //     type: "PUT",
        //     data: newSavedState

        // }).then(
        //     function () {
        //         location.reload();
        //     });
    });
});







