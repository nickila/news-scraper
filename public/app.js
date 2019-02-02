$.getJSON("/scrape", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<h2>" + data[i].headline + "</h2><p>By " + data[i].author + "</p><br />");
        console.log(data[i].headline); 
        console.log(data[i].author);
    }
    
});