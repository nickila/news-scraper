$.getJSON("/newscrape", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<a href='https://www.nytimes.com" + data[i].link + "'>Full Story</a><p class='subtitle'>" + data[i].photoText+ "<br />" + data[i].subtitle + "<br /><h1>" + data[i].headline + "</h1>");
        console.log(data[i].link); 
        console.log(data[i].photoText);
        console.log(data[i].subtitle)
        console.log(data[i].headline)
        

    }
    
});