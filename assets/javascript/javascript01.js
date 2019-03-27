// alert("This file is connected!");
//check out "document on click" to reach the dynamically-created button classes

$(document).ready(function () {
    //api key: ACXLyhgAnWu2x7cLRHvyYUobXHDiTbSP
    //List global variables & topic array

    var gifArray = ["downward dog", "tree pose", "childs pose", "chair pose", "head stand"];


    for (x = 0; x < gifArray.length; x++) {
        //I made this whole thing happen--however basic--without looking up anything!! HUZZAH
        var newButton = $("<button class='gifButtons'>" + gifArray[x] + "</button>");
        $(newButton).attr("query-giphy");
        $("#button-list").append(newButton);
    }


    //creating a global variable to store the value/text of the clicked button
    var buttonText = "";

    //on click function to grab dynaically-generated buttons' info (re using "document")
    $(document).on("click", ".gifButtons", function () {

        //this is where much of the problem lies (among other places)
        //I think it's logging ALL the buttons' info; it's console logging in a weird way...
        buttonText.text($(".gifButtons"));
        console.log(buttonText);
        var gifQueryURL = "http://api.giphy.com/v1/gifs/search?q="
        + buttonText + "&api_key=ACXLyhgAnWu2x7cLRHvyYUobXHDiTbSP&limit=10";

        $.ajax({
            url: gifQueryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(results);
            // var gifDisplay = $(results[0].url)
            // console.log(gifDisplay);

            for (var i = 0; i < results.length; i++) {
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

    // Straight up found this way to prevent users from using the Enter key...
    // ...so this code forces the Submit to be clicked
    function stopRKey(evt) {
        var evt = (evt) ? evt : ((event) ? event : null);
        var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
        if ((evt.keyCode == 13) && (node.type == "text")) { return false; }
    }
    document.onkeypress = stopRKey;
    // Thank you, Internet!



    $(document).on("click", "#search-bar", function () {
        event.preventDefault();


        var searchInput = $("#input-search").val().trim();

        if (searchInput == "") {
            alert("You have to type some info into the input field, yo!");
        } else {
            // var gifSearchSubj = $(this).attr(searchInput);
            // thought the better of that one...
            var gifQueryURL = "http://api.giphy.com/v1/gifs/search?q="
                + searchInput + "&api_key=ACXLyhgAnWu2x7cLRHvyYUobXHDiTbSP&limit=10";

            console.log(searchInput);
            // console.log(gifSearchSubj);

            //following few lines pushes the input into the list of buttons
            gifArray.push(searchInput);
            // console.log(gifArray);
            var newerButton = $("<button class='gifButtons button'>" + searchInput + "</button>");
            $(newerButton).attr("query-giphy");
            $("#button-list").append(newerButton);

            //clear the input field after click
            $("#input-search").val("");


            // ajax to get those sweet, sweet gifs
            $.ajax({
                url: gifQueryURL,
                method: "GET"
            }).then(function (response) {
                var results = response.data;
                console.log(results);
                // var gifDisplay = $(results[0].url)
                // console.log(gifDisplay);

                for (var i = 0; i < results.length; i++) {
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
        }


    });







    });