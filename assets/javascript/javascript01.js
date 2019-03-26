// alert("This file is connected!");

$(document).ready(function() {
    //api key: ACXLyhgAnWu2x7cLRHvyYUobXHDiTbSP
    //List global variables & topic array
    
    var gifArray = ["bjj", "judo", "jiujitsu", "rnc", "brazilianjiujitsu"];
    
    
    for (x = 0; x < gifArray.length;x++){
        //I made this whole thing happen--however basic--without looking up anything!! HUZZAH
        var newButton = $("<button class='gifButtons'>" + gifArray[x] + "</button>");
        $(newButton).attr("query-giphy");
        $("#button-list").append(newButton);
    }

    

    $("button").on("click", function() {
        event.preventDefault();
        var searchInput = $("query-giphy").val().trim();
        // var gifSearchSubj = $(this).attr(searchInput);
        // thought the better of that one...
        var gifQueryURL = "http://api.giphy.com/v1/gifs/search?q=" 
        + searchInput + "&api_key=ACXLyhgAnWu2x7cLRHvyYUobXHDiTbSP&limit=10";

        console.log(searchInput);
        // console.log(gifSearchSubj);

        $.ajax({
            url: gifQueryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            console.log(results);
            // var gifDisplay = $(results[0].url)
            // console.log(gifDisplay);

            for (var i = 0; i < results.length;i++) {
                var gifDiv = $("<div>");
                var gifDisplay = $("<img>");

                var rating = results[i].rating;
                var displayRating = $("<p>").text("Rating: " + rating);

                gifDisplay.attr("src", results[i].images.fixed_height_small.url);
                gifDiv.prepend(gifDisplay);
                gifDiv.prepend(displayRating);
                
                $("#gif-list").prepend(gifDiv);
            }

        })

    })







});